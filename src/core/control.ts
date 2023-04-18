import { ReactNode, createElement } from "react";
import { Variable, VariableConfig, createVariable } from "./variable";
import { MethodConfig } from "./method";

type DefaultConfig = Record<string, any>;

type Component = any;

export type ControlConfig<T = DefaultConfig> = {
  type: string;
  name: string;
  controlSource: { [key: string]: Component };
  methodSource: { [key: string]: any};
  variableSource: { [key: string]: Component };
  programs?: Record<string, any>;
  variables: Record<string, VariableConfig>;
} & T;

export interface Control<T = DefaultConfig> {
  config: ControlConfig<T>;
  getVariable: (name: string) => void;
  getSubControl: (controlId: string) => Control | undefined;
  addVariable: (config: VariableConfig) => void;
  addMethod: (method: MethodConfig) => void;
  addSubControl: (config: ControlConfig) => Control;
  removeVariable: (name: string) => void;
  removeMethod: (name: string) => void;
  callMethod: (name: string, ...args: any[]) => Promise<any>;
  runProgram: (name: string) => Promise<void>;
  render: () => ReactNode;
}

export const createControl = (config: ControlConfig, parent?: Control) => {
  const { type, name, programs, variables, controlSource, variableSource } =
    config;

  const variableMap = new Map<string, Variable>();
  const methodMap = new Map<string, Method>();
  const subControlMap = new Map<string, Control>();

  const getVariable: Control["getVariable"] = (name) => {
    return variableSource[name];
  };

  const getMethod: Control["getMethod"] = (name) => {
    return methodMap.get(name);
  };

  const getSubControl: Control["getSubControl"] = (name) => {
    return subControlMap.get(name);
  };

  const addVariable: Control["addVariable"] = (config) => {
    return variableMap.set(config.name, createVariable(config));
  };

  const addMethod: Control["addMethod"] = (name, method) => {
    methodMap.set(name, method);
  };

  const addSubControl: Control["addSubControl"] = (control) => {
    return subControlMap.set(name, control);
  };

  const removeVariable:  = (name: string) => {
    variableMap.delete(name);
  };

  const getComponent: Manager["getComponent"] = (name) => {
    return controlSource[name];
  };

  const runProgram = async (name: string) => {};

  const removeMethod: Control["removeMethod"] = (name) => {
    methodMap.delete(name);
  };

  const callMethod: Control["callMethod"] = async (
    controlName,
    methodName,
    ...args
  ) => await control.getControl(controlName)?.getMethod(methodName)?.(...args);

  const createSubControl: Control["createControl"] = (config) => {
    return createControl(config, context);
  };

  const render = () => {
    const Component = manager.getComponent(componentName);

    if (!Component) {
      return null;
    }

    return createElement(Component, {
      control,
    });
  };

  const control = {
    config,
    getControl,
    addMethod,
    getMethod,
    removeMethod,
    render,
    createControl: createSubControl,
    createManager,
    callMethod,
  };

  manager.addControl(name, control);

  return control;
};
