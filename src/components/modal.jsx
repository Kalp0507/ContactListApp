import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {createPortal} from 'react-dom'

function Modal({onClose,isOpen,children}) {
  return createPortal(
    <>
    {isOpen && (
    <>
        <div className="relative z-[6] min-h-[200px] bg-white max-w-[80%] p-3 m-auto">
            <div className="flex justify-end">
                <AiOutlineCloseCircle onClick={onClose} className='text-2xl'/>
            </div>
            {children}
        </div>
        <div className="absolute h-full w-full z-[5] top-0 backdrop-blur" 
        onClick={onClose}></div>
    </>
    )}
    </>
  ,document.getElementById('modal-root'))
}

export default Modal

// reach
// market
// fair competition
// trust
// employability
// profit