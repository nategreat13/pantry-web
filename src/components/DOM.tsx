import React, { ReactNode } from "react";

type Falsy = undefined | null | false;
interface RecursiveArray<T>
  extends Array<T | ReadonlyArray<T> | RecursiveArray<T>> {}
type BaseStyleProp = React.CSSProperties | undefined;
type BetterStyleProp =
  | BaseStyleProp
  | RecursiveArray<BaseStyleProp | Falsy>
  | Falsy;

type DomType<T> = Omit<React.HTMLAttributes<T>, "style"> & {
  style?: BetterStyleProp;
};

export const Div = React.forwardRef(
  (p: { children?: ReactNode } & DomType<HTMLDivElement>, ref: any) => {
    const { children, style, ...rest } = p;

    const styleProp = style ? { style: flattenStyle(style) } : {};

    return (
      <div {...styleProp} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

export const Span = React.forwardRef(
  (p: { children?: ReactNode } & DomType<HTMLSpanElement>, ref: any) => {
    const { children, style, ...rest } = p;

    return (
      <div style={flattenStyle(style)} {...rest}>
        {children}
      </div>
    );
  }
);

export function flattenStyle(style: BetterStyleProp): BaseStyleProp {
  if (!style) {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style as BaseStyleProp;
  }

  const result: any = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i] as any);
    if (computedStyle) {
      for (const key in computedStyle) {
        const value = (computedStyle as any)[key];
        result[key] = value;
      }
    }
  }
  return result;
}
