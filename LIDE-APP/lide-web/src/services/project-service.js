import axios from "../configs/axios-config";

function get(projectid) {
  return axios.get(`/project/${projectid}`);
}

async function create(projectname) {
  const data = {
    projectname: projectname,
  };
  return await fetch('http://localhost:10000/api/v1/project',{
		method:'POST',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  /*return axios.post("/project", data);*/
}

async function remove(projectid) {
  return await fetch(`http://localhost:10000/api/v1/project/${projectid}`,{
		method:'DELETE',
		headers: {'Content-Type': 'application/json'}
  });
  //axios.delete(`/project/${projectid}`);
}

async function rename(projectid, newprojectname) {
  const data = {
    newprojectname: newprojectname,
  };
  return await fetch(`http://localhost:10000/api/v1/project/${projectid}?rename=true`,{
		method:'PUT',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  //return axios.put(`/project/${projectid}?rename=true`, data);
}

export default {
  get,
  create,
  remove,
  rename,
};
