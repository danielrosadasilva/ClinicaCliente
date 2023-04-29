import React, { useEffect, useState } from 'react'
import { findAll } from '../../services/PacienteServices';

const FotoPaciente = () => {
  const [img,setImg]=useState();

  useEffect(()=>{

    findAll.then((Response)=>{
      setImg(Response)})
      .catch((err)=>{

      });
  
    },[])
  

  return (
    <div>
  </div>
  )
}
export default FotoPaciente;