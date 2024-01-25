import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../config/firebase'
import useDisclouser from '../hooks/useDisclouser'
import AddAndUpdate from './AddAndUpdate'
import { toast } from 'react-toastify'

function ContactCard({contact}) {
  const {isOpen,onClose,onOpen} = useDisclouser()

  async function deleteContact(id){
    try {
      await deleteDoc(doc(db,"contacts",id))
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
  <>
    <div key={contact.id} className='bg-yellow rounded-md flex items-center justify-between mb-2 p-1'>
    <div className='flex gap-2 items-center'>
    <BiUserCircle className='text-4xl text-orange'/>
    <div className=''>
      <h2 className='font-medium'>{contact.name}</h2>
      <p className='text-sm'>{contact.email} </p>
    </div>
    </div>
    <div className='flex gap-2 items-center px-1'>
      <RiEditCircleLine className='text-3xl text-blue-600 cursor-pointer' onClick={onOpen}/>
      <FaTrash className='text-2xl cursor-pointer' onClick={()=>deleteContact(contact.id)}/> 
    </div>
    </div>
    <AddAndUpdate contact={contact} onClose={onClose} isOpen={isOpen} isUpdate />
  </>
  )
}

export default ContactCard
