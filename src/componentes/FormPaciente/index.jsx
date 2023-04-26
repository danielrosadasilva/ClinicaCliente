import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPaste } from "react-icons/fa";
import axios, {
  URL_BASE_PACIENTE,
  requestPostAsAsync,
} from "../../config/axios";
import {
  convertCpfFormattedStringToNumber,
  convertCpfNumberToFormattedString,
  convertTelefoneFormattedStringToNumber,
} from "../../utils";
import { Button, Form } from "react-bootstrap";
import { IMaskInput } from "react-imask";
import { convertNumberToTelefoneFormattedString } from "../../utils";

const FormPaciente = () => {
  const { pacienteid } = useParams();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [datanascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const urlimagem = "/";

  useEffect(() => {
    try {
      if (pacienteid) {
        axios
          .get(URL_BASE_PACIENTE + pacienteid)
          .then((response) => {
            setNome(response.data[0].nome);
            setCpf(convertCpfNumberToFormattedString(response.data[0].cpf));
            let ano = new Date(response.data[0].datanascimento).getFullYear();
            let mes = new Date(response.data[0].datanascimento).getMonth() + 1;
            let dia = new Date(response.data[0].datanascimento).getDay();
            setDataNascimento(
              ano +
                "-" +
                (mes < 10 ? "0" : "") +
                mes +
                "-" +
                (dia < 10 ? "0" : "") +
                dia
            );
            setTelefone(
              convertNumberToTelefoneFormattedString(response.data[0].telefone)
            );
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }
    } catch (e) {}
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !cpf == "" &&
        !nome == "" &&
        !datanascimento == "" &&
        !telefone == ""
      ) {
        const cpfnumerico = convertCpfFormattedStringToNumber(cpf);
        const telefonenumerico =
          convertTelefoneFormattedStringToNumber(telefone);
        const paciente = {
          nome,
          cpf: cpfnumerico,
          telefone: telefonenumerico,
          datanascimento,
          urlimagem,
        };
        if (pacienteid) {
          paciente.id = pacienteid;
        }

        requestPostAsAsync(URL_BASE_PACIENTE, paciente).then((response) => {
          if (response.data) {
            alert(
              "Paciente " +
                (pacienteid ? "atualizado" : "cadastrado") +
                " com sucesso"
            );
          }
        });
      } else {
        alert("Preencha todos os campos");
      }
    } catch (e) {
      alert("Erro ao registrar informações");
    }
  }

  return (
    <section className="container">
      <h1 className="subtitle">Cadastro de Paciente</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicCpf">
          <Form.Label className="subtitle">CPF</Form.Label>
          <Form.Control
            as={IMaskInput}
            mask="000.000.000-00"
            unmask={true}
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}        
          />

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNome">
          <Form.Label className="subtitle">Nome</Form.Label>
          <Form.Control
            type="nome"
            placeholder="Digite o Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDataNacimento">
          <Form.Label className="subtitle">Data de Nacimento</Form.Label>{" "}
          <br></br>
          <Form.Text className="mb-3" id="data">
            <input
              type="date"
              value={datanascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </Form.Text>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTelefone">
          <Form.Label className="subtitle">Telefone</Form.Label>
          <Form.Control
            as={IMaskInput}
            mask="(00)00000-0000"
            type="Telefone"
            placeholder="Digite o Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Form.Group>

        <Button className="formButtom" type="submit">
        <FaPaste/>
          Cadastrar
        </Button>
      </Form>
    </section>
  );
};

export default FormPaciente;
