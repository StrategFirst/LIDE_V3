import axios from "../configs/axios-config";

// (Tanguy (API fetch)) Stop la compilation
async function killExecution() {
    return await fetch('http://localhost:10000/api/v1/killexec',{
		method:'POST',
		headers: {'Content-Type': 'application/json'}
    });
    //return axios.post(`/killexec`);
}

export default {
    killExecution,
};
