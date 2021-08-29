   function doCharts() {

    /*
    Realizado por:
    Stephanie Cortes
    Hector Javier
    Mayra Elizabeth
    Jorge Lizarraga
    */

    let fechaStart = document.getElementById('fechaInicio').value;
    let fechaEnd = document.getElementById('fechaFin').value;
    let country = document.getElementById('pais').value;
    let tContagiados=null;
    let tRecuperados= null;
    let tMuertos= null

    let key_confirmados = [];
    let value_confirmados=[];

    let key_muertos = [];
    let value_muertos=[];

    let key_recuperados = [];
    let value_recuperados=[];
    
    
    let url = 'http://localhost:3030/covid/result?country=' + country + '&initDate=' +fechaStart+ '&endDate=' +fechaEnd
            fetch(url)
                .then(promiseFetch => promiseFetch.json())
                .then(content_hist => { 
                    tContagiados= content_hist['confirmed'];
                    tMuertos= content_hist['deaths'];

                    tRecuperados= content_hist['recovery'];
                    
                    console.log(content_hist);
                    cargarDatos();
                });


    let url1 = 'http://localhost:3030/covid/history?country=' + country + '&status=confirmed&initDate=' +fechaStart+ '&endDate=' +fechaEnd
            fetch(url1)
                    .then(promiseFetch => promiseFetch.json())
                    .then(content_hist => { 
                        key_confirmados = Object.keys(content_hist);
                        value_confirmados = Object.values(content_hist);
                        console.log(content_hist);
                        cargarDatos();
                    });    

     let url2 = 'http://localhost:3030/covid/history?country=' + country + '&status=deaths&initDate=' +fechaStart+ '&endDate=' +fechaEnd
             fetch(url2)
                       .then(promiseFetch => promiseFetch.json())
                        .then(content_hist => { 
                                key_muertos = Object.keys(content_hist);
                                value_muertos = Object.values(content_hist);
                                console.log(content_hist);
                                cargarDatos();
                       });                   
     let url3 = 'http://localhost:3030/covid/history?country=' + country + '&status=recovered&initDate=' +fechaStart+ '&endDate=' +fechaEnd
            fetch(url3)
                    .then(promiseFetch => promiseFetch.json())
                    .then(content_hist => { 
                        key_recuperados = Object.keys(content_hist);
                        value_recuperados = Object.values(content_hist);
                        console.log(content_hist);
                        cargarDatos();
                    });    
    


        
    
    function cargarDatos(){
    
        const acu = document.getElementById('acumulado').getContext('2d');
        const distCasos = document.getElementById('distCasos').getContext('2d');
        const distMuertes = document.getElementById('distMuertes').getContext('2d');
        const recu = document.getElementById('recuperados').getContext('2d');
        
            const acumulado = new Chart(acu, {
                type: 'bar',
                data: {
                    labels: ['Contagiados', 'Recuperados', 'Muertos'],
                    datasets: [{
                        label: 'No.Personas',
                        data: [tContagiados, tRecuperados, tMuertos],
                        backgroundColor: [ 
                            'rgba(52, 99, 247, 1)',
                            'rgba(52, 247, 96, 1)',
                            'rgba(247, 52, 52, 1)'
                        ],
                        borderColor: [ 
                            'rgba(52, 99, 247, 1)',
                            'rgba(52, 247, 96, 1)',
                            'rgba(247, 52, 52, 1)'
                            
                        ],
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Acumulado Infecciones Covid-19',
                        fontSize:25,
                    },
                    legend: {
                        position: 'top',
                        align: 'end',
                    }
        
                
                }
            });
        

            
            const distribucion = new Chart(distCasos, {
                type: 'line',
                data: {
                    labels: key_confirmados,
                    datasets: [{
                        label: 'No.Personas',
                        data: value_confirmados,
                        fill: false,
                        backgroundColor: ['rgba(52, 99, 247, 1)'],
                        borderColor: ['rgba(52, 99, 247, 1)'],
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Distribucion Casos Covid-19',
                        fontSize:25,
                    },
                    legend: {
                        position: 'top',
                        align: 'end',
                    }
        
                
                }
            });
        
            const muertes = new Chart(distMuertes, {
                type: 'line',
                data: {
                    labels: key_muertos,
                    datasets: [{
                        label: 'No.Personas',
                        data: value_muertos,
                        fill: false,
                        backgroundColor: ['rgba(217, 60, 35, 1)'],
                        borderColor: ['rgba(217, 60, 35, 1)'],
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Muertes por Covid-19',
                        fontSize:25,
                    },
                    legend: {
                        position: 'top',
                        align: 'end',
                    }
        
                
                }
            }); 
        
            const recus = new Chart(recuperados, {
                type: 'line',
                data: {
                    labels: key_recuperados,
                    datasets: [{
                        label: 'No.Personas',
                        data: value_recuperados,
                        fill: false,
                        backgroundColor: ['rgba(0, 210, 50, 1)'],
                        borderColor: ['rgba(0, 210, 50, 1)'],
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Recuperados de Covid-19',
                        fontSize:25,
                    },
                    legend: {
                        position: 'top',
                        align: 'end',
                    }
        
                
                }
            })
                    
    
    }
    
    
    }; 