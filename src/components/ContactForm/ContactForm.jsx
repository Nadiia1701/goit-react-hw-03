import { Formik, Form, Field, ErrorMessage } from "formik"
import { useId } from "react"
import * as Yup from "yup"
import { nanoid } from 'nanoid'
import css from "./ContactForm.module.css"

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
  number: Yup.string().matches(/^\d{3}-\d{2}-\d{2}$/, "Invalid phone number format").required("Required"),
});

export default function ContactForm({ onAdd }) {
    
   const handleSubmit = (values, action) => {
    const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.number
    };
    onAdd(newContact);
    action.resetForm();
};

    const nameFieldId = useId();
    const numberFieldId = useId();

    return (
        < Formik
            initialValues={{
                name: "",
                number: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
        >
            <Form className={css.formContainer}>
                <label htmlFor={nameFieldId}>Name</label>
                <Field type="text" name="name" id={nameFieldId} />
                <ErrorMessage name="name" as="span" />
                <label htmlFor={numberFieldId}>Number</label>
                <Field type="text" name="number" id={numberFieldId} />
                <ErrorMessage name="number" as="span" />
                <button className={css.btn} type="submit">Add contact</button>
            </Form>
        </Formik>
    );
}