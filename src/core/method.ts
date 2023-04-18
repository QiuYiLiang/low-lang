export interface MethodConfig {
  type: string;
  name: string;
  value: (...args: any[]) => any;
}
