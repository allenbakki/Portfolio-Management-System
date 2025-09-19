import { Outlet, Link } from "react-router";
import type { Route } from "./+types/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { name: "Auth page", content: "Input form for signIn and SignUp" },
  ];
}
export default function Auth() {
  return (
    <div>
      <nav>
        <Link to="signIn">Sign In</Link>
        <Link to="signUp">Sign Up</Link>
      </nav>
      <Outlet />
    </div>
  );
}
