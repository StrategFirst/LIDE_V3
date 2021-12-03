import axios from "../configs/axios-config";

//(Tanguy (API fetch)) Exporte ses fichiers
async function exporter() {
    return await fetch(`http://localhost:10000/api/v1/export//${localStorage.username}`,{
      method:'GET',
      headers: {'Content-Type': 'application/json'}
    });
  }

  export default {
    exporter,
};
