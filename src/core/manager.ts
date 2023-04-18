import { ReactNode } from "react";
import { Control, ControlConfig, createControl } from "../core/control";
import { VariableConfig } from "./variable";

type Component = any;

export interface ManagerConfig {
  controlConfig: ControlConfig;
  controlStore: { [key: string]: Component };
  variableStore: { [key: string]: Component };
  programs?: {};
  variables: Record<string, VariableConfig>
}

export interface Manager {
  getControl: (name: string) => Control | undefined;
  getComponent: (name: string) => Component | undefined;
  addControl: (name: string, control: Control) => void;
  addVariable: (name: ) => void;
  runProgram: (name: string) => Promise<void>;
  render: () => ReactNode;
}

export const createManager = (config: ManagerConfig) => {
  const { controlConfig, controlStore, programs } = config;

  const controlMap = new Map<string, Control>();

  const getControl: Manager["getControl"] = (name) => {
    return controlMap.get(name);
  };

  const getComponent: Manager["getComponent"] = (name) => {
    return controlStore[name];
  };

  const addControl: Manager["addControl"] = (name, control) => {
    return controlMap.set(name, control);
  };

  const runProgram = async (name: string) => {};

  const render = () => createControl(controlConfig, { manager }).render();

  const manager = {
    getControl,
    runProgram,
    addControl,
    getComponent,
    render,
  };

  return manager;
};
