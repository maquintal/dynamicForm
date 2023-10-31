import TextField from "@mui/material/TextField"
import { useController } from "react-hook-form";

type ControlledTextField = {
  control: any;
  name: string;
  label: string;
  type?: "number";
  rules: { required: boolean };
  disabled?: boolean;
  placeholder?: string;
}

const InputTextField = ({
  control,
  name,
  label,
  type,
  rules,
  disabled,
  placeholder,
}: ControlledTextField) => {
  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: { required: rules?.required },
  });

  return (
    <TextField
      fullWidth
      {...inputProps}
      variant={"outlined"}
      label={label}
      type={type || ""}
      error={error && error !== undefined || false}
      helperText={error ? `${inputProps.name} is required` : ""}
      required={rules?.required !== false || false}
      disabled={disabled || false}
      placeholder={placeholder || ""}
    />
  )
}

export default InputTextField