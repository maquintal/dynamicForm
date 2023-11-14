import InputAutoComplete from "@/src/inputs/AutoComplete";
import { PDFDocument, PDFForm } from "pdf-lib";
import { useForm } from "react-hook-form";

const loadPdf = async () => {

  // Load an existing PDF with editable fields
  const existingPdfBytes = await fetch('http://localhost:3000/public/existing.pdf').then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  // console.log(form)
  // console.log(pdfDoc)

  return { form, pdfDoc }

}

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

const DynamicPdfEditor = async () => {

  const loadedPdf = await loadPdf()

  const { handleSubmit, control, getValues, formState, setValue, setError } = useForm({
    defaultValues: {},
    mode: "onSubmit"
  });

  // const formBody = buildDynamicForm(loadedPdf.form, control)

  return (
    <>
      {"formBody"}
    </>
  )
}

export default DynamicPdfEditor