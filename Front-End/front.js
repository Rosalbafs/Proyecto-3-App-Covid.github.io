limiteFecha();
llenarPais();
fechaFin.addEventListener ('change', validaFechaInicio);
function limiteFecha () {
  let today = new Date ();
  let dd = today.getDate () - 1; //restamos un día 
  let mm = today.getMonth () + 1; //Enero=0
  let yyyy = today.getFullYear ();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById ('fechaFin').setAttribute ('max', today);
  document.getElementById ('fechaInicio').setAttribute ('max', today);
}

function validaFechaInicio() {
  fechaInicio = document.getElementById('fechaInicio').value;
  fechaFin = document.getElementById('fechaFin').value;
  if (fechaInicio > fechaFin) {
    alert('Fecha Inicio no puede ser mayor a Fecha Fin');
    var inputInicio = document.getElementById('fechaInicio');
    var inputFin = document.getElementById('fechaFin');
    inputInicio.value = '';
    inputFin.value = '';
  }
}

function llenarPais(){
    const paises=[{"valor":"US","texto":"Estados Unidos de América"}, 
	{"valor":"India","texto":"India"},
	{"valor":"Brazil","texto":"Brasil"},
	{"valor":"Russia", "texto":"Rusia"}, 
	{"valor":"France", "texto":"Francia"},
	{"valor":"United Kingdom","texto":"Reino Unido"},
	{"valor":"Turkey","texto":"Turquía"},
	{"valor":"Argentina", "texto":"Argentina"},
	{"valor":"Colombia", "texto":"Colombia"}, 
	{"valor":"Mexico","texto":"México"}];
    //paises=paises.sort();
    var select=document.getElementById("pais");
    for (var i = 0; i <paises.length; i++) {
        var opt = document.createElement('option');
        opt.value = paises[i].valor;
        opt.text=paises[i].texto;
        select.appendChild(opt);
    }
}



