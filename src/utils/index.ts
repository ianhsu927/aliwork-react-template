import { AssetLoader } from "./asset";
import { $Router } from "./router";
import * as Next from "@alifd/next";
const { loadScript, loadStyle: loadStyleSheet } = new AssetLoader();
export const $Util = {
  loadScript,
  loadStyleSheet,
  router: $Router,
  dialog: (
    type: "alert" | "confirm" | "show",
    title: string,
    content: string,
    onOk: () => void,
    onCancel: () => void
  ) =>
    Next.Dialog[type]({
      onOk,
      onCancel,
      content,
      title,
    }),
  toast: (params: {
    type?: "success" | "warning" | "error" | "notice" | "help" | "loading";
    title?: string;
    size?: "medium" | "large";
    duration?: number;
  }) =>
    Next.Message[params.type || "success"]({
      title: params.title,
      duration: params.duration,
      size: params.size,
    }),
  previewImage(params: { current: string }) {},
};
