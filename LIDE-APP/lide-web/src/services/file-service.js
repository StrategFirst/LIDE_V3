import axios from "../configs/axios-config";

async function get(fileid) {
  return await fetch(`http://localhost:10000/api/v1/file/${fileid}`,{
		method:'GET',
		headers: {'Content-Type': 'application/json'}
  });
  //return axios.get(`/file/${fileid}`);
}

async function create(projectid, filename, extension) {
  const data = {
    projectid: projectid,
    filename: filename,
    extension: extension,
  };
  return await fetch('http://localhost:10000/api/v1/file',{
		method:'POST',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.post("/file", data);
}

async function remove(fileid) {
  return await fetch(`http://localhost:10000/api/v1/file/${fileid}`,{
		method:'DELETE',
		headers: {'Content-Type': 'application/json'}
  });
  //return axios.delete(`/file/${fileid}`);
}

async function rename(fileid, newfilename) {
  const data = {
    newfilename: newfilename,
  };
    return await fetch(`http://localhost:10000/api/v1/file/${fileid}?rename=true`,{
		method:'PUT',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.put(`/file/${fileid}?rename=true`, data);
}

async function save(fileid, content) {
  const data = {
    content: content,
  };
  return await fetch(`http://localhost:10000/api/v1/file/${fileid}?save=true`,{
		method:'PUT',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  //return axios.put(`/file/${fileid}?save=true`, data);
}

async function execute(fileid) {
  return await fetch(`http://localhost:10000/api/v1/execute/${fileid}`,{
		method:'POST',
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
