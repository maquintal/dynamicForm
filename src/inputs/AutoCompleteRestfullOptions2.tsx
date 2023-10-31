// ;
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField"
// import { queryer } from "@src/utils/axios.utils";
// import React from "react";
// import { useController } from "react-hook-form";

// type ControlledAutoComplete = {
//   control: any;
//   index?: any;
//   field?: any;
//   name: string;
//   label: string;
//   rules: { required: boolean };
//   restfulCall: string;
//   options: string[];
//   objectLabel: string;
// }

// const InputAutoCompleteRestfulOptions = ({ control, index, field, name, label, rules, restfulCall, options, objectLabel }: ControlledAutoComplete) => {

//   const [optionsRestful, setOptionsRestful] = React.useState(options);

//   const [error2, setError] = React.useState("");
//   const [loaded, setLoaded] = React.useState(false);

//   React.useEffect(() => {
//     const loadAsyncStuff = async () => {
//       try {
//         const response: any = await queryer("GET", `${restfulCall}`)
//         setOptionsRestful(response?.data);
//       } catch (error) {
//         setError(error2);
//       } finally {
//         setLoaded(true);
//       }
//     };

//     loadAsyncStuff();
//   }, []);

//   const {
//     field: { ...inputProps },
//     fieldState: { invalid, isTouched, isDirty, error },
//     formState: { touchedFields, dirtyFields, isSubmitted }
//   } = useController({
//     name,
//     control,
//     rules: { required: rules?.required },
//   });

//   return (
//     <Autocomplete
//       {...inputProps}
//       onChange={(e, newValue) => {

//         let propsKey = newValue?.[`${objectLabel}`]
//         const { _id, } = newValue

//         const customOutput = { _id, [`${objectLabel}`]: propsKey }
//         inputProps.onChange(customOutput);
//       }}
//       options={optionsRestful}
//       isOptionEqualToValue={(option, value) =>
//         option._id === value._id
//       }
//       getOptionLabel={(option) => option?.[`${objectLabel}`]}
//       filterSelectedOptions
//       multiple={false}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           fullWidth
//           variant={"outlined"}
//           label={label}
//           error={error && error !== undefined || false}
//           helperText={error ? `${inputProps.name} is required` : ""}
//           required={rules?.required !== false || false}
//         />
//       )}
//     />
//   )
// }

// export default InputAutoCompleteRestfulOptions