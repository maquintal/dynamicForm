import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import { useController } from "react-hook-form";

type ControlledAutoComplete = {
  control: any;
  name: string;
  label: string;
  rules: { required: boolean };
  options: string[];
}

const InputAutoComplete = ({ control, name, label, rules, options }: ControlledAutoComplete) => {
  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: { required: rules?.required },
  });

  // https://www.reddit.com/r/reactjs/comments/t070wr/reacthook_form_v7_how_to_make_a_reusable/
  // https://codesandbox.io/s/react-hook-form-wizard-form-complete-nnew-hvu5t8?file=/src/fieldArray.js:1001-1711

  // console.log(inputProps)

  return (
    <Autocomplete
      {...inputProps}
      onChange={(e, newValue) => {
        inputProps.onChange(newValue);
      }}
      options={options}
      // isOptionEqualToValue={(option, value) =>
      //   option?.label === value?.label
      // }
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant={"outlined"}
          label={label}
          error={error && error !== undefined || false}
          helperText={error ? `${inputProps.name} is required` : ""}
          required={rules?.required !== false || false}
        />
      )}
    />
  )
}

export default InputAutoComplete