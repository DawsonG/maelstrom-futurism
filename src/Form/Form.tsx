import React, { PureComponent } from "react";

import { FormContext } from "./FormControl";

interface FormInterface {
  children?: JSX.Element;
  onSubmit?: (event: object, values: object) => any;
}

class Form extends PureComponent<FormInterface> {
  state = {
    values: {},
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(e, this.state.values);
    }
  };

  setValue = (name: string, value: any) => {
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        [name]: value
      }
    });
  };

  render() {
    const formContext = {
      values: this.state.values,
      errors: this.state.errors,
      setValue: this.setValue
    };

    const { children, ...restProps } = this.props;

    return (
      <FormContext.Provider value={formContext}>
        <form {...restProps} onSubmit={this.onSubmit}>
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}

export default Form;
