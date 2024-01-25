import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import {BiSearch } from 'react-icons/bi'
import {AiFillPlusCircle} from 'react-icons/ai'
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from './config/firebase'
import ContactCard from './components/contactCard'
import AddAndUpdate from './components/AddAndUpdate'
import useDisclouse from './hooks/useDisclouser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactsNotFound from './components/ContactsNotFound'

function App() {
  const [contacts,setContacts] = useState([])
  const {isOpen,onClose,onOpen} = useDisclouse()

  
  useEffect(()=>{
    const getContacts = async () =>{
      try {
        const contactRef = collection(db,"contacts")
        onSnapshot(contactRef,(snapShort)=>{
          const contactList = snapShort.docs.map((doc)=>{
            return{
              id: doc.id,
              ... doc.data()
            }
          });
          setContacts(contactList)
          return contactList
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  },[])

  async function filterContact(e){
    const value = e.target.value 
    const contactRef = collection(db,"contacts")
    onSnapshot(contactRef,(snapShort)=>{
      const contactList = snapShort.docs.map((doc)=>{
        return{
          id: doc.id,
          ... doc.data()
        }
      });
      const filteredContact = contactList.filter(contacts=>contacts.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContact)
      return filteredContact
    })
  }
  
  return (
    <>
      <div className='max-w-[370px] mx-auto px-4'>
        <Navbar />
        <div className='flex gap-2'>
          <div className='relative flex items-center flex-grow'>
            <BiSearch className='absolute text-white text-3xl ml-1'/>
            <input type="text" 
            onChange={(e)=>filterContact(e)}
            className='flex-grow h-10 bg-transparent border-white rounded-xl border text-white pl-9'/>
          </div>
          <AiFillPlusCircle className='text-4xl text-white cursor-pointer' onClick={onOpen}/>
        </div>

        <div className='py-4'>
          {contacts.length==0? <ContactsNotFound/> :  contacts.map((contact)=>(
            <ContactCard  key={contact.id} contact={contact}/>
            ))}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position='top-center'/>
    </>
  )
}

export default App
