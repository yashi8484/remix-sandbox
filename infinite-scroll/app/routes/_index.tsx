import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Data, ItemsResponse, fetchItems } from "../api.server";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

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
  const [items, setItems] = useState<Data[]>(initialItems.data);

  return (
    <div className="items-container">
      {items.map((item) => (
        <img key={item.id} className="item" src={item.thumb} />
      ))}
    </div>
  );
}
