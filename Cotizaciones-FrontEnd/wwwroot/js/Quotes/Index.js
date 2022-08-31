$(document).ready(function () {
    getClientsForSelect();
    getQuotes(0);
    
});


//const newOptions = [{ id: 1, name: 'Prueba' }, { id: 2, name: 'option2' }, { id: 3, name: 'option2' }];

function getClientsForSelect() {
    const select = document.getElementById('SelectClients');

    $.ajax({
        method: 'Get',
        url: 'https://cotizaciones-backend.herokuapp.com/api/Client/',
        success: function (response) {
            debugger;
            response.clients.forEach(e => {
                const option = document.createElement('option');
                option.text = e.name + ' ' + e.lastName;
                option.value = e.id;
                select.appendChild(option);
            })
        }
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
        $("#cuerpo-tabla").append(`<tr>        
                <th scope="row">${item.id}</th>
                 <td>${item.client}</td>
                 <td>${item.createDate.toString().split('T')[0]}</td>
                 <td>${item.expirationDate.toString().split('T')[0]}</td>
                 <td>${item.price}</td>
                 <td>${item.condition}</td>
                <td>
                <a id="btnEditar"  class="btn btn-info" href="/Quotes/EditQuote?id=${item.id}" >Editar</a>
                <button onclick="ConfirmQuote(${item.id}, '${item.condition}');" id="btnConfirmQuote" class="btn btn-success">Confirmar</a>
                <button onclick="QuestionDeleteQuote(${item.id});" id="btnEliminar"  class="btn btn-danger">Eliminar</button>
                
               </td>
                </tr>`);
    });
    
}

function ConfirmQuote(id, condition) {
    if (condition == 'Pendiente') {
        $.ajax({
            method: 'put',
            url: 'https://cotizaciones-backend.herokuapp.com/api/Quotes/ConfirmQuote?Id=' + id,
            success: function (response) {
                if (response.status == true) {
                    Swal.fire(
                        '¡Confirmado!',
                        'La cotizacion se confirmo con éxito.',
                        'success'
                    )
                    cleanTable();
                    getQuotes(0);
                } else {
                    Swal.fire(
                        '¡Error!',
                        'La cotizacion ya se encontraba confirmada.',
                        'error'
                    )
                }

            }
        })
    } else if (condition == 'Confirmado') {
        Swal.fire(
            '¡Error!',
            'La cotizacion ya se encontraba confirmada.',
            'error'
        )
    } else if (condition == 'Vencido') {
        Swal.fire(
            '¡Ooops!',
            'La cotizacion esta vencida.',
            'info'
        )
    }

    
}


function QuestionDeleteQuote(id) {
    Swal.fire({
        title: '¿Estas seguro de eliminar esta Cotización?',
        text: "No es posible recuperarla!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            DeleteQuote(id);
        }
    })
}




function DeleteQuote(id) {
    $.ajax({
        method: 'Delete',
        url: 'https://cotizaciones-backend.herokuapp.com/api/Quotes/?Id=' + id,
        success: function (response) {
            debugger;
            cleanTable();
            getQuotes(0);
        }
    })
}


function getQuotes(page) {
    const IdQuote = $('#IdQuote').val()
    const IdClient = $('#SelectClients').val()
    const DateFrom = ($('#DateFrom').val()).toString()
    const DateTo = ($('#DateTo').val()).toString()

    $.ajax({
        method: 'get',
        url: 'https://cotizaciones-backend.herokuapp.com/api/Quotes?Id=' + IdQuote + '&DateTo=' + DateTo + '&DateFrom=' + DateFrom + '&IdClient=' + IdClient,
        //data: { IdQuote, DateTo, DateFrom },
        //dataType: "json",
        success: function (response) {
            cleanTable();
            renderTable(response.quotes);
        }
    })
}

function editQuote(Id) {
    setTimeout(function () { window.location.href = "/Quotes/EditQuote?Id=" + Id; }, 5000);
}

function cleanTable() {
    var table = document.getElementById("tabla");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}