import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import PacientePage from './componentes/PacientePage';
import Atendimentopage from './componentes/AtendimentoPage';
import Navbar from './componentes/Navbar/NavBar';
import ExamesCovidPage from './componentes/ExameCovidPage';
import AtendimentoPage from './componentes/AtendimentoPage';
import FormExameCovid from './componentes/FormExameCovid';
import FormAtendimento from './componentes/FormAtendimento';
import FormPaciente from './componentes/FormPaciente';
import AtendimentoDetailsPage from './componentes/AtendimentoDetailsPage';
import ExameGeralPage from './componentes/ExameGeralPage';
import FormExameGeral from './componentes/FormExameGeral';
import RelatorioPage from './componentes/RelatorioPage';



function App() {

  return (
    <Router >
    <Navbar/>
    <Routes>
      
      <Route exact path="/" element={<PacientePage/>}/>
      
      <Route path="/Paciente" element={<PacientePage/>} />
      <Route path="/Paciente/Novo" element={<FormPaciente/>}/>
      <Route path="/Paciente/:pacienteid" element={<FormPaciente/>}/>
      <Route path="/Paciente/:pacienteid/Atendimento" element={<Atendimentopage/>} />
      <Route path="/Paciente/Atendimento/Examecovid" />
      <Route path="/Paciente/:pacienteid/Atendimento/:atendimentoid/Detalhes" element={<AtendimentoDetailsPage/>}/>
      <Route path='/Paciente/:pacienteid/Atendimento/:atendimentoid/ExameGeral' element={<ExameGeralPage/>}/>
      <Route path='/Paciente/:pacienteid/Atendimento/:atendimentoid/ExameGeral/:examegeralid' element={<FormExameGeral/>}/>
      <Route path='/Paciente/:pacienteid/Atendimento/:atendimentoid/ExameCovid' element={<ExamesCovidPage/>}/>
      <Route path='/Paciente/:pacienteid/Atendimento/:atendimentoid/ExameCovid/:examecovidid' element={<FormExameCovid/>}/>
      <Route path='/Atendimento' element={<AtendimentoPage/>}/>
      <Route path='/Atendimento/Novo' element={<FormAtendimento/>}/>
      <Route path='/Atendimento/:atendimentoid/Detalhes' element={<AtendimentoDetailsPage/>}/>
      <Route path="/Relatorio" element={<RelatorioPage/>}/>
      <Route path="*" element={<h2>Não Encontrado</h2>}/>
      
    </Routes>
  </Router>
  )

}

export default App;