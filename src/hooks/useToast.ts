import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { createElement } from "react";
import { Toast } from "../components/Toast";

type ToastType = "success" | "error" | "info";

let toastRoot: Root | null = null;
let toastCount = 0;

const createToastContainer = () => {
  if (!toastRoot) {
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
    toastRoot = createRoot(container);
  }
};

export const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = "info",
    duration?: number,
  ) => {
    createToastContainer();

    if (!toastRoot) return;

    const toastId = ++toastCount;
    const toastElement = createElement(Toast, {
      message,
      type,
      duration,
      key: toastId,
      onClose: () => {
        // Toast will handle its own removal
      },
    });

    toastRoot.render(toastElement);

    // Auto-cleanup after animation
    setTimeout(
      () => {
        if (toastRoot && toastCount === toastId) {
          toastRoot.unmount();
          const container = document.getElementById("toast-container");
          if (container) {
            document.body.removeChild(container);
          }
          toastRoot = null;
        }
      },
      (duration || 3000) + 300,
    );
  };

  return {
    success: (message: string, duration?: number) =>
      showToast(message, "success", duration),
    error: (message: string, duration?: number) =>
      showToast(message, "error", duration),
    info: (message: string, duration?: number) =>
      showToast(message, "info", duration),
  };
};
