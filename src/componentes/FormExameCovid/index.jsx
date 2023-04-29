import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from '../../config/axios';
import { FaPen } from 'react-icons/fa';
import { resultadoCovid } from '../../utils';




const FormExameCovid = () => {
  const resultado=resultadoCovid();
  const navigate=useNavigate();
  const {pacienteid, atendimentoid, examecovidid}=useParams();
  const [pacientes,setpacientes]=useState([]);
  const [examecovid, setExamecovid]=useState([]);
  const [febre, setFebre]=useState(false);
  const [coriza, setCoriza]=useState(false);
  const [narizentupido, setNarizentupido]=useState(false);
  const [cansaco, setCansaco]=useState(false);
  const [dordecabeca, setDordecabeca]=useState(false);
  const [doresnocorpo, setDoresnocorpo]=useState(false);
  const [malestargeral, setMalestargeral]=useState(false);
  const [dordegarganta, setDordegarganta]=useState(false);
  const [dificuldadederespirar, setDificuldadederespirar]=useState(false);
  const [faltadepaladar, setFaltadepaladar]=useState(false);
  const [faltadeolfato, setFaltadeolfato]=useState(false);
  const [dificuldadedelocomocao,setDificuldadedelocomocao]=useState(false);

useEffect(() => {
    axios
    .get("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examecovid/"+examecovidid)
    .then((response) => {
        if(!(response?.data[0].concluido)){
            setFebre(response.data[0].febre);
            setCoriza(response.data[0].coriza);
            setNarizentupido(response.data[0].narizentupido);
            setCansaco(response.data[0].cansaco);
            setDordecabeca(response.data[0].dordecabeca);
            setDoresnocorpo(response.data[0].doresnocorpo);
            setMalestargeral(response.data[0].malestargeral);
            setDordegarganta(response.data[0].dordegarganta);
            setDificuldadederespirar(response.data[0].dificuldadederespirar);
            setFaltadepaladar(response.data[0].faltadepaladar);
            setFaltadeolfato(response.data[0].faltadeolfato);
            setDificuldadedelocomocao(response.data[0].dificuldadedelocomocao);
            setExamecovid(response.data[0] || null);
        }
        else{
            navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examecovid/");
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
    .post("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examecovid/"+examecovidid, {febre, coriza, narizentupido, cansaco, dordecabeca, doresnocorpo, malestargeral, dordegarganta, dificuldadederespirar, faltadepaladar, faltadeolfato, dificuldadedelocomocao})
    .then((response) => {
      
        if(response?.data){
            navigate("/Paciente/"+pacienteid+"/Atendimento/"+atendimentoid+"/Examecovid/");
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
    <div className="container">
      <Form type="submit" onSubmit={handleUpdate}>

        <h1 className='title'> Paciente {pacientes[0]?.nome}</h1>
       
        <h3 className='subtitle'>Data Nacimento:  {(pacientes[0])?new Date(pacientes[0]?.datanascimento).toLocaleDateString("pt-BR"):""}
       </h3>
        <h3 className='subtitle'>CPF: {pacientes[0]?.cpf}</h3>
        <h3>Condição: {resultado}</h3>

        <div>
          <input type="checkbox" name="febre" id="febre" className="form-check-input" checked={febre} onChange={(e)=>{setFebre(e.target.checked)}}/>
          <label htmlFor="febre">Febre</label>
        </div>
        <div>
          <input type="checkbox" name="coriza" id="coriza" className="form-check-input" checked={coriza} onChange={(e)=>{setCoriza(e.target.checked)}}/>
          <label htmlFor="coriza">Coriza</label>
        </div>
        <div>
          <input type="checkbox" name="narizentupido" id="narizentupido" className="form-check-input" checked={narizentupido} onChange={(e)=>{setNarizentupido(e.target.checked)}}/>
          <label htmlFor="narizentupido">Nariz Entupido</label>
        </div>
        <div>
          <input type="checkbox" name="cansaco" id="cansaco" className="form-check-input" checked={cansaco} onChange={(e)=>{setCansaco(e.target.checked)}}/>
          <label htmlFor="cansaco">Cansaço</label>
        </div>
        <div>
          <input type="checkbox" name="dordecabeca" id="dordecabeca" className="form-check-input" checked={dordecabeca} onChange={(e)=>{setDordecabeca(e.target.checked)}}/>
          <label htmlFor="dordecabeca">Dor de Cabeça</label>
        </div>
        <div>
          <input type="checkbox" name="doresnocorpo" id="doresnocorpo" className="form-check-input" checked={doresnocorpo} onChange={(e)=>{setDoresnocorpo(e.target.checked)}}/>
          <label htmlFor="doresnocorpo">Dores no Corpo</label>
        </div>
        <div>
          <input type="checkbox" name="malestargeral" id="malestargeral" className="form-check-input" checked={malestargeral} onChange={(e)=>{setMalestargeral(e.target.checked)}}/>
          <label htmlFor="malestargeral">Mal Estar Geral</label>
        </div>
        <div>
          <input type="checkbox" name="dordegarganta" id="dordegarganta" className="form-check-input" checked={dordegarganta}onChange={(e)=>{setDordegarganta(e.target.checked)}}/>
          <label htmlFor="dordegarganta">Dor de garganta</label>
        </div>
        <div>
          <input type="checkbox" name="dificuldadedderespirar" id="dificuldadederespirar" className="form-check-input" checked={dificuldadederespirar} onChange={(e)=>{setDificuldadederespirar(e.target.checked)}}/>
          <label htmlFor="dificuldadederespirar">Dificuldade de Respirar</label>
        </div>
        <div>
          <input type="checkbox" name="faltadepaladar" id="faltadepaladar" className="form-check-input" checked={faltadepaladar} onChange={(e)=>{setFaltadepaladar(e.target.checked)}}/>
          <label htmlFor="faltadepaladar">Falta de Paladar</label>
        </div>
        <div>
          <input type="checkbox" name="faltadeolfato" id="faltadeolfato" className="form-check-input" checked={faltadeolfato} onChange={(e)=>{setFaltadeolfato(e.target.checked)}}/>
          <label htmlFor="faltadeolfato">Falta de Olfato</label>
        </div>
        <div>
          <input type="checkbox" name="dificuldadedelocomocao" id="dificuldadedelocomocao" className="form-check-input" checked={dificuldadedelocomocao} onChange={(e)=>{setDificuldadedelocomocao(e.target.checked)}}/>
          <label htmlFor="dificuldadedelocomocao">Dificuldade de Locomoção</label>
        </div>
        <Button className="formButtom" type="submit"><FaPen/>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default FormExameCovid;
