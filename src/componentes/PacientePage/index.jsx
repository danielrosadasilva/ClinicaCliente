import React, { useEffect, useState } from "react";
import { FaBars, FaEye, FaPen, FaPlusCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { IMaskInput } from "react-imask";
//import axios, { requestPostAsAsync } from "../../config/axios";
import { useNavigate } from "react-router-dom";
import {
  convertCpfFormattedStringToNumber,
  convertCpfNumberToFormattedString,
 // convertTelefoneFormattedStringToNumber,
} from "../../utils";
import {
  buscarPacientePorCpf,
 // buscarPacientes,
 // cadastrarPaciente,
  findAll,
  findByPacienteCpf,
//  newPaciente,
} from "../../services/PacienteServices";
import { clamp } from "date-fns";

//import FormPaciente from "../FormPaciente";

const URL_BASE_PACIENTE = "Paciente/";

const PacientePage = () => {
  
  const [cpfpacientepesquisa, setCpfpacientepesquisa] = useState("");
  const navigate = useNavigate();
  const [pacientes,setPacientes]=useState();
  const [atualizacao, setAtualizacao] = useState(false);

  useEffect(() => {
    
    
    findAll().then((response) => {
      if (response.status !== 400 && response.status !== 404) {
        setPacientes(response.data || []);
        
      
    }});
    
  }, [atualizacao]);

  useEffect(() => {
    if (cpfpacientepesquisa.length > 11) {
      buscarPacientePorCpf(cpfpacientepesquisa)
      
      const cpfnumerico =
        convertCpfFormattedStringToNumber(cpfpacientepesquisa);
      findByPacienteCpf(cpfnumerico)
        .then((response) => {
          setPacientes(response.data);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
    
    
  }, [cpfpacientepesquisa]);



  return (
    <section className="container" >
      <section >
        <h1 className="title">Pacientes Cadastrados</h1>
        <Form.Group className="mb-3" controlId="formBasicCpfpesquisa">
          <article className="pesquisa">
          <Form.Label>Pesquisar Paciente</Form.Label>
          

          <Form.Control
            as={IMaskInput}
            mask="000.000.000-00"
            unmask={true}
            placeholder="Digite o CPF"
            value={cpfpacientepesquisa}
            onChange={(e) => setCpfpacientepesquisa(e.target.value)}
          />
          <Button className="btsubmit" onClick={()=>navigate("/Paciente/Novo")}><FaPen/> Cadastrar Paciente</Button>
        </article>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <div className="table-responsive">
        <Table striped bordered hover  /*maxWidth:"100%", maxHeight:"100%",overflowX:"scroll"}*/>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Data Nascimento</th>
              <th>Telefone</th>
              <th></th>
            </tr>
          </thead>

          {pacientes ? (
            pacientes.map((paciente, index) => (
              <tbody>
                <tr>
                  <td >{convertCpfNumberToFormattedString(paciente.cpf)}</td>
                  <td>{paciente.nome}</td>
                  <td>
                    {("0" + new Date(paciente.datanascimento).getDate()).substr(
                      -2
                    ) +
                      "/" +
                      (
                        "0" +
                        (new Date(paciente.datanascimento).getMonth() + 1)
                      ).substr(-2) +
                      "/" +
                      new Date(paciente.datanascimento).getFullYear()}
                  </td>
                  <td>{paciente.telefone}</td>
                  <td>
                    <article className="bttabela">
                    <div class="dropdown">
                      <Button><span><FaBars/>Opções</span></Button>
                      <div class="dropdown-content">
                        <p onClick={()=>navigate("/Paciente/"+paciente.id)}><FaPen/> Editar</p>
                        <p onClick={() => {navigate("/Paciente/" + paciente.id + "/Atendimento");}}><FaEye/> Atendimentos</p>
                      </div>
                    </div>
                    </article>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <></>
          )}
        </Table>
        </div>
      </section>
    </section>
  );
};

export default PacientePage;
