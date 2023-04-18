import { useState } from "react";
import { Control } from "../src/core/control";

const Message = ({ control }: { control: Control }) => {
  const { addMethod } = control;

  const [message, setMessage] = useState("Hello World");

  addMethod("设置消息", setMessage);

  return <h1>{message}</h1>;
};

export default Message;
