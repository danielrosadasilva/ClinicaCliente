import { convertCpfFormattedStringToNumber } from "../utils";
import { requestGetAsAsync, URL_BASE_PACIENTE, URL_BASE_ATENDIMENTO, URL_BASE_EXAMEGERAL, requestPostAsAsync, requestPost} from "../config/axios";


export function findAll(){
    return requestGetAsAsync(URL_BASE_PACIENTE);
}

export function findByPacienteId(pacienteid){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid);
}

export function findByPacienteCpf(pacientecpf){
    return requestGetAsAsync(URL_BASE_PACIENTE+"cpf="+pacientecpf);
}

export function findAtendimentosByPacienteId(pacienteid){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO);
}

export function findAtendimentoByPacienteIdAndAtendimentoId(pacienteid, atendimentoid){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimentoid);
}

export function findExamegeralPacienteIdAndAtendimentoId(pacienteid, atendimentoid){
    return requestGetAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO+atendimentoid+"/"+URL_BASE_EXAMEGERAL);
}
export function findExamegeralById(examegeralid){
  return requestGetAsAsync(URL_BASE_EXAMEGERAL+examegeralid)
}



export function findAtendimentos(){
    return requestGetAsAsync(URL_BASE_ATENDIMENTO);
}

export function findExamesgeral(){
    return requestGetAsAsync(URL_BASE_EXAMEGERAL);
}




export function newPaciente(paciente){
    return requestPost(URL_BASE_PACIENTE,paciente);
}


export function newAtendimentoByPaciente(pacienteid){
    return requestPostAsAsync(URL_BASE_PACIENTE+pacienteid+"/"+URL_BASE_ATENDIMENTO,{pacienteid});
}

export function cadastrarAtendimentoPorPaciente(pacienteid){
  newAtendimentoByPaciente(pacienteid)
  .then((response)=>{
    return response.data; 
  })
  .catch((err)=>{
    return false;
  })
}




export function cadastrarPaciente(paciente){
      newPaciente(
        paciente
      )
      .then((response) => {
        if (response.data && response.status !== 400) {
            return response.data;
        } else {
            return false
        }
      })
      .catch((err) => {
        return false;
      });
}




export function buscarPacientes(){
    findAll()
    .then((response)=>{
      return response.data;
    })
    .catch(err=>{
    })

    //
    
  

    //

  }

export function buscarPacientePorCpf(cpfpesquisa){
    const cpfnumerico = convertCpfFormattedStringToNumber(cpfpesquisa);
    findByPacienteCpf(cpfnumerico)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
    });
  }

  