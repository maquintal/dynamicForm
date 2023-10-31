import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField"
import React, { useRef } from "react";
import { useController } from "react-hook-form";
import NumberFormat from "react-number-format"

type ControlledTextField = {
  control: any;
  name: string;
  label: string;
  endAdornment?: string | null;
  decimalScale?: number;
  rules: { required: boolean };
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

const InputNumberFormatTextField = ({
  control,
  name,
  label,
  endAdornment,
  decimalScale,
  rules,
  disabled,
  placeholder,
  defaultValue
}: ControlledTextField) => {
  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted },
  } = useController({
    name,
    control,
    rules: { required: rules?.required },
    defaultValue
  });

  // const [value, setValue] = React.useState(0)
  return (
    <NumberFormat
      {...inputProps}
      // getInputRef={inputProps?.ref}
      ref={useRef(null)}
      allowNegative={false}
      thousandSeparator={" "}
      decimalScale={2}
      fixedDecimalScale
      // suffix=" $"
      customInput={TextField}
      fullWidth
      variant={"outlined"}
      label={label}
      error={error && error !== undefined || false}
      helperText={error ? `${inputProps?.name} is required` : ""}
      required={rules?.required !== false || false}
      placeholder={placeholder || ""}
      disabled={disabled || false}
      defaultValue={defaultValue}
      // value={value}
      InputProps={{
        endAdornment: <InputAdornment position="end">{endAdornment || "$"}</InputAdornment>,
      }}
    />
  )
}

export default InputNumberFormatTextField