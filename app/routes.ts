import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("use-document-title", "routes/use-document-title.tsx"),
  route("use-default", "routes/use-default.tsx"),
  route("use-toggle", "routes/use-toggle.tsx"),
  route("use-previous", "routes/use-previous.tsx"),
  route("use-preferred-language", "routes/use-preferred-language.tsx"),
] satisfies RouteConfig;
