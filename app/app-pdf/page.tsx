'use client'

import React, { useState } from 'react';
import { PDFAcroForm, PDFButton, PDFCheckBox, PDFDocument, PDFDropdown, PDFField, PDFFont, PDFForm, PDFOptionList, PDFRadioGroup, PDFRef, PDFSignature, PDFTextField, rgb } from 'pdf-lib';
import InputAutoComplete from '@/src/inputs/AutoComplete';
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { FlattenOptions } from 'pdf-lib/cjs/api/form/PDFForm';
import InputTextField from '@/src/inputs/TextField';

const buildDynamicForm = (interactivePdfForm: PDFForm, control: any) => {

  if (interactivePdfForm) {
    // console.log(interactivePdfForm)

    const fields = interactivePdfForm.getFields();

    for (const field of fields) {
      console.log(`Editable field name: ${field.getName()}`);

      const fieldType = field.constructor.name;
      console.log(`Field Type: ${fieldType}`);

      // switch (true) {
      //   case /PDFDropdown/.test(fieldType):
      //     const opt = interactivePdfForm.getDropdown(field.getName()).getOptions()
      //     return (
      //       <InputAutoComplete
      //         control={control}
      //         name={`${field.getName()}`}
      //         label={`${field.getName()}`}
      //         rules={{ required: true }}
      //         options={opt}
      //       />
      //     )
      //   case /PDFTextField/.test(fieldType):
      //     return (
      //       <InputTextField
      //         control={control}
      //         name={`${field.getName()}`}
      //         label={`${field.getName()}`}
      //         rules={{ required: true }}
      //       />
      //     )

      //   default:
      //     return null
      // }

      if (fieldType === "PDFDropdown") {
        const opt = interactivePdfForm.getDropdown(field.getName()).getOptions()
        return (
          <InputAutoComplete
            control={control}
            name={`${field.getName()}`}
            label={`${field.getName()}`}
            rules={{ required: true }}
            options={opt}
          />
        )
      }

      if (fieldType === "PDFTextField") {
        return (
          <InputTextField
            control={control}
            name={`${field.getName()}`}
            label={`${field.getName()}`}
            rules={{ required: true }}
          />
        )
      }

    }
  }

};

const buildDynamicFormV2 = (interactivePdfForm: PDFForm, field: any, control: any) => {

  if (interactivePdfForm) {
    // console.log(interactivePdfForm)

    console.log(`Editable field name: ${field.getName()}`);

    const fieldType = field.constructor.name;
    console.log(`Field Type: ${fieldType}`);

    // switch (true) {
    //   case /PDFDropdown/.test(fieldType):
    //     const opt = interactivePdfForm.getDropdown(field.getName()).getOptions()
    //     return (
    //       <InputAutoComplete
    //         control={control}
    //         name={`${field.getName()}`}
    //         label={`${field.getName()}`}
    //         rules={{ required: true }}
    //         options={opt}
    //       />
    //     )
    //   case /PDFTextField/.test(fieldType):
    //     return (
    //       <InputTextField
    //         control={control}
    //         name={`${field.getName()}`}
    //         label={`${field.getName()}`}
    //         rules={{ required: true }}
    //       />
    //     )

    //   default:
    //     return null
    // }

    if (fieldType === "PDFDropdown") {
      console.log("kiki")
      const opt = interactivePdfForm.getDropdown(field.getName()).getOptions()
      return (
        <InputAutoComplete
          control={control}
          name={`${field.getName()}`}
          label={`${field.getName()}`}
          rules={{ required: true }}
          options={opt}
        />
      )
    }

    if (fieldType === "PDFTextField") {
      return (
        <InputTextField
          control={control}
          name={`${field.getName()}`}
          label={`${field.getName()}`}
          rules={{ required: true }}
        />
      )
    }

  }
};

const loadPdf = async (setInteractivePdfForm: any, setPdfDoc: any) => {

  // Load an existing PDF with editable fields
  const existingPdfBytes = await fetch('existing.pdf').then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  // console.log(form)
  // console.log(pdfDoc)

  // return form
  setInteractivePdfForm(form)
  setPdfDoc(pdfDoc)

}

function App() {

  const { handleSubmit, control, getValues, formState, setValue, setError } = useForm({
    defaultValues: {},
    mode: "onSubmit"
  });

  const [state, setState] = useState([])
  const [interactivePdfForm, setInteractivePdfForm]: any = useState()
  const [pdfDoc, setPdfDoc] = useState()
  const [formData, setFormData] = useState({});

  React.useEffect(() => {
    loadPdf(setInteractivePdfForm, setPdfDoc)
  }, [])

  React.useEffect(() => {
    // console.log(interactivePdfForm)
    // @ts-ignore
    // setState(buildDynamicForm(interactivePdfForm, control))

    if (interactivePdfForm) {
      const fields = interactivePdfForm.getFields();

      for (const field of fields) {
        console.log(`Editable field name: ${field.getName()}`);

        const fieldType = field.constructor.name;
        console.log(`Field Type: ${fieldType}`);

        // Updating state using the spread operator
        const val = buildDynamicFormV2(interactivePdfForm, field, control)
        console.log(val)
        console.log(JSON.stringify(val))
        // setState(state => ({
        //   ...state,  // Spread the previous state
        //   val
        // }));
      }
    }

    // setState(buildDynamicFormV2(interactivePdfForm, control))
  }, [control, interactivePdfForm]);

  const generatePDF = async (pdfDoc: PDFDocument) => {

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
    // console.log(interactivePdfForm)
    // console.log(pdfDoc)

    if (Object.keys(formData).length !== 0 && interactivePdfForm !== null && interactivePdfForm && pdfDoc) {
      // Set form field values from the form data
      Object.entries(formData).forEach(([key, value]) => {
        // form.getTextField(key).setValue(value) // .setText(value);
        // form.getDropdown(key).select(value)
        const dropdownField = interactivePdfForm.getField(key);
        dropdownField.select(value);
      });

      generatePDF(pdfDoc)

    }

  }, [formData, interactivePdfForm, pdfDoc])

  const onSubmit = async (data: any) => {
    setFormData(data)
  };

  return (
    <>
      <form>
        {/* {console.log(interactivePdfForm)} */}
        {state}
        <Button
          // onClick={handleSubmit(onSubmit(interactivePdfForm, pdfDoc))}
          onClick={handleSubmit(onSubmit)}
        > submit
        </Button>
        {JSON.stringify(formData)}
      </form>
    </>
  );
}

export default App;
