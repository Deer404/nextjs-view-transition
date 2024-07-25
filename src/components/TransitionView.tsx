"use client";

import { useLayoutEffect, useState } from "react";
import { useBrowserNativeTransitions } from "../libs/useBrowserNativeTransitions";
import React from "react";
import { VoidCallback } from "../types";
import { ViewTransitionsContext } from "../libs/context";

export function ViewTransitions({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 使用useState定义一个状态finishViewTransition，用于存储回调函数，初始值为null
  const [finishViewTransition, setFinishViewTransition] =
    useState<VoidCallback | null>(null);

  // 使用useEffect在finishViewTransition变化时执行
  // 直接在 Link 中结束转换可能会在 React 完成渲染之前就结束了转换。
  useLayoutEffect(() => {
    if (finishViewTransition) {
      finishViewTransition();
      setFinishViewTransition(null);
    }
  }, [finishViewTransition]);

  // 调用自定义钩子，用于处理浏览器的原生过渡动画 (后退/前进操作 popstate)
  useBrowserNativeTransitions();

  return (
    <ViewTransitionsContext.Provider value={setFinishViewTransition}>
      {children}
    </ViewTransitionsContext.Provider>
  );
}
