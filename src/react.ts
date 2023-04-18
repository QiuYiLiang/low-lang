import { FC } from "react";
import { Control } from "./core/control";

export type ControlComponent<T> = FC<{
  control: Control<T>;
}>;
