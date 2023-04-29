import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from '../../config/axios';
import { FaPen } from 'react-icons/fa';





const FormExameGeral = () => {
  const navigate=useNavigate();
  const {pacienteid, atendimentoid, examegeralid}=useParams();
  const [pacientes,setpacientes]=useState([]);
  const [examegeral, setExamegeral]=useState([]);
  const [pressaosistolica, setPressaosistolica]=useState(0);
  const [pressaodiastolica, setPressaodiastolica]=useState(0);
  const [pulsacao, setPulsacao]=useState(0);
  const [respiracao, setRespiracao]=useState(0);
  const [temperatura, setTemperatura]=useState(0);

useEffect(() => {
    axios
    .get("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examegeral/"+examegeralid)
    .then((response) => {
        if(!(response?.data[0].concluido)){
            setPressaosistolica(response.data[0].pressaosistolica);
            setPressaodiastolica(response.data[0].pressaodiastolica);
            setPulsacao(response.data[0].pulsacao);
            setRespiracao(response.data[0].respiracao);
            setTemperatura(response.data[0].temperatura);
            setExamegeral(response.data[0] || null);
        }
        else{
            navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examegeral/");
        }
    }
    )
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      })
  }, [])

  useEffect(() => {
    axios
    .get("Paciente/")
    .then((response)=>setpacientes(response.data))

  
    .catch ((err) => {
      console.error("aconteceu um erro"+err);
    });
  }, []);
  
  
  const handleUpdate=(e)=>{
    e.preventDefault();
    axios
    .post("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examegeral/"+examegeralid, {pressaosistolica,pressaodiastolica,pulsacao,respiracao,temperatura})
    .then((response) => {
        if(response?.data){
            navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examegeral/");
        }
        else{
            alert("Dados Inválidos");
        }
    }
    )
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
      })


  }



  return (
    <div className="container text-center">
      <Form type="submit" onSubmit={handleUpdate}>

        <h1 className='title'> Paciente {pacientes[0]?.nome}</h1>
       
        <h3 className='subtitle'>Data Nacimento:  {(pacientes[0])?new Date(pacientes[0]?.datanascimento).toLocaleDateString("pt-BR"):""}
      </h3>
        <h3 className='subtitle'>CPF: {pacientes[0]?.cpf}</h3>

        <div>
            <label htmlFor="pressaosistolica">Pressão Sistólica</label>
            <input type="number" name="pressaosistolica" id="pressaosistolica" value={pressaosistolica} onChange={(e)=>{setPressaosistolica(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="pressaodiastolica">Pressão Diastólica</label>
            <input type="number" name="pressaodiastolica" id="pressaodiastolica" value={pressaodiastolica} onChange={(e)=>{setPressaodiastolica(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="pulsacao">Pulsação</label>
            <input type="number" name="pulsacao" id="pulsacao" value={pulsacao} onChange={(e)=>{setPulsacao(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="respiracao">Respiração</label>
            <input type="number" name="respiracao" id="respiracao" value={respiracao} onChange={(e)=>{setRespiracao(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="temperatura">Temperatura</label>
            <input type="number" name="temperatura" id="temperatura" value={temperatura} onChange={(e)=>{setTemperatura(e.target.value)}}/>
        </div>
        <Button className="formButtom" type="submit"><FaPen/>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default FormExameGeral;
