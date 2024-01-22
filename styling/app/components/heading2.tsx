import { LinksFunction } from "@remix-run/node";
import styles from "./heading2.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const Heading2: React.FC<{ text: string }> = ({ text }) => (
  <h1 className="hoge">{text}</h1>
);
