import { stringifyQuery } from "./url";
export const $Router = {
  stringifyQuery,
  push(
    path: string,
    params?: object,
    blank?: boolean,
    isUrl?: boolean,
    type?: "push" | "replace"
  ): void {
    let query = "";
    if (params) {
      query = this.stringifyQuery(params); // TODO: 查看 ali-lowcode 源码
    }
    const url = query ? `${path}?${query}` : path;
    if (isUrl) {
      window.open(url, blank ? "_blank" : "_self");
    } else {
      window.open(`${window.location.host}url`, blank ? "_blank" : "_self");
    }
  },
};
