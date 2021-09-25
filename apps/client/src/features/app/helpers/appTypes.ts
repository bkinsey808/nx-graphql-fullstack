// see https://stackoverflow.com/questions/58216298/how-to-omit-keystring-any-from-a-type-in-typescript#69299668
export type NoStringIndex<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

export interface AppFieldConfig {
  [fieldName: string]: {
    label: string;
    required?: boolean;
  };
}
