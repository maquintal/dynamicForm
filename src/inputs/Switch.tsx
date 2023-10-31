import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField"
import { useController } from "react-hook-form";

type ControlledSwitch = {
  control: any;
  name: string;
  label: string;
  rules: { required: boolean };
  disabled?: boolean;
}

const InputSwitch = ({
  control,
  name,
  label,
  rules,
  disabled,
}: ControlledSwitch) => {
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
    <FormControl
      {...inputProps}
      component="fieldset"
      error={error && error !== undefined || false}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={""}
        // labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  )
}

export default InputSwitch