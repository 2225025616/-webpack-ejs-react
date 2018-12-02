import React from "react";

export default class FormUtil {
  static ignoreFileUrl(field, context) {
    return Object.assign({}, field, {
      value: null,
      onChange: e => {
        field.value = e.target.files;
        if (context) context.forceUpdate();
        field.onChange(e);
      }
    });
  }

  static trimStringImage(values, ...attributes) {
    let newValues = {...values};
    for (let attr in attributes) {
      if (!(newValues[attributes[attr]] instanceof FileList )) {
        newValues[attributes[attr]] = undefined;
      }
    }

    return newValues;
  }

  static imageSrc(field) {
    if (field.value instanceof FileList) {
      if (field.value.length >= 1) {
        return field.value[0];
      }
      return null;
    } else {
      return field.value;
    }
  }

  static extract(field, type) {
    let handleChange;

    if (type === "select") {
      handleChange = (event, index, value) => {
        field.onChange(value);
      }
    } else {
      handleChange = (value) => {
        field.onChange(value);
      }
    }

    let {error, checked, defaultChecked, value, defaultValue, onBlur, onDragStart, onDrop, onFocus, touched} = field;
    return {
      errorText: touched && error,
      checked,
      defaultChecked,
      value,
      defaultValue,
      onBlur,
      onChange: handleChange,
      onDragStart,
      onDrop,
      onFocus
    };
  }
}
