import { makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { ReactNode } from "react";
import { Span } from "./DOM";

const useStyles = makeStyles((theme: Theme) => ({
  styledText: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "1.0",
    letterSpacing: "0.00938em",
  },
}));

export function StyledText(
  props: React.HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode;
    variant?: "regular" | "condensed" | "condensed-bold" | "bold";
  }
) {
  const { style, variant, ...rest } = props;
  const classes = useStyles();

  const extraStyles: CSSProperties = {};
  if (props.variant === "bold" || props.variant === "condensed-bold") {
    extraStyles.fontWeight = "bold";
  }

  if (props.variant === "condensed" || props.variant === "condensed-bold") {
    extraStyles.fontFamily = "Roboto Condensed";
  }

  return (
    <Span
      {...rest}
      className={classes.styledText}
      style={[props.style, extraStyles]}
    />
  );
}
