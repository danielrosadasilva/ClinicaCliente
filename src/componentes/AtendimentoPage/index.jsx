import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaPen,FaRegListAlt,FaUserMd,FaBiohazard,FaClipboardCheck, FaBars } from "react-icons/fa";

import { IMaskInput } from "react-imask";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import axios, { URL_BASE_EXAMECOVID, URL_BASE_EXAMEGERAL } from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { convertCpfFormattedStringToNumber } from "../../utils";
import { newAtendimentoByPaciente } from "../../services/PacienteServices";

const AtendimentoPage = ({ pacienteId }) => {
  const { pacienteid } = useParams();
  const [cpfpacientepesquisa, setCpfpacientepesquisa] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [atendimentos, setAtendimento] = useState([]);
  const navigate = useNavigate();
  const [atualizacao, setAtualizacao]=useState(false);

  const URL_BASE_ATENDIMENTO = "Atendimento/";
  const URL_BASE_PACIENTE = "Paciente/";

  useEffect(() => {
    if (pacienteid) {
      axios
        .get(URL_BASE_PACIENTE + pacienteid)
        .then((response) => {
          setPacientes(response.data);
          axios
            .get(URL_BASE_PACIENTE + pacienteid + "/" + URL_BASE_ATENDIMENTO)
            .then((response) => setAtendimento(response.data))
            .catch((err) => {
            });
        })
        .catch((err) => {
        });
    } else {
      axios
        .get(URL_BASE_ATENDIMENTO)
        .then((response) => setAtendimento(response.data))
        .catch((err) => {
        });
    }
  }, [atualizacao]);

  useEffect(() => {
    const cpfnumerico = convertCpfFormattedStringToNumber(cpfpacientepesquisa);
    if(cpfnumerico){
      axios
        .get(URL_BASE_PACIENTE + "cpf=" + cpfnumerico)
        .then((response) => setPacientes(response.data))
        .catch((err) => {
        });
    }
  }, [cpfpacientepesquisa]);

  const handleNewAtendimento = () => {
    if (pacienteid) {
      if (newAtendimentoByPaciente(pacienteid)) {
        setAtualizacao(!atualizacao);
        alert("Solicitação registrada com sucesso!");
      } else {
        alert("Erro ao solicitar atendimento");
      }
    } else {
      navigate("/Atendimento/Novo");
    }
  };

  const handleFinalizar=(idpaciente,idatendimento)=>{
    axios
        .post(URL_BASE_PACIENTE+idpaciente+"/"+URL_BASE_ATENDIMENTO+idatendimento+"/Finalizar",{})
        .then((response) => {
          if(response?.data){
            alert("Atendimento finalizado com sucesso");
            setAtualizacao(!atualizacao);
          }
          else{
            alert("Falha ao finalizar atendimento");
          }
        })
        .catch((err) => {
        });
  }

  return (
    <section className="container">
      <h1 className="title">Atendimentos do Paciente</h1>
      {(pacientes.length>0)?<p>Paciente: {pacientes[0]?.nome}</p>:<></>}
      <Button className="btopcao" onClick={() => handleNewAtendimento()}>
        <FaPen/> Solicitar Atendimento
      </Button>

      {(!pacientes.length>0)?
      <Form.Group className="mb-3" controlId="formBasicCpfpesquisa">
        <Form.Label placeholder="Digite o CPF"></Form.Label>
        <Form.Control
          as={IMaskInput}
          mask="000.000.000-00"
          unmask={true}
          placeholder="Digite o CPF"
          value={cpfpacientepesquisa}
          onChange={(e) => setCpfpacientepesquisa(e.target.value)}
        />
        

        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      :<></>}
      <Table responsive striped bordered hover>
        <thead></thead>

        <tbody>
          <tr>
            <th className="tbcabecalho">ID</th>
            <th className="tbcabecalho">Data Atendimento</th>
            <th className="tbcabecalho">Concluido</th>
            <th></th>
          </tr>
          {atendimentos ? (
            atendimentos.map((atendimento) => (
              <tr>
                <td style={{backgroundColor:(atendimento.concluido)?"#22CC66":""}}>{atendimento.id}</td>
                <td style={{backgroundColor:(atendimento.concluido)?"#22CC66":""}}>
                  {new Date(atendimento.datahoraatendimento).toLocaleDateString(
                    "pt-BR"
                  )}
                </td>
                <td style={{backgroundColor:(atendimento.concluido)?"#22CC66":""}}>{atendimento.concluido ? "concluido" : "pendente"}</td>
                <td>
                  <div class="dropdown" >
                    <Button><span><FaBars/>Opções</span></Button>
                    <div class="dropdown-content tabeladadosdropdown">
                      <p onClick={() => {navigate("/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO + atendimento.id +"/Detalhes");}}><FaRegListAlt/> Detalhes</p>
                          
                      {(!atendimento?.concluido)?(
                        <>
                          <p onClick={() => {navigate("/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO + atendimento.id + "/"+URL_BASE_EXAMEGERAL);}}><FaUserMd/> Exame Geral</p>
                          <p onClick={() => {navigate("/"+URL_BASE_PACIENTE+atendimento.pacienteid+"/"+URL_BASE_ATENDIMENTO + atendimento.id + "/"+URL_BASE_EXAMECOVID);}}><FaBiohazard/> Exame Covid</p>
                          <p onClick={()=>handleFinalizar(atendimento.pacienteid, atendimento.id)}><FaClipboardCheck/> Finalizar</p>
                        </>):<></>}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default AtendimentoPage;
