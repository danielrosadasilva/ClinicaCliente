import React, { useState } from 'react'
import { findByPacienteCpf, newAtendimentoByPaciente } from '../../services/PacienteServices';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { convertCpfFormattedStringToNumber } from '../../utils';
import { Button, Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

const FormAtendimento = () => {
    const [cpf,setCpf]=useState("");
    const navigate=useNavigate();


    const handleNewAtendimento= (e)=>{
        e.preventDefault();
        try{
            //let paciente= buscarPacientePorCpf(cpf)[0];
          
            let paciente="";
            const cpfnumerico = convertCpfFormattedStringToNumber(cpf);
            findByPacienteCpf(cpfnumerico)
            .then((response) => {
                paciente=response.data;
                if(paciente){
                    alert(paciente[0].id);
                    newAtendimentoByPaciente(paciente[0].id)
                    .then((response)=>{
                      if(response.data){
                        alert("Solicitação registrada com sucesso!");
                        navigate(-1);
                      }
                      else{
                        alert("Erro ao solicitar atendimento");
                    }
                    })
                    .catch((err)=>{
                      return false;
                    })
                  }
                else{
                    alert("Cpf não cadastrado");
                }
            })
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
            
        }catch(e){
            alert("Erro ao solicitar atendimento");
        }
      }


  return (
    <main className="container">
      <h1 className="title">Solicitar Atendimento</h1>
        <Form onSubmit={handleNewAtendimento}>
          <Form.Group className="mb-3" controlId="formBasicCpf">
            <Form.Label className="">CPF</Form.Label>
            <Form.Control
              as={IMaskInput}
              mask="000.000.000-00"
              unmask={true}
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}        
            />
          </Form.Group>
          <Button type="submit"><FaPen/> Solicitar</Button>
        </Form>
    </main>
  )
}

export default FormAtendimento;