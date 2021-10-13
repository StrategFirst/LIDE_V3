import axios from "../configs/axios-config";

function get() {
  return axios.get('/user');
}

function getUserProjects() {
  return axios.get("/user/projects");
}

function createUser(username) {
  console.log("username dans les routes fronts create user : " + username);
  const request = new XMLHttpRequest();
  //request.open("POST", "https://lide.leria-etud.univ-angers.fr:10000/user");
  request.open("POST", "localhost:10000/api/v1/user");
  request.setRequestHeader("username", username);
  return request.send();
  
}

export default {
  get,
  getUserProjects,
  createUser,
};
