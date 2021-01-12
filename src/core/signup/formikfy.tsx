import React from 'react';
import { Field } from 'formik';
import { FormControl } from '@material-ui/core';

export const formikfy = (Component, presetProps: any = {}) => {
  const Wrapped = (props) => {
    const name = props.name;
    const variant = props.variant || 'outlined';
    return (
      <Field>
        {({ form }) => {
          const { values, errors, touched, handleChange, setFieldTouched } = form;

          if (presetProps.form) {
            presetProps.form = form;
          }

          return (
            <FormControl variant={variant}>
              <Component
                {...presetProps}
                value={(values && values[name]) || ''}
                error={touched[name] && errors[name]}
                helperText={touched[name] && errors[name]}
                variant={variant}
                {...props}
                onChange={(e) => {
                  props.onChange?.(e);
                  setFieldTouched(name);
                  handleChange(e);
                }}
              />
            </FormControl>
          );
        }}
      </Field>
    );
  };

  Wrapped.displayName = Component.diplayName;
  return Wrapped;
};
