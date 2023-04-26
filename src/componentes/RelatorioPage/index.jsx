import React, { useEffect, useState } from "react";
import ReactApexChart from "apexcharts";
import axios, { URL_BASE_ATENDIMENTO } from "../../config/axios";

const RelatorioPage = () => {
  let mesesextenso = {
    1: "Jan",
    2: "Fev",
    3: "Mar",
    4: "Abr",
    5: "Mai",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Set",
    10: "Out",
    11: "Nov",
    12: "Dez",
  };

  const [dadosrelatorio, setDadosrelatorio] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(URL_BASE_ATENDIMENTO + "relatorio");
        let dados = {
          periodos: [],
          totalatendimentos: [],
          totalpossivelmenteinfectados: [],
          totalpotencialmenteinfectados: [],
        };
        data.map((dado) => {
          dados.periodos[dados.periodos.length] =
            dado.ano + "/" + mesesextenso[dado.mes];
          dados.totalatendimentos[dados.totalatendimentos.length] =
            dado.totalatendimentos;
          dados.totalpossivelmenteinfectados[
            dados.totalpossivelmenteinfectados.length
          ] = dado.totalpossivelmenteinfectados;
          dados.totalpotencialmenteinfectados[
            dados.totalpotencialmenteinfectados.length
          ] = dado.totalpotencialmenteinfectados;
        });
        dados.periodos.reverse();
        dados.totalatendimentos.reverse();
        dados.totalpossivelmenteinfectados.reverse();
        dados.totalpotencialmenteinfectados.reverse();

        setDadosrelatorio(dados);
        let myChart = new ReactApexChart(document.querySelector("#grafico"), {
          chart: {
            type: "area",
          },
          series: [
            {
              name: "Total atendimentos",
              data: dados.totalatendimentos,
            },
            {
              name: "Possivelmente Infectados",
              data: dados.totalpossivelmenteinfectados,
            },
            {
              name: "Potencialmente Infectados",
              data: dados.totalpotencialmenteinfectados,
            },
          ],
          yaxis: {
            opposite: false,
          },
          xaxis: {
            name: "Período",
            categories: dados.periodos,
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: '',
            align: 'center'
          }
        });
        myChart.render();
      } catch (exception) {
        console.log(exception);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="container">
      <h1 className="title">Relatório</h1>
      <br/><br/>
      <div id="grafico"></div>
    </main>
  );
};

export default RelatorioPage;
