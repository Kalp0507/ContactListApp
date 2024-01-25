import React from 'react'
import Modal from './modal'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required")
})

function AddAndUpdate({onClose,isOpen, isUpdate, contact}) {
    async function addContact(contact){
        try {
            await addDoc(collection(db,"contacts"),contact)
            onClose()
            toast.success("Contact added successfully!")
        } catch (error) {
            console.log(error)
        }
    }
    async function updateContact(contact,id){
        try {
            const contactRef = doc(db,"contacts" ,id)
            await updateDoc(contactRef,contact)
            onClose()
            toast.success("Contact updated successfully!")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <Modal onClose={onClose} isOpen={isOpen} >
            <Formik
              validationSchema={contactSchemaValidation}
                initialValues = {isUpdate?{
                  name: contact.name,
                  email: contact.email,
                }:{
                    name: '',
                    email: '',
                }}
                onSubmit={(values)=>{
                  isUpdate ? updateContact(values,contact.id):addContact(values)
                }}
                >
                <Form className='flex flex-col gap-4 '>
                  <div className='flex flex-col'>
                    <label htmlFor="name">Name:</label>
                    <Field name='name' className='h-10 border' />
                    <div className="text-red-500 text-xs">
                      <ErrorMessage name='name'/>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="email">Email:</label>
                    <Field type='email' name='email' className='h-10 border' />
                    <div className="text-red-500 text-xs">
                      <ErrorMessage name='email'/>
                    </div>
                  </div>

                  <button className='bg-orange border px-3 py-1.5 self-end font-bold'>{isUpdate ? "update": "add"} contact</button>
                </Form>
            </Formik>
        </Modal>
    </div>
  )
}

export default AddAndUpdate
