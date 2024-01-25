import React, { useState } from 'react'

const useDisclouse = ()=>{
    const [isOpen,setOpen] = useState(false)
    function onOpen (){
      setOpen(true)
    }
    function onClose (){
      setOpen(false)
    }
  return {onOpen,onClose,isOpen};
}

export default useDisclouse;
