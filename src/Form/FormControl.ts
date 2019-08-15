import * as React from "react";

export const FormContext = React.createContext({
  values: {},
  errors: {},
  setValue: (name: string, value: any) => {
    name, value;
  }
});

export default FormContext.Consumer;
