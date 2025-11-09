import type { ProxyConfigArray } from "webpack-dev-server";
export interface PluginOptions {
    proxy: ProxyConfigArray | undefined;
}
