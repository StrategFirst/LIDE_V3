import axios from "../configs/axios-config";

//(Tanguy (API fetch)) Retourne un fichier sélectionné
async function get(fileid) {
  return await fetch(`http://localhost:10000/api/v1/file/${fileid}/${localStorage.username}`,{
		method:'GET',
		headers: {'Content-Type': 'application/json'}
  });
  //return axios.get(`/file/${fileid}`);
}

//(Tanguy (API fetch)) Crée un fichier et l'affecte à un projet
async function create(projectid, filename, extension) {
  const data = {
    username: localStorage.username,
    projectid: projectid,
    filename: filename,
    extension: extension,
  };
  return fetch('http://localhost:10000/api/v1/file',{
		method:'POST',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.post("/file", data);
}

//(Tanguy (API fetch)) Supprime un fichier
async function remove(fileid) {
  const data = {
    username: localStorage.username
  };
  return await fetch(`http://localhost:10000/api/v1/file/${fileid}`,{
		method:'DELETE',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.delete(`/file/${fileid}`);
}

//(Tanguy (API fetch)) Renomme un fichier
async function rename(fileid, newfilename, extension) {
  const data = {
    username: localStorage.username,
    newfilename: newfilename,
    extension: extension
  };
    return await fetch(`http://localhost:10000/api/v1/file/${fileid}?rename=true`,{
		method:'PUT',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.put(`/file/${fileid}?rename=true`, data);
}

//(Tanguy (API fetch)) Sauvegarde l'état du fichier dans la base de données
async function save(fileid, content) {
  const data = {
    username: localStorage.username,
    content: content,
  };
  return await fetch(`http://localhost:10000/api/v1/file/${fileid}?save=true`,{
		method:'PUT',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.put(`/file/${fileid}?save=true`, data);
}

//(Tanguy (API fetch)) Exécute un fichier
async function execute(fileid) {
  return await fetch(`http://localhost:10000/api/v1/execute/${fileid}/${localStorage.username}`,{
		method:'GET',
		headers: {'Content-Type': 'application/json'}
  });
  //return axios.post(`/execute/${fileid}`);
}

export default {
  get,
  create,
  remove,
  rename,
  save,
  execute,
};
