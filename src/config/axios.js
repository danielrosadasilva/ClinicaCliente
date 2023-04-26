import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7102/api/",
});

const api=axios.create({
  baseURL: "https://localhost:7102/api/",
})

export async function requestGetAsAsync(sourceurl){
  return await api.get(sourceurl);
}

export function requestGet(sourceurl){
  return api.get(sourceurl);
}

export async function requestPostAsAsync(sourceurl, data){
  return await api.post(sourceurl,data, {headers: {"Content-Type":"application/json"}});
}

export function requestPost(sourceurl, data){
  return api.post(sourceurl,data, {headers: {"Content-Type":"application/json"}});
}

export const URL_BASE_PACIENTE="Paciente/";
export const URL_BASE_ATENDIMENTO="Atendimento/";
export const URL_BASE_EXAMEGERAL="Examegeral/";
export const URL_BASE_EXAMECOVID="Examecovid/";

