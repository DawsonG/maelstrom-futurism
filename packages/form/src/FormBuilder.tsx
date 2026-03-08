import React, { useState, FormEvent } from "react";
import { capitalize, isFunction } from "@maelstrom-futurism/core";
import { Button } from "@maelstrom-futurism/button";

import { Input } from "./FormComponents/Input";

type ModelItem = {
  label?: string;
  name: string;
  contentType: string;
};

interface FormBuilderProps {
  model: ModelItem[];
  values?: Record<string, string>;
  emitChange?: (name: string, value: string) => void;
  onSubmit?: (values: Record<string, string>) => void;
}

const FormBuilder = ({
  model,
  values,
  onSubmit,
  emitChange,
}: FormBuilderProps) => {
  const [internalValues, setInternalValues] = useState<Record<string, string> | undefined>(values);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
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
        return <Input key={constantFields.name} {...constantFields} />;
    }
  };

  return (
    <form style={{ backgroundColor: 'inherit' }} onSubmit={submitForm}>
      {model.map((m) => mapFields(m))}

      <Button type="submit">Save</Button>
    </form>
  );
};

export default FormBuilder;
