import React, { ReactNode } from 'react';

import { Input } from './FormComponents/Input';

interface FormProps {
  children?: ReactNode;
}

const Form = ({ children }: FormProps): ReactNode => {
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

  return <>{children}</>;
};

export default Form;
