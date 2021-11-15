import axios from "../configs/axios-config";

// Exporte ses fichiers
async function exporter() {
  return await fetch(`http://localhost:10000/api/v1/export`,{
		method:'GET',
		headers: {'Content-Type': 'application/json'}
  });
    /*return axios({
      url: '/export',
      method: 'GET',
      responseType: 'blob',
    });*/
  }

  export default {
    exporter,
};
