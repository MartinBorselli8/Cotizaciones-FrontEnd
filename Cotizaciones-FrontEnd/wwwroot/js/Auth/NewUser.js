$("#btnSummit").on("click", RegisterNewUser);

function RegisterNewUser() {

    debugger;
    const UserName = $("#UserName").val();
    const Password = $("#Password").val();
    let data = { UserName, Password }


    $.ajax({
        url: "https://localhost:44379/api/Auth",
        type: 'POST',
        data:
            JSON.stringify(data),
        contentType: "application/json",
    }).done(function (respuesta) {
        debugger;
        
        setTimeout(function () { location.href = "Index", "Auth" }, 1000);
    }).fail((respuesta) => mostrarAlertas(respuesta));
}

//const mostrarAlertas = (respuesta) => {
//    $(".alert").remove();

//    if (respuesta.responseJSON.errors.UserName) {
//        for (var i = 0; i < respuesta.responseJSON.errors.UserName.length; i++) {
//            $("#errores").append(`<div  class="alert alert-danger" role="alert">
//                                                                                    ${respuesta.responseJSON.errors.UserName[i]}</div>`)
//        }
//    }
//    if (respuesta.responseJSON.errors.Password) {
//        for (var i = 0; i < respuesta.responseJSON.errors.Password.length; i++) {
//            $("#errores").append(`<div  class="alert alert-danger" role="alert">
//                                                                                    ${respuesta.responseJSON.errors.Password[i]}</div>`)
//        }
//    }
//}

//const toastPrompt = () => {

//    const Toast = Swal.mixin({
//        toast: true,
//        position: 'top-end',
//        showConfirmButton: false,
//        timer: 1000,
//        timerProgressBar: true,
//        didOpen: (toast) => {
//            toast.addEventListener('mouseenter', Swal.stopTimer)
//            toast.addEventListener('mouseleave', Swal.resumeTimer)
//        }
//    })

//    Toast.fire({
//        icon: 'success',
//        title: 'Usuario creado correctamente',
//    })
//}