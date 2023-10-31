import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useController } from "react-hook-form";

type RadioGroupOptions = {
  label: string;
  value: string;
  disabled?: boolean
}

type ControlledRadioGroup = {
  control: any;
  name: string;
  label: string;
  rules: { required: boolean };
  options: Array<RadioGroupOptions>;
}

const InputRadioGroup = ({
  control,
  name,
  label,
  rules,
  options
}: ControlledRadioGroup) => {
  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: { required: rules?.required },
  });

  const buildDynamicOptions = (options: Array<RadioGroupOptions>) => {
    const formControlLabel = options.map((option: RadioGroupOptions, index: number) => {
      return (
        <FormControlLabel
          key={`radio-${label}-option-${option.value}`}
          label={`${option.label}`}
          value={`${option.value}`}
          control={<Radio />}
        />
      )
    })

    return formControlLabel
  }

  return (
    <FormControl
      {...inputProps}
      error={error && error !== undefined || false}
    >
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {buildDynamicOptions(options)}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" /> */}
        {/* <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </RadioGroup>
      <FormHelperText>{error ? `${inputProps.name} is required` : ""}</FormHelperText>
    </FormControl>
  )
}

export default InputRadioGroup