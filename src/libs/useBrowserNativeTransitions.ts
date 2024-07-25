import { useEffect, useRef, useState, use, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function useBrowserNativeTransitions() {
  // 获取当前路径名
  const pathname = usePathname();
  // 创建一个引用来存储当前的路径名
  const currentPathname = useRef(pathname);

  // 创建一个状态来追踪视图转换状态
  const [currentViewTransition, setCurrentViewTransition] = useState<
    | null
    | [
        // Promise 用于等待视图转换开始
        Promise<void>,
        // Resolver 用于完成视图转换
        () => void
      ]
  >(null);

  useEffect(() => {
    // 如果 document 不支持 startViewTransition 方法，则直接返回
    if (!("startViewTransition" in document)) {
      return () => {};
    }

    // popstate 事件触发时的处理函数
    const onPopState = () => {
      let pendingViewTransitionResolve: () => void;

      // 创建一个新的 Promise 来表示挂起的视图转换
      const pendingViewTransition = new Promise<void>((resolve) => {
        pendingViewTransitionResolve = resolve;
      });

      // 创建一个新的 Promise 来表示挂起的启动视图转换
      const pendingStartViewTransition = new Promise<void>((resolve) => {
        // @ts-ignore
        document.startViewTransition(() => {
          // 当视图转换开始时，resolve 该 Promise
          resolve();
          // 返回挂起的视图转换
          return pendingViewTransition;
        });
      });

      // 设置当前的视图转换状态
      setCurrentViewTransition([
        pendingStartViewTransition,
        pendingViewTransitionResolve!,
      ]);
    };

    // 监听 popstate 事件
    window.addEventListener("popstate", onPopState);

    // 卸载组件时，移除 popstate 事件监听
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // 如果当前存在视图转换，并且路径名发生变化
  if (currentViewTransition && currentPathname.current !== pathname) {
    // 当路径名变化时，我们阻止新路由的渲染，直到视图转换开始
    use(currentViewTransition[0]);
  }

  // 保持转换引用的最新状态
  const transitionRef = useRef(currentViewTransition);
  useEffect(() => {
    transitionRef.current = currentViewTransition;
  }, [currentViewTransition]);

  useLayoutEffect(() => {
    // 当前路由组件实际挂载时，完成视图转换
    currentPathname.current = pathname;
    if (transitionRef.current) {
      // 调用 resolver 来完成视图转换
      transitionRef.current[1]();
      transitionRef.current = null;
    }
  }, [pathname]);
}
