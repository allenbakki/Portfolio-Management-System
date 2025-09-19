import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("auth","./auth/auth.tsx",[
        route ("signIn","./auth/signIn.tsx"),
        route ("signUp","./auth/signUp.tsx")

    ])

] satisfies RouteConfig;
