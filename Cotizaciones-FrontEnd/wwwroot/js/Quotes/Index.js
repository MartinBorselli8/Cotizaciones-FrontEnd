$(document).ready(function () {
    debugger;
    getClientsForSelect(newOptions);
    getQuotes(0);
    $('#remove').prop('disabled', true)
    $('#edit').prop('disabled', true)
    $('#show').prop('disabled', true)
});


const newOptions = [{ id: 1, name: 'Prueba' }, { id: 2, name: 'option2' }, { id: 3, name: 'option2' }];

function getClientsForSelect(list) {
    const select = document.getElementById('SelectClients');

    list.forEach(e => {
        const option = document.createElement('option');
        option.text = e.name;
        option.value = e.id;
        select.appendChild(option);
    })
}

function clearFilter() {
    cleanTable();
    $('#IdQuote').val("");
    $('#SelectClients').val(0);
    $('#DateFrom').val("");
    $('#DateTo').val("");
    getQuotes(0);
}

//$('#show_paginator').bootpag({
//}).on('page', function (event, num) {
//    obtenerFichas(num - 1);
//});

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

function renderTable(value) {
    cleanTable(0);
    $.each(value, (index, item) => {
        debugger;
        $("#cuerpo-tabla").append(`<tr>        
                <th scope="row">${item.id}</th>
                 <td>${item.idClient}</td>
                 <td>${item.createDate.toString().split('T')[0]}</td>
                 <td>${item.expirationDate.toString().split('T')[0]}</td>
                 <td>${item.price}</td>
                 <td>${item.condition}</td>
                <td>
                <button onclick="eliminar(${value.id});" id="btnEliminar"  class="btn btn-danger">Eliminar</button>
                    <a id="btnEditar"  class="btn btn-info" href="/Cliente/Editar?id=${item.id}" >Editar</a>
               </td>
                </tr>`);
    });
    
}

function getQuotes(page) {
    const IdQuote = $('#IdQuote').val()
    const IdClient = $('#SelectClients').val()
    const DateFrom = ($('#DateFrom').val()).toString()
    const DateTo = ($('#DateTo').val()).toString()

    $.ajax({
        method: 'get',
        url: 'https://localhost:44379/api/Quotes?Id=' + IdQuote + '&DateTo=' + DateTo + '&DateFrom=' + DateFrom + '&IdClient=' + IdClient,
        //data: { IdQuote, DateTo, DateFrom },
        //dataType: "json",
        success: function (response) {
            cleanTable();
            renderTable(response.quotes);
        }
    })
};


function cleanTable() {
    var table = document.getElementById("tabla");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}