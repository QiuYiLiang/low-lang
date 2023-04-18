type Listen<T = any> = (value?: T) => void;

type DefaultConfig = Record<string, any>;

export interface Variable<T = any> {
  config: VariableConfig<T>;
  subscribe: (listen: Listen<T>) => void;
  setValue: (value?: T) => void;
  getValue: () => T;
}

export type VariableConfig<V = any, T = DefaultConfig> = {
  type: string;
  name: string;
  defaultValue?: V;
} & T;

export function createVariable<V = any>(config: VariableConfig<V>): Variable {
  const { defaultValue } = config;

  const listens = new Set<Listen>();

  let val = defaultValue;

  const subscribe: Variable["subscribe"] = (listen) => {
    listens.add(listen);
    return () => {
      listens.delete(listen);
    };
  };

  const setValue: Variable["setValue"] = (value) => {
    val = value;
    listens.forEach((listen) => listen(val));
  };

  const getValue: Variable["getValue"] = () => val;

  const render = () => {};

  return {
    config,
    subscribe,
    setValue,
    getValue,
  };
}
