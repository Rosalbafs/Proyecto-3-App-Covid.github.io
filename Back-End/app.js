//Importar librerias
const getDataCovid = require("./getData");
const funs = require("./functions");
const cors = require('cors');
const express = require('express');
const app = express();

const port = 3030;
app.use(cors());

//Definir consulta "express"
app.get('/covid/result', async function (req, res) {
    try {
      const { country } = req.query;
      const { initDate } = req.query;
      const { endDate } = req.query;
      const dConfirmed = await getDataCovid(country, "confirmed");
      const dDeaths = await getDataCovid(country, "deaths");
      const dRecovery = await getDataCovid(country, "recovered");
      const objectTotal = funs.filterbyTotal(dConfirmed, dDeaths, dRecovery, initDate, endDate);
      res.send(objectTotal)
    } catch (error) {
      res.status = 500
      res.send({
        message: 'No se pueden obtener Datos sin los parametros de "status" y "country"'
      })
      console.error(error)
    }
  });

  app.get('/covid/history', async function (req, res) {
    try {
      const { country } = req.query;
      const { status } = req.query;
      const { initDate } = req.query;
      const { endDate } = req.query;
      const data = await getDataCovid(country, status);
      const transformData = funs.transformData(data, initDate, endDate);
      res.send(transformData)
    } catch (error) {
      res.status = 500
      res.send({
        message: 'No se pueden obtener Datos sin los parametros de "status" y "country"'
      })
      console.error(error)
    }
  });

  app.listen(port, function () {
    console.log(`Server corriendo en el puerto: ${port}`)
  });
