import axios from "../configs/axios-config";

// (Tanguy (API fetch)) Stop la compilation
async function killExecution() {
  const data = {
    username: localStorage.username,
  };
    return await fetch('http://localhost:10000/api/v1/killexec/',{
		method:'POST',
		headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    });
    //return axios.post(`/killexec`);
}

export default {
    killExecution,
};
