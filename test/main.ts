import ReactDOM from "react-dom/client";
import { createManager } from "../src/core/manager";
import Button from "./Button";
import Message from "./Message";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  createManager({
    controlConfig: {
      control: "Button",
      name: "按钮1",
      msg: {
        control: "Message",
        name: "消息1",
      },
    },
    controlStore: { Button, Message },
  }).render()
);
