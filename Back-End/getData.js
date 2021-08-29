// importar librerias
const axios = require('axios');

//Crear Funcion
const getDataCovid = async function (country, status) {
    return axios({
      method: 'GET',
      url: `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${status}`
    }).then(function (response) {
        return response.data
    })
  }

//Exportar funcion
module.exports = getDataCovid;