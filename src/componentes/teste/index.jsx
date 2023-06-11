import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';

const Teste = () => {
    const[user,setUser]=useState("");
    const[array,setArray]=useState([]);
    const[users,setUsers]=useState([]);

  const adicionarValor=()=>{
    setArray([...array,1,2,3,4])
  };

  const armazenarUser= async()=>{
   const response=await axios.get("paciente/");
   setUsers(response.data);
   
  }

  useEffect(()=>{

    setUser("daniel")
    adicionarValor();
    armazenarUser();
  },[]);


  return (
    <div>
      
      <div>
          
          {users.map(u => (
           <>
          <hr />
          <li>{u.nome}</li>
          <li>{u.cpf}</li>
          <li>{u.telefone}</li>
          </>
        ))}
      </div>
      
    </div>
  )
}

export default Teste