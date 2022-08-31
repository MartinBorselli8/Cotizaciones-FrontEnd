
/*
 $(document).ready(function () {
    debugger;
    editClients(0)
    
    $('#remove').prop('disabled', true)
    $('#edit').prop('disabled', true)
    $('#show').prop('disabled', true)
});

function editClients(page) {
    const NameClient = ($('#NameClient').val()).toString()
    const LastNameClient = ($('#LastNameClient').val()).toString()
    const DniClient = $('#DniClient').val()
    const PhoneClient = $('#PhoneClient').val()
    const EmailClient = $('#EmailClient').val()

    $.ajax({
        method: 'put',
        url: 'https://localhost:44379/api/Client?Id= ' + @ViewBag.Id  + '&Name=' + NameClient + '&LastName=' + LastNameClient + '&Dni=' + DniClient + '&Phone=' + PhoneClient + '&Email=' + EmailClient ,

        success: function (response) {
            if (response.fueModificado == true) {
                Swal.fire(
                    '¡Genial!',
                    'El cliente se modifico con éxito.',
                    'success'
                )
                setTimeout(function () { window.location.href = "/Client/Index"; }, 5000);
            }

        }
    })
};
*/