import axios from "../configs/axios-config";

function get() {
  return axios.get('/user');
}

async function getUserProjects() {
  //return axios.get("/user/projects");
  return await fetch('http://localhost:10000/api/v1/user/projects',{
		method:'GET',
		headers: {'Content-Type': 'application/json'}
  });
}

async function createUser(username) {
  console.log("username dans les routes fronts create user : " + username);
  //const request = new XMLHttpRequest();
  //request.open("POST", "https://lide.leria-etud.univ-angers.fr:10000/user");
  //request.open("POST", "localhost:10000/user");
  //request.setRequestHeader("username", username);
  //return request.send();

  //return axios.get('/user');

  return await fetch('http://localhost:10000/api/v1/user',{
		method:'POST',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username
    })
  });
  
}

export default {
  get,
  getUserProjects,
  createUser
};
