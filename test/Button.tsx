import { useState } from "react";
import { ControlComponent } from "../src/react";
import { ControlConfig } from "../src/core/control";

interface ButtonConfig {
  msg: ControlConfig;
}

const Button: ControlComponent<ButtonConfig> = ({ control }) => {
  const { config } = control;
  const [count, setCount] = useState(0);

  const msgControl = control.createControl(config.msg);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
        control.callMethod("消息1", "设置消息", count);
      }}
    >
      Click: {count}
      {msgControl.render()}
    </button>
  );
};

export default Button;
