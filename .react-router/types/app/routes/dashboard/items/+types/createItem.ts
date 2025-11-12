// React Router generated types for route:
// routes/dashboard/items/createItem.tsx

import type * as T from "react-router/route-module"

import type { Info as Parent0 } from "../../../../+types/root.js"
import type { Info as Parent1 } from "../../+types/dashboard.js"
import type { Info as Parent2 } from "./itemContainer.js"

type Module = typeof import("../createItem.js")

export type Info = {
  parents: [Parent0, Parent1, Parent2],
  id: "routes/dashboard/items/createItem"
  file: "routes/dashboard/items/createItem.tsx"
  path: "create"
  params: {} & { [key: string]: string | undefined }
  module: Module
  loaderData: T.CreateLoaderData<Module>
  actionData: T.CreateActionData<Module>
}

export namespace Route {
  export type LinkDescriptors = T.LinkDescriptors
  export type LinksFunction = () => LinkDescriptors

  export type MetaArgs = T.CreateMetaArgs<Info>
  export type MetaDescriptors = T.MetaDescriptors
  export type MetaFunction = (args: MetaArgs) => MetaDescriptors

  export type HeadersArgs = T.HeadersArgs
  export type HeadersFunction = (args: HeadersArgs) => Headers | HeadersInit

  export type unstable_MiddlewareFunction = T.CreateServerMiddlewareFunction<Info>
  export type unstable_ClientMiddlewareFunction = T.CreateClientMiddlewareFunction<Info>
  export type LoaderArgs = T.CreateServerLoaderArgs<Info>
  export type ClientLoaderArgs = T.CreateClientLoaderArgs<Info>
  export type ActionArgs = T.CreateServerActionArgs<Info>
  export type ClientActionArgs = T.CreateClientActionArgs<Info>

  export type HydrateFallbackProps = T.CreateHydrateFallbackProps<Info>
  export type ComponentProps = T.CreateComponentProps<Info>
  export type ErrorBoundaryProps = T.CreateErrorBoundaryProps<Info>
}