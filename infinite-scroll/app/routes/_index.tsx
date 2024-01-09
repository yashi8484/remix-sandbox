import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Data, ItemsResponse, fetchItems } from "../api.server";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { InfiniteScroller } from "~/components/InfiniteScroller";

export const loader: LoaderFunction = async (remixContext) => {
  const url = new URL(remixContext.request.url);
  const page = url.searchParams.get("page") || 0;

  const items = await fetchItems({
    page: Number(page),
  });

  return items;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const initialItems = useLoaderData<ItemsResponse>();
  const fetcher = useFetcher<ItemsResponse>();

  const [items, setItems] = useState<Data[]>(initialItems.data);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }

    if (fetcher.data) {
      const newItems = fetcher.data.data;
      setItems((prevAssets) => [...prevAssets, ...newItems]);
    }
  }, [fetcher.data]);

  return (
    <InfiniteScroller
      loadNext={() => {
        const page = fetcher.data
          ? fetcher.data.page + 1
          : initialItems.page + 1;
        const query = `?index&page=${page}`;
        console.log(query);
        fetcher.load(query);
      }}
      loading={fetcher.state === "loading"}
    >
      <div>
        {/* Items Grid */}
        <div className="items-container">
          {items.map((item) => (
            <img key={item.id} className="item" src={item.thumb} />
          ))}
        </div>
        {/* Loader(省略) */}
      </div>
    </InfiniteScroller>
  );
}
