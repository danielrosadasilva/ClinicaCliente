import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaPaperPlane, FaUser } from "react-icons/fa";
import logoimg from "../../assets/img/logo.png";
import { URL_BASE_ATENDIMENTO, URL_BASE_PACIENTE } from "../../config/axios";




const Navbar = () => {

 
  const navigate=useNavigate();
 

  return (
    <nav style={{display:"flex", alignItems:"center"}} className="text-center" id="nav" fill variant="tabs" defaultActiveKey="/home">
      <div>
      <img id="logo" src={logoimg} height="50px"/>
      </div>
      <div id="itemsmenunav">
      <Link to="/"><FaHome/> Home</Link>
      <Link to="/Paciente"><FaUser/> Paciente</Link>

      <Link to="/Atendimento"><FaPaperPlane/> Atendimento</Link>

      <Link to="/Relatorio"><FaPaperPlane/> Relatório</Link>
      </div>
                    <div className="dropdown" id="dropmenunav" style={{justifyContent:"right"}}>
                      <Link style={{fontSize:'20px'}}><FaBars/></Link>
                      <div className="dropdown-content">
                        <p onClick={()=>navigate("/")}><FaHome/> Home</p>
                        <p onClick={() =>navigate("/"+URL_BASE_PACIENTE)}><FaUser/> Paciente</p>
                        <p onClick={() =>navigate("/"+URL_BASE_ATENDIMENTO)}><FaPaperPlane/> Atendimentos</p>
                        <p onClick={() =>navigate("/Relatorio")}><FaPaperPlane/> Relatório</p>
                      </div>
                    </div>
     { /*<input type="checkbox" className="toggle" ></input>*/}
    </nav>
  );
};

export default Navbar;