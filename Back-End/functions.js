// Genera un objecto con los totales por status
const filterbyTotal = (objC, objD, objR, init, end) => {
    const { dates: datesC } = objC.All;
    const { dates: datesD } = objD.All;
    const { dates: datesR } = objR.All;
    const containerTotal = {};

    containerTotal["confirmed"] = datesC[end] - datesC[init];
    containerTotal["deaths"] = datesD[end] - datesD[init];
    if (datesR[init] !== 0 && datesR[end] !== 0) {
        containerTotal["recovery"] = datesR[end] - datesR[init];
    } else {
        containerTotal["recovery"] = 0;
    }
    return containerTotal;
};

//Definir funcion para fechas
const databydates = (data, init, end) => {
    const { dates } = data.All;
    const dataFiltered = {};
    for (const date in dates) {
        if (date >= init && date <= end) {
        dataFiltered[date] = dates[date];
        }
    }
    return dataFiltered
};

//Orderna el objeto recibido por key
const sortObjectByDates = (obj) => Object.keys(obj).sort().reduce((r, key) => (r[key] = obj[key], r), {});

//Filtra por fechas, ordena y quita el acumulado del objeto recibido
const transformData = (data, init, end) => {
    const dataFiltered = databydates(data, init, end);
    Object.keys(dataFiltered).map((key, index, element) => dataFiltered[key] -= dataFiltered[element[index+1]]);
    Object.keys(dataFiltered).forEach(key => {if (dataFiltered[key] < 0) {dataFiltered[key] = 0}})
    delete dataFiltered[init];
    return sortObjectByDates(dataFiltered);
};


exports.filterbyTotal = filterbyTotal;
exports.transformData = transformData;
