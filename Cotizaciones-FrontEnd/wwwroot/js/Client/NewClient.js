
function addClients(page) {
    const NameClient = ($('#NameClient').val()).toString()
    const LastNameClient = ($('#LastNameClient').val()).toString()
    const DniClient = $('#DniClient').val()
    const PhoneClient = $('#PhoneClient').val()
    const EmailClient = $('#EmailClient').val()

    if (NameClient != "") {
        if (LastNameClient != "") {
            if (DniClient > 0) {
                if (validateEmail(EmailClient) == true) {
                    if (validatePhoneNumer(PhoneClient) == true) {
                        $.ajax({
                            method: 'post',
                            url: 'https://localhost:44379/api/Client?Name= ' + NameClient + '&LastName=' + LastNameClient + '&Dni=' + DniClient + '&Phone=' + PhoneClient + '&Email=' + EmailClient,

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
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ingrese un numero de telefono valido',
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ingrese un email valido',
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese un dni',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese un apellido',
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un nombre',
        })
    }

};

function validateEmail(email) {
    var emailvalidate = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    var validation = emailvalidate.test(email);
    return validation;
}

function validatePhoneNumer(phoneNumber) {
    var phoneNumbervalidate = new RegExp(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/);

    var validation = phoneNumbervalidate.test(phoneNumber);
    return validation;
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
                    <a id="btnEditar"  class="btn btn-info" href="/Cliente/Editar?id=${item.id}" >Editar</a>
               </td>
                </tr>`);
    });

}



