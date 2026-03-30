import { createContext, Dispatch, SetStateAction, use } from "react";
import { VoidCallback } from "../types";

export const ViewTransitionsContext = createContext<
  Dispatch<SetStateAction<VoidCallback | null>>
>(() => {});

export const ViewTransitionProvider = ViewTransitionsContext.Provider;
export function useSetFinishViewTransition() {
  return use(ViewTransitionsContext); // 返回Context的值
}
