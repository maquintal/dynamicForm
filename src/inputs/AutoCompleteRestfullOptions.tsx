import { queryer } from "@src/utils/axios.utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import React from "react";
import { useController } from "react-hook-form";

type ControlledAutoComplete = {
  control: any;
  index?: any;
  field?: any;
  name: string;
  label: string;
  rules: { required: boolean };
  restfulCall: string;
  options: string[];
  objectLabel: string;
}

const InputAutoCompleteRestfulOptions = ({ control, index, field, name, label, rules, restfulCall, options, objectLabel }: ControlledAutoComplete) => {

  const [ready, setReady] = React.useState(true);
  const [optionsRestful, setOptionsRestful] = React.useState(options);
  const [inputValue, setInputValue] = React.useState('')

  const getOptions = React.useCallback(async () => {
    const restCallResult: any = await queryer("GET", `${restfulCall}`)
    setOptionsRestful(restCallResult?.data?.data)
    setReady(false)
  }, [restfulCall])

  ready && getOptions() || null

  // console.log(optionsRestful)
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
    <Autocomplete
      {...inputProps}
      onChange={(e, newValue) => {

        const customOutput = newValue.map((item) => {

          let propsKey = item?.[`${objectLabel}`]
          const { _id, } = item

          return { _id, [`${objectLabel}`]: propsKey }
        })

        inputProps.onChange(customOutput);
        // inputProps.onChange(newValue); // whole object
      }}
      options={optionsRestful}
      isOptionEqualToValue={(option, value) =>
        option._id === value._id
      }
      getOptionLabel={(option) => option?.[`${objectLabel}`]}
      // filterOptions={(selected) => selected}
      filterSelectedOptions
      multiple={true}
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

export default InputAutoCompleteRestfulOptions