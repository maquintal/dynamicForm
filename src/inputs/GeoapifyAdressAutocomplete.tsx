import { queryer } from "@src/utils/axios.utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import React from "react";
import { useController } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import getConfig from 'next/config';

type ControlledAutoComplete = {
  control: any;
  index?: any;
  field?: any;
  name: string;
  label: string;
  rules: { required: boolean };
  restfulCall?: string;
  options: string[];
  objectLabel?: string;
}

const InputGeoapifyAdressAutocomplete = ({
  control,
  index,
  field,
  name,
  label,
  rules,
  restfulCall,
  options,
  objectLabel
}: ControlledAutoComplete) => {

  const { publicRuntimeConfig } = getConfig();
  const [optionsRestful, setOptionsRestful] = React.useState(options);
  const [error2, setError] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("Canada");

  const geoapifyKey = publicRuntimeConfig.GEOAPIFY;

  React.useEffect(() => {
    
    const loadAsyncStuff = async () => {
      try {
        const response: any = await queryer(
          "GET",
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&filter=countrycode:ca&apiKey=${geoapifyKey}`
        )

        // console.log(response)
        setOptionsRestful(response?.data?.features);
      } catch (error) {
        setError(error2);
      } finally {
        setLoaded(true);
      }
    };

    search !== "Canada" ? loadAsyncStuff() : "";

  }, [error2, field, geoapifyKey, search]);

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
        // console.log(newValue)
        // inputProps.onChange(newValue); // whole object

        if (newValue) {

          let propsKey = newValue?.[`${objectLabel}`]

          const customOutput = { [`${objectLabel}`]: propsKey }
          inputProps.onChange(customOutput);
        } else {
          inputProps.onChange("")
        }

      }}
      onInputChange={
        (event: React.SyntheticEvent, value: string, reason: string) => {
          if (value /* && value.length > 3 */) {
            // setTimeout(
            //   () => setSearch(value),
            //   1000
            // );
            setSearch(value)
          }
        }
      }
      options={optionsRestful}
      isOptionEqualToValue={(option, value) =>
        option?.[`${objectLabel}`]?.place_id === value?.[`${objectLabel}`]?.place_id
      }
      getOptionLabel={(option: any) => {
        return (
          option
            ? `${option?.properties?.formatted} ${option?.properties?.district
              ? "(" + option?.properties?.district + ")"
              : ""}`
            : ""
        )
      }}
      // filterOptions={(selected) => selected}
      // filterSelectedOptions
      multiple={false}
      // freeSolo={true}
      renderInput={(params) => (
        <React.Fragment>
          <TextField
            {...params}
            fullWidth
            variant={"outlined"}
            label={label}
            error={error && error !== undefined || false}
            helperText={error ? `${inputProps.name} is required` : ""}
            required={rules?.required !== false || false}
          />
          <FormHelperText id="component-helper-text">
            Powered by <a href="https://www.geoapify.com/">Geoapify</a>
          </FormHelperText>
        </React.Fragment>
      )}
    />
  )
}

export default InputGeoapifyAdressAutocomplete