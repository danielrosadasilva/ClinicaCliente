import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";
import Table from "react-bootstrap/Table";

const ExameGeralPage = () => {
  const navigate = useNavigate();
  const { pacienteid, atendimentoid, examegeralid } = useParams();
  const [examesgeral, setExamesgeral] = useState([]);
  const [febre, setFebre] = useState(false);

  // /Paciente/{pacienteid}/Atendimento/{atendimentoid}/Examegeral

  useEffect(() => {
    axios
      .get(
        "/Paciente/" +
          pacienteid +
          "/Atendimento/" +
          atendimentoid +
          "/Examegeral"
      )
      .then((response) => {
        if (response?.data[0]) {
          if (response?.data[0]?.concluido) {
            setExamesgeral(response.data);
          } else {
            navigate(
              "/Paciente/" +
                pacienteid +
                "/Atendimento/" +
                atendimentoid +
                "/Examegeral/" +
                response.data[0].id
            );
          }
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <h1 className="title">Exame Geral </h1>
      <Table striped bordered hover>
        <thead></thead>

        <tbody>
          <tr>
            <th className="tbcabecalho">ID</th>
            <th className="tbcabecalho">Pressão Sistolica</th>
            <th className="tbcabecalho">Pressão Diastólica</th>
            <th className="tbcabecalho">Pulsação</th>
            <th className="tbcabecalho">Respiração</th>
            <th className="tbcabecalho">Temperatura</th>
            <th className="tbcabecalho">Concluido</th>
          </tr>
          {examesgeral ? (
            examesgeral.map((examegeral) => (
              <tr>
                <td>{examegeral?.id||""}</td>
                <td>{examegeral?.pressaosistolica ||""}</td>
                <td>{examegeral?.pressaodiastolica||""}</td>
                <td>{examegeral?.pulsacao||""}</td>
                <td>{examegeral?.respiracao||""}</td>
                <td>{examegeral?.temperatura||""}</td>
                <td>{examegeral.concluido ? "Sim" : "Não"}</td>
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

export default ExameGeralPage;
