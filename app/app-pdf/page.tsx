'use client'

import React, { useState } from 'react';
import { PDFDocument, PDFForm, rgb } from 'pdf-lib';
import InputAutoComplete from '@/src/inputs/AutoComplete';
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';

const buildDynamicForm = (form: PDFForm, control: any) => {

  if (form) {
    // console.log(form)

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
            name={`${field.getName()}`}
            label={`${field.getName()}`}
            rules={{ required: true }}
            options={opt}
          />
        )
        // return (form.getDropdown(field.getName()).getOptions())
      }

    }
  }

};



const loadPdf = async (setForm: any, setPdfDoc: any) => {

  // Load an existing PDF with editable fields
  const existingPdfBytes = await fetch('existing.pdf').then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  // console.log(form)
  // console.log(pdfDoc)

  // return form
  setForm(form)
  setPdfDoc(pdfDoc)

}

function App() {

  const { handleSubmit, control, getValues, formState, setValue, setError } = useForm({
    defaultValues: {},
    mode: "onSubmit"
  });

  const [state, setState] = useState([])
  const [form, setForm] = useState()
  const [pdfDoc, setPdfDoc] = useState()
  const [formData, setFormData] = useState({});


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  React.useEffect(() => {
    loadPdf(setForm, setPdfDoc)
  }, [])

  React.useEffect(() => {
    // console.log(form)
    // @ts-ignore
    setState(buildDynamicForm(form, control))
  }, [control, form]);

  const test = async () => {

    if (pdfDoc) {
      // Create a new PDF with the updated form fields
      const pdfBytes = await pdfDoc.save()

      if (pdfBytes) {

        // Save or display the modified PDF
        // For simplicity, you can just display it in a new tab here
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
    }

  }

  React.useEffect(() => {
    console.log(form)
    console.log(pdfDoc)

    if (Object.keys(formData).length !== 0 && form !== null && form && pdfDoc) {
      // Set form field values from the form data
      Object.entries(formData).forEach(([key, value]) => {
        // form.getTextField(key).setValue(value) // .setText(value);
        // form.getDropdown(key).select(value)
        const dropdownField = form.getField(key);
        dropdownField.select(value);
      });

      test()

    }

  }, [formData, form, pdfDoc])

  const onSubmit = async (data: any/* , form: any, pdfDoc: any */) => {
    setFormData(data)

    // const data = await getValues()
    // console.log(data)

  };

  return (
    <>
      <form>
        {/* {console.log(form)} */}
        {state}
        <Button
          // onClick={handleSubmit(onSubmit(form, pdfDoc))}
          onClick={handleSubmit(onSubmit)}
        > submit
        </Button>
        {JSON.stringify(formData)}
      </form>
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
