import React from 'react';
import ReactDOM from 'react-dom/client';
//import 'node_modules/bootstrap/dist/css/boostrap.css';
//import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider,Routes } from 'react-router-dom';


//PAGES
import AtendimentoPage from './componentes/AtendimentoPage';
import ExameCovidPage from './componentes/ExamecovidPage/ExameCovidPage';
import PacientePage from './componentes/PacientePage';

const router=createBrowserRouter([
  {
  element: <App/>,
  children:[
    {
      path:"/",
      element:<PacientePage/>
    },
    {
      path:"/Paciente",
      element:<PacientePage/>
    },
    {
      path:"/Paciente/Atendimento",
      element:<AtendimentoPage/>
    },
   {
    path:"/Paciente/Atendimento/Examecovid",
    element:<ExameCovidPage/>
   }

  ]

}])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
