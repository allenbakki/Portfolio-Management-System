import { Dashboard } from "~/dashbaord/dashboard";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Folio" },
    { name: "description", content: "Portfolio Management application" },
  ];
}

export default function Home() {
  return <Dashboard />;
}
