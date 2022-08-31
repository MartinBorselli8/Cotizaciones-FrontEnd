
$(document).ready(function () {
    getClients(0);
    DeleteClient();
    $('#remove').prop('disabled', true)
    $('#edit').prop('disabled', true)
    $('#show').prop('disabled', true)
});

/* FUNCION DE OBTENER CLIENTES */

function getClients(page) {
    const NameClient = $('#NameClient').val()
    const LastNameClient = $('#LastNameClient').val()
    const DniClient = $('#DniClient').val()
    debugger;
    $.ajax({
        method: 'get',
        url: 'https://localhost:44379/api/Client?Name=' + NameClient + '&LastName=' + LastNameClient + '&Dni=' + DniClient,

        success: function (response) {
            cleanTable();
            renderTable(response.clients);
        }
    })
};

/* FUNCION DE ELIMINAR UN CLIENTE*/


function QuestionDeleteClient(id) {
    Swal.fire({
        title: '¿Estas seguro de eliminar este cliente?',
        text: "No es posible recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {

            DeleteClient(id);
        }
    })
}

function DeleteClient(id) {
    $.ajax({
        method: 'Delete',
        url: 'https://localhost:44379/api/Client/?Id=' + id,
        success: function (response) {
            cleanTable();
            getClients(0);
        }
    })
}



/* FUNCIONES DE LA TABLA*/

function cleanTable() {
    var table = document.getElementById("tabla");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function renderTable(value) {
    cleanTable(0);
    $.each(value, (index, item) => {
        $("#cuerpo-tabla").append(`<tr>        
                 <th scope="row">${item.id}</th>
                 <td>${item.name}</td>
                 <td>${item.lastName}</td>
                 <td>${item.dni}</td>
                <td>
                    <button onclick="QuestionDeleteClient( ${item.id} );" id="btnEliminar"  class="btn btn-danger">Eliminar</button>
                    <a id="btnEditar"  class="btn btn-info" href="/Client/EditClient?id=${item.id}" >Editar</a>
               </td>
                </tr>`);
    });

}



/* LOGICA DEL FILTRO */

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

function clearFilter() {
    cleanTable();
    $('#NameClient').val("");
    $('#LastNameClient').val("");
    $('#DniClient').val("");
    getClients(0);
}
