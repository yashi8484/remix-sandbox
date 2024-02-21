import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Data = { id: number; thumb: string };
type ItemsResponse = { data: Data[] };

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = () => {
  const items = Array.from({ length: 30 }, (_, i) => i).map((id) => ({
    id,
    thumb: `https://picsum.photos/200?${id}`,
  }));

  return { data: items };
};

export default function Index() {
  const { data } = useLoaderData<ItemsResponse>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      {/* Items Grid */}
      <div className="items-container">
        {data.map((item) => (
          <img
            key={item.id}
            className="item"
            src={item.thumb}
            alt={`${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
