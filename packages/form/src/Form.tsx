import React, { FormHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import { Input } from './FormComponents/Input';

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children?: ReactNode;

  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

  /** When set, prompts the user with the browser's native "leave site?"
   *  confirmation if they try to close/navigate away while the form has
   *  unsaved changes. Dirty state is tracked via native `input`/`change`
   *  events bubbling from any form control, and cleared on submit. */
  confirmLeaveOnDirty?: boolean;
}

const Form = ({ children, onSubmit, confirmLeaveOnDirty, ...rest }: FormProps): ReactNode => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!confirmLeaveOnDirty || !formRef.current) return undefined;

    const form = formRef.current;
    const markDirty = () => setIsDirty(true);

    form.addEventListener('input', markDirty);
    form.addEventListener('change', markDirty);
    return () => {
      form.removeEventListener('input', markDirty);
      form.removeEventListener('change', markDirty);
    };
  }, [confirmLeaveOnDirty]);

  useEffect(() => {
    if (!confirmLeaveOnDirty || !isDirty) return undefined;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [confirmLeaveOnDirty, isDirty]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDirty(false);
    onSubmit?.(e);
  };

  function getAllChildrenByTypeRecursive(
    nodes: ReactNode,
    targetType: React.ElementType,
  ): React.ReactElement[] {
    let matches: React.ReactElement[] = [];

    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type === targetType) {
        matches.push(child);
      }

      const childProps = child.props as { children?: ReactNode };
      if (childProps.children) {
        matches = matches.concat(getAllChildrenByTypeRecursive(childProps.children, targetType));
      }
    });

    return matches;
  }

  const keyValueInternal: Record<string, string> = {};
  const formElements = getAllChildrenByTypeRecursive(children, Input);
  formElements.forEach((element) => {
    const props = element.props as { name?: string; value?: string };
    if (props.name) {
      keyValueInternal[props.name] = props.value ?? '';
    }
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
