
// Paginado funcion

$('#show_paginator').bootpag({
}).on('page', function (event, num) {
    debugger;
    obtenerFichas(num - 1);
});


var SeMuestraElFiltro;

function showFilter() {
    debugger;
    if (SeMuestraElFiltro) {
        document.getElementById('divFiltro').style.display = 'none';
        SeMuestraElFiltro = false;
    } else {
        document.getElementById('divFiltro').style.display = 'block';
        SeMuestraElFiltro = true;
    }

}

function hideFilter() {
    document.getElementById('divFiltro').style.display = 'none';
}

function clearFilter() {
    $('#Name').val("");
    $('#LastName').val("");
    $('#Dni').val("");
}

// Cada vez que se carga la vista ejecuta las funciones dentro
$(document).ready(function () {
    debugger;
    SeMuestraElFiltro = false;
  });

