import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("use-document-title", "routes/use-document-title.tsx"),
  route("use-default", "routes/use-default.tsx"),
  route("use-toggle", "routes/use-toggle.tsx"),
] satisfies RouteConfig;
