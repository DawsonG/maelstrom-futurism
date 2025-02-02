import React, { useState, FormEvent } from "react";

import { capitalize } from "@maelstrom-futurism/core";
import { isFunction } from "@maelstrom-futurism/core";
// import Input from "../Input";
// import Button from "../Button";

type ModelItem = {
  label?: string;
  name: string;
  contentType: string;
};

interface IFormBuilder {
  model: Array<ModelItem>;
  values?: Record<string, string>;
  emitChange?: (name: string, value: string) => void;
  onSubmit?: (values: Record<string, string>) => void;
}

const FormBuilder: React.FC<IFormBuilder> = ({
  model,
  values,
  onSubmit,
  emitChange,
}) => {
  const [internalValues, setInternalValues] = useState<Record<string, string> | undefined>(values);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setInternalValues({ ...internalValues, [name]: value });
    if (emitChange && isFunction(emitChange)) emitChange(name, value);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    if (internalValues && onSubmit && isFunction(onSubmit)) {
      onSubmit(internalValues);
    }
  };

  const mapFields = (m: ModelItem) => {
    const constantFields = {
      name: m.name,
      label: m.label || capitalize(m.name),
      onChange,
      type: m.contentType,
      value: internalValues && internalValues[internalValues.name],
    };

    switch (m.contentType) {
      case "text":
      case "tel":
      default:
        return <div/>; //<Input {...constantFields} />;
    }
  };

  return (
    <form onSubmit={submitForm}>
      {model.map((m) => mapFields(m))}

      {/*<Button type="submit">Save</Button>*/}
    </form>
  );
};

export default FormBuilder;
