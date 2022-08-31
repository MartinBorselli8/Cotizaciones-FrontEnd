$(document).ready(function () {
    addClients()
    $('#remove').prop('disabled', true)
    $('#edit').prop('disabled', true)
    $('#show').prop('disabled', true)
});

function addClients(page) {
    const NameClient = ($('#NameClient').val()).toString()
    const LastNameClient = ($('#LastNameClient').val()).toString()
    const DniClient = $('#DniClient').val()
    const PhoneClient = $('#PhoneClient').val()
    const EmailClient = $('#EmailClient').val()


    $.ajax({
        method: 'post',
        url: 'https://localhost:44379/api/Client?Name= ' + NameClient + '&LastName=' + LastNameClient + '&Dni=' + DniClient + '&Phone=' + PhoneClient + '&Email=' + EmailClient ,

        success: function (response) {
            if (response.fueCreado == true) {
                Swal.fire(
                    '¡Genial!',
                    'El cliente se guardó con éxito.',
                    'success'
                )
                setTimeout(function () { window.location.href = "/Client/Index"; }, 5000);
            }

        }
    })
};



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
                    <a id="btnEditar"  class="btn btn-info" href="/Cliente/Editar?id=${item.id}" >Editar</a>
               </td>
                </tr>`);
    });

}



