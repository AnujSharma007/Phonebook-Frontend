import axios from "axios";

const api_endpoint = "http://localhost:5000/phonebook";
const api_headers = {
    "Content-Type":"application/json"
};

export function getPhonebookData(){
    return fetch(api_endpoint).then(resp=>resp.json());
};

export function postPhonebookData(payload){
    return fetch(api_endpoint,{
        method:"POST",
        headers:api_headers,
        body:JSON.stringify(payload)
    }).then(resp=>resp.json());
};

export function putPhonebookData(payload,id){
     const api_path = `${api_endpoint}/${id}`;
     return fetch(api_path,{
         method:"PUT",
         headers:api_headers,
         body:JSON.stringify(payload)
     }).then(resp=>resp.json()) ;
};

export function deletePhonebookData(id){
     const api_path = `${api_endpoint}/${id}`;
     return fetch(api_path,{
            method:"DELETE",
            headers: api_headers
     }).then(resp=>resp.json());
};