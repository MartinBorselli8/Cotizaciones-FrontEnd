﻿// Paginado funcion

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
    $('#Description').val("");
    $('#UnitPrice').val("");
    
}

// Cada vez que se carga la vista ejecuta las funciones dentro
$(document).ready(function () {
    debugger;
    SeMuestraElFiltro = false;
});

function renderTable(value) {
    cleanTable(0);
    $.each(value, (index, item) => {
        debugger;
        $("#cuerpo-tabla").append(`<tr>        
                <th scope="row">${item.id}</th>
                 <td>${item.description}</td>
                 <td>${item.unitPrice}</td>
                 
                <td>
                <button onclick="eliminar(${value.id});" id="btnEliminar"  class="btn btn-danger">Eliminar</button>
                    <a id="btnEditar"  class="btn btn-info" href="/Producto/Editar?id=${item.id}" >Editar</a>
               </td>
                </tr>`);
    });

}

function getProduct(page) {
    const IdProduct = $('#IdProduct').val()
    const Description = ($('#Description').val())
    const UnitPrice = ($('#UnitPrice').val()).toString()
    

    $.ajax({
        method: 'get',
        url: 'https://localhost:44379/api/Product?Id=' + IdProduct + '&Description=' + Description + 'UnitPrice=' + UnitPrice,
        //data: { IdQuote, DateTo, DateFrom },
        //dataType: "json",
        success: function (response) {
            cleanTable();
            renderTable(response.product);
        }
    })
};