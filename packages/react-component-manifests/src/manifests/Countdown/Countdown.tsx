import React, { forwardRef, useMemo } from "react";
import { Statistic } from "antd";

const { Countdown: AntdCountdown } = Statistic;

const Countdown = forwardRef<
  HTMLDivElement,
  {
    styles: React.CSSProperties;
    attrs: {
      class: string;
    };
    id?: string;
    className?: string;
    custom: {
      title?: string;
      prefix?: string;
      prefixIcon?: string;
      suffix?: string;
      suffixIcon?: string;
      format: "DD:HH:mm:ss" | "HH:mm:ss" | "mm:ss" | "ss";
      value: number;
      inputType: "minute" | "hour" | "second" | "day";
    };
    onClick: (event: { pageX: number; pageY: number }) => void;
  }
>((props, ref) => {
  const { custom } = props;
  const { value, inputType } = custom;

  const countDownValue = useMemo(() => {
    return inputType === "second"
      ? Date.now() + value * 1000
      : inputType === "hour"
      ? Date.now() + value * 3600000
      : inputType === "minute"
      ? Date.now() + value * 60000
      : inputType === "day"
      ? Date.now() + value * 3600000 * 24
      : "";
  }, [value, inputType]);

  // moved ref to div, as the Antd Countdown doesn't provide ref for Countdown
  return (
    <div ref={ref} style={{ display: "inline-block" }} id={props.id}>
      <AntdCountdown
        className={`${props.className} ${props.attrs?.class}`}
        style={props.styles}
        {...custom}
        valueStyle={props.styles}
        prefix={
          props.custom?.prefixIcon !== undefined ? (
            <img
              src={props.custom?.prefixIcon}
              alt={props.custom?.prefixIcon}
            />
          ) : (
            props.custom?.prefix
          )
        }
        suffix={
          props.custom?.suffixIcon !== undefined ? (
            <img
              src={props.custom?.suffixIcon}
              alt={props.custom?.suffixIcon}
            />
          ) : (
            props.custom?.suffix
          )
        }
        format={props.custom?.format}
        value={countDownValue}
      />
    </div>
  );
});

export default Countdown;
