const apiPatch='http://localhost:3001'
export const getData=(path)=>{
return fetch(apiPatch+path).then(response=>response.json());
}