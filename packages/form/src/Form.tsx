import { Input } from "@maelstrom-futurism/input";
import React, { Children, ReactNode, useState } from "react";

interface FormProps {
    children: ReactNode | ReactNode[];
}

const Form = ({ children }: FormProps): ReactNode => {
    const [keyValueMap, setKeyValueMap] = useState<Record<string, string>>({});

    function getAllChildrenByTypeRecursive(children: ReactNode | ReactNode[], targetType: any) {
        let matchingChildren: ReactNode[] = [];

        React.Children.forEach(children, child => {
            if (React.isValidElement(child)) {
                if (child.type === targetType) {
                    matchingChildren.push(child);
                }

                if ((child.props as unknown as any).children) {
                    matchingChildren = matchingChildren.concat(
                        getAllChildrenByTypeRecursive((child.props as any).children, targetType)
                    );
                }
            }
        });

        return matchingChildren;
    }

    const keyValueInternal: Record<string, string> = {};
    const formElements = getAllChildrenByTypeRecursive(children, typeof Input);
    formElements.forEach((element: ReactNode) => {
        if (React.isValidElement(element)) {
            const props = element.props as { name?: string; value?: string };
            if (props.name) {
                keyValueInternal[props.name] = props.value ?? "";
            }
        }
    });

    return <>{children}</>;
};

export default Form;