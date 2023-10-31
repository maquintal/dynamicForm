'use client'

import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import InputAutoComplete from '@/src/inputs/AutoComplete';
import { useForm } from "react-hook-form";

const generatePDF = async (control) => {

  // Load an existing PDF with editable fields
  const existingPdfBytes = await fetch('existing.pdf').then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  // console.log(form)

  // Set form field values from the form data
  // form.getTextField('Name').setText(formData.name);

  const fields = form.getFields();

  for (const field of fields) {
    console.log(`Editable field name: ${field.getName()}`);

    const fieldType = field.constructor.name;
    // console.log(`Field Type: ${fieldType}`);

    // if (fieldType === "PDFDropdown") {
    //   console.log(form.getDropdown(field.getName()).getOptions())
    // }

    if (fieldType === "PDFDropdown") {
      const opt = form.getDropdown(field.getName()).getOptions()
      return (
        <InputAutoComplete
          control={control}
          name="test"
          label="autocomplete"
          // name={`scenarios.${index}.loanDurationInYears`}
          // label={`${intl.formatMessage({ id: "calculators.form.sectionLoanInfo.inputs.loanDurationInYears" })}`}
          rules={{ required: true }}
          options={opt}
        />
      )
      // return (form.getDropdown(field.getName()).getOptions())
    }


  }

  // Create a new PDF with the updated form fields
  // const pdfBytes = await pdfDoc.save();

  // // Save or display the modified PDF
  // // For simplicity, you can just display it in a new tab here
  // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  // const url = window.URL.createObjectURL(blob);
  // window.open(url);
};

function App() {

  const { handleSubmit, control, getValues, formState, setValue, setError } = useForm({
    defaultValues: {
      test: ""
    },
    mode: "onSubmit"
  });

  const [state, setState] = useState([])
  // const [formData, setFormData] = useState({ name: '' });


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  React.useEffect(() => {
    setState(generatePDF(control))
  }, []);


  return (
    <>
      {state}
    </>
    // <div>
    //   <label>
    //     Name:
    //     <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
    //   </label>
    //   <br />
    //   {/* <button onClick={generatePDF}>Generate PDF</button> */}
    //   {/* {JSON.stringify(buildDynamicForm)} */}
    // </div>
  );
}

export default App;
