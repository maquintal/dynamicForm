import { FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { Noop, useController, useWatch } from "react-hook-form";
import { CheckboxGroupOptions } from "@src/components/rhf/types/Form.type"

type ControlledCheckboxGroup = {
  control: any;
  name: string;
  label: string;
  rules: { required: boolean };
  options: Array<CheckboxGroupOptions>;
}

const InputMultiCheckboxGroup = ({
  control,
  name,
  label,
  rules,
  options
}: ControlledCheckboxGroup) => {
  const {
    field: { ref, value, onChange, ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: { required: rules?.required },
  });

  const checkboxIds = useWatch({ control, name: name }) || [];

  const buildDynamicOptions = (options: Array<CheckboxGroupOptions>) => {
    const formControlLabel = options.map((option: CheckboxGroupOptions) => {

      const { label, value } = option

      const handleChange = (value: any) => {
        const newArray = [...checkboxIds];
        const item = value;

        //Ensure array isnt empty
        if (newArray.length > 0) {
          //Attempt to find an item in array with matching id
          const index = newArray.findIndex((x) => x === item);

          // If theres no match add item to the array
          if (index === -1) {
            newArray.push(item);
          } else {
            //If there is a match and the value is empty, remove the item from the array
            newArray.splice(index, 1);
          }
        } else {
          //If the array is empty, add the item to the array
          newArray.push(item);
        }

        //Overwrite existing array with newArray}
        onChange(newArray);
      };

      return (
        <FormControlLabel
          control={
            <Checkbox
              // checked={value?.some(
              //   (checked: any) => checked === value
              // )}
              {...inputProps}
              inputRef={ref}
              onChange={() => handleChange(value)}
            // disabled={rest?.disabled}
            />
          }
          label={label}
          key={`checkbox-${label}-option-${value}`}
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
      <FormLabel id="demo-Checkbox-buttons-group-label">{label}</FormLabel>
      <FormGroup row>
        {buildDynamicOptions(options)}
      </FormGroup>
      <FormHelperText>{error ? `${inputProps.name} is required` : ""}</FormHelperText>
    </FormControl>
  )
}

export default InputMultiCheckboxGroup