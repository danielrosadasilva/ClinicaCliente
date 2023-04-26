import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import axios, {
  URL_BASE_ATENDIMENTO,
  URL_BASE_EXAMECOVID,
  URL_BASE_EXAMEGERAL,
  URL_BASE_PACIENTE,
} from "../../config/axios";
import {
  classificarFrequenciaCardiaca,
  classificarFrequenciaRespiratoria,
  classificarPressaoSistolica,
  classificarTemperaturaCelsius,
} from "../../utils";

const AtendimentoDetailsPage = () => {
  const { atendimentoid } = useParams();
  const [atendimento, setAtendimento] = useState();
  const [paciente, setPaciente] = useState();
  const [examegeral, setExamegeral] = useState();
  const [examecovid, setExamecovid] = useState();
  const [resultado, setResultado]=useState("");

  useEffect(() => {
    axios
      .get(URL_BASE_ATENDIMENTO + atendimentoid)
      .then((response) => {
        setAtendimento(response.data[0]);
        axios
        .get(URL_BASE_PACIENTE + response.data[0].pacienteid)
        .then((responsepaciente) => {
          setPaciente(responsepaciente.data[0]);
          axios
          .get(
            URL_BASE_PACIENTE +
              responsepaciente.data[0].id +
              "/" +
              URL_BASE_ATENDIMENTO +
              atendimentoid +
              "/" +
              URL_BASE_EXAMEGERAL
          )
          .then((responseexamegeral) => {
            setExamegeral(responseexamegeral.data[0]);
          })
          .catch(() => {});

          axios
          .get(
            URL_BASE_PACIENTE +
              responsepaciente.data[0].id +
              "/" +
              URL_BASE_ATENDIMENTO +
              atendimentoid +
              "/" +
              URL_BASE_EXAMECOVID
          )
          .then((responseexamecovid) => {
            setExamecovid(responseexamecovid.data[0]);
            
          })
          .catch(() => {});

        })
        .catch(() => {});
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, []);


  useEffect(()=>{
    setResultado(gerarResultado());
  },[examecovid, gerarResultado]);

  function gerarResultado(){
    let countpositivos=0;
    let countnegativos=0;
    if(examecovid){
      (examecovid.febre)?countpositivos++:countnegativos--;
      (examecovid.narizentupido)?countpositivos++:countnegativos--;
      (examecovid.tosse)?countpositivos++:countnegativos--;
      (examecovid.doresnocorpo)?countpositivos++:countnegativos--;
      (examecovid.dordegarganta)?countpositivos++:countnegativos--;
      (examecovid.faltadepaladar)?countpositivos++:countnegativos--;
      (examecovid.dificuldadedelocomocao)?countpositivos++:countnegativos--;
      (examecovid.coriza)?countpositivos++:countnegativos--;
      (examecovid.cansaco)?countpositivos++:countnegativos--;
      (examecovid.dordecabeca)?countpositivos++:countnegativos--;
      (examecovid.malestargeral)?countpositivos++:countnegativos--;
      (examecovid.dificuldadederespirar)?countpositivos++:countnegativos--;
      (examecovid.faltadeolfato)?countpositivos++:countnegativos--;
      (examecovid.diarreia)?countpositivos++:countnegativos--;
      let percentual=(countpositivos/(countpositivos+countnegativos)*100);
      if (percentual < 40) {
        return "Insuficiente";
    } else if (percentual < 60) {
        return "Potencialmente Infectado";
    } else {
        return "Possivelmente Infectado";
    }

    }
    return ""
  }


  const generatePDF = () => {
    const element = document.querySelector("#relatorioatendimento");
    const opt = {
      margin: 2,
      filename: "relatorioExames.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="container">
      <div id="relatorioatendimento">
        <Table className="container">
          <thead>
            <tr>
              <th colSpan={2}>Atendimento de Paciente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Código: {atendimento?.id || ""}</td>
              <td>
                Data do atendimento:{" "}
                {new Date(atendimento?.datahoraatendimento).toLocaleDateString(
                  "pt-BR"
                ) || ""}
              </td>
            </tr>
            <tr>
              <td>Paciente: {paciente?.nome || ""}</td>
              <td>
                Data de Nascimento:{" "}
                {new Date(paciente?.datanascimento).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          </tbody>
        </Table>

        <div id="atendimentodetailtable">
          {/*Pressão*/}
          <h3 className="text-center">Exame Geral</h3>
          <br />
          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={3}>
                  Pressão
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={3}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Nomenclatura</th>
                <th className="tbcabecalho">Sistólica</th>
                <th className="tbcabecalho">Diastólica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hipotenso</td>
                <td>Abaixo de 90</td>
                <td>Abaixo de 60</td>
              </tr>
              <tr>
                <td>Normotenso</td>
                <td>90-130</td>
                <td>60-85</td>
              </tr>
              <tr>
                <td>Normotenso Limítrofe</td>
                <td>130-139</td>
                <td>85-89</td>
              </tr>
              <tr>
                <td>Hipertenso Leve</td>
                <td>140-159</td>
                <td>90-99</td>
              </tr>
              <tr>
                <td>Hipertenso Moderado</td>
                <td>160-179</td>
                <td>100-109</td>
              </tr>
              <tr>
                <td>Hipertenso Grave</td>
                <td>Acima de 180</td>
                <td>Acima de 110</td>
              </tr>
            </tbody>
          </Table>

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={3}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {classificarPressaoSistolica(examegeral?.pressaosistolica) ||
                    ""}
                </td>
                <td>{examegeral?.pressaosistolica || ""}</td>
                <td>{examegeral?.pressaodiastolica || ""}</td>
              </tr>
            </tbody>
          </Table>

          <br />
          <br />

          {/*Pulsação*/}

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Pulsação
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Valor</th>
                <th>Nomenclatura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abaixo de 60 bpm</td>
                <td>Bradicárdico</td>
              </tr>
              <tr>
                <td>60-100 bpm</td>
                <td>Normocárdico</td>
              </tr>
              <tr>
                <td>Acima de 100bpm</td>
                <td>Taquicárdico</td>
              </tr>
            </tbody>
          </Table>
          <div className="text-center">
            <p>
              Adultos: 60 - 100 bpm; Crianças: 80 - 130bpm; Lactentes: 120 - 160
              bpm
            </p>
          </div>

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{examegeral?.pulsacao || ""}</td>
                <td>
                  {classificarFrequenciaCardiaca(examegeral?.pulsacao, paciente?.datanascimento) || ""}
                </td>
              </tr>
            </tbody>
          </Table>

          <br />
          <br />

          {/*Respiração*/}

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Respiração
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Valor</th>
                <th className="tbcabecalho">Nomenclatura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abaixo de 14 irpm</td>
                <td>Bradipnéico</td>
              </tr>
              <tr>
                <td>14-20 irpm</td>
                <td>Eupnéico</td>
              </tr>
              <tr>
                <td>Acima de 20 irpm</td>
                <td>Taquipnéico</td>
              </tr>
            </tbody>
          </Table>

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{examegeral?.respiracao || ""}</td>
                <td>
                  {classificarFrequenciaRespiratoria(examegeral?.respiracao) ||
                    ""}
                </td>
              </tr>
            </tbody>
          </Table>

          <br />
          <br />
          {/*Temperatura*/}

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Temperatura
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Valores de Referência
                </th>
              </tr>
              <tr>
                <th className="tbcabecalho">Valor</th>
                <th className="tbcabecalho">Nomenclatura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Abaixo de 35°C</td>
                <td>Hipotermia</td>
              </tr>
              <tr>
                <td>35°C-37,2C</td>
                <td>Normotermia ou afebril</td>
              </tr>
              <tr>
                <td>37,2-37,7C</td>
                <td>Estado febril/subfebril ou febrícula</td>
              </tr>
              <tr>
                <td>37,7°C-38,9C</td>
                <td>Febre</td>
              </tr>
              <tr>
                <td>38,9C-40°C</td>
                <td>Pirexia</td>
              </tr>
              <tr>
                <td>Acima de 40°C</td>
                <td>Hiperpirexia</td>
              </tr>
            </tbody>
          </Table>

          <Table className="container">
            <thead>
              <tr>
                <th className="tbcabecalho" colSpan={2}>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{examegeral?.temperatura || ""}</td>
                <td>
                  {classificarTemperaturaCelsius(examegeral?.temperatura) || ""}
                </td>
              </tr>
            </tbody>
          </Table>
          <h3 className="text-center">Exame Covid</h3>
          <br/>
          <br/>
          <Table className="container">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Status</th>
                <th>Descrição</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Febre</td>
                <td>
                  {(examecovid?.febre)?"Sim":"Não"}
                </td>
                <td>Coriza</td>
                <td>
                  {(examecovid?.coriza)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Nariz entupido</td>
                <td>
                  {(examecovid?.narizentupido)?"Sim":"Não"}
                </td>
                <td>Cansaço</td>
                <td>
                  {(examecovid?.cansaco)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Tosse</td>
                <td>
                  {(examecovid?.tosse)?"Sim":"Não"}
                </td>
                <td>Dor de Cabeça</td>
                <td>
                  {(examecovid?.dordecabeca)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Dores no Corpo</td>
                <td>
                  {(examecovid?.doresnocorpo)?"Sim":"Não"}
                </td>
                <td>Mal Estar Geral</td>
                <td>
                  {(examecovid?.malestargeral)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Dor de Garganta</td>
                <td>
                  {(examecovid?.dordegarganta)?"Sim":"Não"}
                </td>
                <td>Dificuldade de Respirar</td>
                <td>
                  {(examecovid?.dificuldadederespirar)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Falta de Paladar</td>
                <td>
                  {(examecovid?.faltadepaladar)?"Sim":"Não"}
                </td>
                <td>Falta de Olfato</td>
                <td>
                  {(examecovid?.faltadeolfato)?"Sim":"Não"}
                </td>
              </tr>
              <tr>
                <td>Dificuldade de Locomoção</td>
                <td>
                  {(examecovid?.dificuldadedelocomocao)?"Sim":"Não"}
                </td>
                <td>Diarreia</td>
                <td>
                  {(examecovid?.diarreia)?"Sim":"Não"}
                </td>
              </tr>
              
            </tbody>
          </Table>
          <Table className="container">
            
          <thead>
            <tr>
              <th>Resultado</th>
              <th>{resultado}</th>
            </tr>
          </thead>
          </Table>
        </div>




        
      </div>
      {
        <div style={{ alignItems: "center" }}>
          <Button onClick={generatePDF}>Dowload Exame PDF</Button>
        </div>
      }
    </div>
  );
};

export default AtendimentoDetailsPage;
