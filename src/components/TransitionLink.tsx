"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useCallback } from "react";
import React from "react";
import { useSetFinishViewTransition } from "../libs/context";

// 从下列GitHub地址中复制过来的代码
// https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement; // 获取事件目标并断言其类型
  const target = eventTarget.getAttribute("target"); // 获取target属性
  return (
    (target && target !== "_self") || // 检查target属性是否被修改
    event.metaKey || // 检查meta键是否按下
    event.ctrlKey || // 检查ctrl键是否按下
    event.shiftKey || // 检查shift键是否按下
    event.altKey || // 检查alt键是否按下（会触发资源下载）
    (event.nativeEvent && event.nativeEvent.which === 2) // 检查中键点击
  );
}

// 从下列GitHub地址中复制过来的代码
// https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L204-L217
function shouldPreserveDefault(
  e: React.MouseEvent<HTMLAnchorElement>
): boolean {
  const { nodeName } = e.currentTarget; // 获取事件目标的节点名称

  // 检查节点名称是否为"A"，即a标签
  const isAnchorNodeName = nodeName.toUpperCase() === "A";

  if (isAnchorNodeName && isModifiedEvent(e)) {
    // 如果是带有修饰键的点击，则返回true不阻止浏览器默认行为
    return true;
  }

  return false; // 否则返回false，阻止默认行为
}

/**
 * TransitionLink
 * @param props Next Link props
 * @returns TransitionLink Components
 */
export function TransitionLink(props: React.ComponentProps<typeof NextLink>) {
  const router = useRouter(); // 获取路由对象
  const setFinishViewTransition = useSetFinishViewTransition(); // 获取完成视图过渡的方法

  const { href, as: asHref, replace, scroll } = props; // 从props中解构出必要的属性
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ("startViewTransition" in document) {
        // 如果是点击锚点元素，并且带有修饰键，则不阻止默认行为
        if (shouldPreserveDefault(e)) {
          return;
        }

        e.preventDefault(); // 阻止默认点击行为

        // @ts-ignore
        document.startViewTransition(
          // 启动视图过渡
          () =>
            new Promise<void>((resolve) => {
              startTransition(() => {
                router[replace ? "replace" : "push"](asHref || (href as any), {
                  scroll: scroll ?? true,
                });
                setFinishViewTransition(() => resolve); // 完成视图过渡后，执行resolve
              });
            })
        );
      }
    },
    [props, router, replace, asHref, href, scroll, setFinishViewTransition] // 依赖项数组
  );

  return <NextLink {...props} onClick={onClick} />; // 返回经过自定义onClick方法处理的NextLink组件
}
