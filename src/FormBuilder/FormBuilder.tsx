import React, { useState, FormEvent } from "react";

import { capitalize } from "../utils/words";
import { isFunction } from "../utils/typeof";
import Input from "../Input";
import Button from "../Button";

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
  emitChange
}) => {
  const [internalValues, setInternalValues] = useState(values);

  const onChange = e => {
    const {
      target: { name, value }
    } = e;
    setInternalValues({ ...internalValues, [name]: value });
    if (emitChange && isFunction(emitChange)) emitChange(name, value);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    if (onSubmit && isFunction(onSubmit)) onSubmit(internalValues);
  };

  const mapFields = (m: ModelItem) => {
    const constantFields = {
      name: m.name,
      label: m.label || capitalize(m.name),
      onChange,
      type: m.contentType,
      value: internalValues && internalValues[internalValues.name]
    };

    switch (m.contentType) {
      case "text":
      case "tel":
        return <Input {...constantFields} />;
    }
  };

  return (
    <form onSubmit={submitForm}>
      {model.map(m => mapFields(m))}

      <Button type="submit">Save</Button>
    </form>
  );
};

export default FormBuilder;
