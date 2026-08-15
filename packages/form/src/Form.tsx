import React, { FormHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import { Button } from '@maelstrom-futurism/button';
import { Input, TextArea } from './FormComponents/Input';

export interface AjaxFieldErrors {
  [fieldName: string]: string;
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children?: ReactNode;

  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

  /** When set, prompts the user with the browser's native "leave site?"
   *  confirmation if they try to close/navigate away while the form has
   *  unsaved changes. Dirty state is tracked via native `input`/`change`
   *  events bubbling from any form control, and cleared on submit. */
  confirmLeaveOnDirty?: boolean;

  /** Intercepts native submission and calls this async function instead.
   *  While it's pending, any submit-type `Button` among the form's children
   *  is put into its `loading` state. Resolve with `{ fieldErrors }` (keyed
   *  by field `name`) to display validation errors on the matching `Input`/
   *  `TextArea` children — anything else resolved/thrown clears prior
   *  errors. Takes precedence over `onSubmit` when both are given. */
  onSubmitAjax?: (e: React.FormEvent<HTMLFormElement>) => Promise<{ fieldErrors?: AjaxFieldErrors } | void>;
}

const Form = ({
  children, onSubmit, confirmLeaveOnDirty, onSubmitAjax, ...rest
}: FormProps): ReactNode => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<AjaxFieldErrors>({});

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onSubmitAjax) {
      setIsDirty(false);
      onSubmit?.(e);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmitAjax(e);
      const nextFieldErrors = result?.fieldErrors ?? {};
      setFieldErrors(nextFieldErrors);
      if (Object.keys(nextFieldErrors).length === 0) {
        setIsDirty(false);
      }
    } finally {
      setIsSubmitting(false);
    }
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

  const decorateChildren = (nodes: ReactNode): ReactNode => React.Children.map(nodes, (child) => {
    if (!React.isValidElement(child)) return child;

    const childProps = child.props as { name?: string; children?: ReactNode; type?: string };

    if ((child.type === Input || child.type === TextArea) && childProps.name && fieldErrors[childProps.name]) {
      return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        validationState: 'alert',
        validationMessage: fieldErrors[childProps.name],
      });
    }

    if (child.type === Button && childProps.type === 'submit') {
      return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        loading: isSubmitting,
      });
    }

    if (childProps.children) {
      return React.cloneElement(child, undefined, decorateChildren(childProps.children));
    }

    return child;
  });

  const renderedChildren = onSubmitAjax ? decorateChildren(children) : children;

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...rest}>
      {renderedChildren}
    </form>
  );
};

export default Form;
