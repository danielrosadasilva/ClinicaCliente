import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";
import Table from "react-bootstrap/Table";

const ExamesCovidPage = () => {
  const navigate = useNavigate();
  const { pacienteid, atendimentoid } = useParams();
  const [examescovid, setExamescovid] = useState([]);


  // /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examecovid

  useEffect(() => {
    axios
      .get(
        "/Paciente/" +
          pacienteid +
          "/Atendimento/" +
          atendimentoid +
          "/Examecovid"
      )
      .then((response) => {
        if (response?.data[0]) {
          if (response?.data[0]?.concluido) {
            setExamescovid(response.data);
          } else {
            navigate(
              "/Paciente/" +
                pacienteid +
                "/Atendimento/" +
                atendimentoid +
                "/Examecovid/" +
                response.data[0].id
            );
          }
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <h1 className="title">Diagnostico de Covid </h1>
      <Table striped bordered hover>
        <thead></thead>

        <tbody>
          <tr>
            <th className="tbcabecalho">ID</th>
            <th className="tbcabecalho">Febre</th>
            <th className="tbcabecalho">Coriza</th>
            <th className="tbcabecalho">Nariz Entupido</th>
            <th className="tbcabecalho">Cansaço</th>
            <th className="tbcabecalho">Tosse</th>
            <th className="tbcabecalho">Dor de Cabeça</th>
            <th className="tbcabecalho">Dores No Corpo</th>
            <th className="tbcabecalho">Mal Estar geral</th>
            <th className="tbcabecalho">Dor de Garganta</th>
            <th className="tbcabecalho">Dificuldade de Respirar</th>
            <th className="tbcabecalho">Falta de Paladar</th>
            <th className="tbcabecalho">Falta de Olfato</th>
            <th className="tbcabecalho">Dificuldade de Locomoção</th>
            <th className="tbcabecalho">Diarreia</th>
            <th className="tbcabecalho">Concluido</th>
          </tr>
          {examescovid ? (
            examescovid.map((examecovid) => (
              <tr>
                <td>{examecovid.id}</td>
                <td>{examecovid.febre ? "Sim" : "Não"}</td>
                <td>{examecovid.dordecabeca ? "Sim" : "Não"}</td>
                <td>{examecovid.narizentupido ? "Sim" : "Não"}</td>
                <td>{examecovid.cansaco ? "Sim" : "Não"}</td>
                <td>{examecovid.tosse ? "Sim" : "Não"}</td>
                <td>{examecovid.dordecabeca ? "Sim" : "Não"}</td>
                <td>{examecovid.doresnocorpo ? "Sim" : "Não"}</td>
                <td>{examecovid.malestargeral ? "Sim" : "Não"}</td>
                <td>{examecovid.dordegarganta ? "Sim" : "Não"}</td>
                <td>{examecovid.dificuldadederespirar ? "Sim" : "Não"}</td>
                <td>{examecovid.faltadepaladar ? "Sim" : "Não"}</td>
                <td>{examecovid.faltadeolfato ? "Sim" : "Não"}</td>
                <td>{examecovid.dificuldadedelocomocao ? "Sim" : "Não"}</td>
                <td>{examecovid.diarreia ? "Sim" : "Não"}</td>
                <td>{examecovid.concluido ? "Sim" : "Não"}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ExamesCovidPage;
