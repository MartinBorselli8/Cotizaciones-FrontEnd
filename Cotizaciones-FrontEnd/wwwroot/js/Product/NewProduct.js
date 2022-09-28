
function newProduct() {
    const Description = $("#Description").val()
    const UnitPrice = $("#UnitPrice").val()
    const Stock = $("#Stock").val()
    if (Description != "") {
        if (UnitPrice > 0) {

            debugger;


            $.ajax({
                url: 'https://localhost:44379/api/Product?Description=' + Description + '&UnitPrice=' + UnitPrice + '&Stock=' + Stock,
                type: "POST",
                success: function (response) {

                    if (response.fueCreado == true) {
                        Swal.fire(
                            '¡Genial!',
                            'El producto se guardó con éxito.',
                            'success'
                        )
                        setTimeout(function () { window.location.href = "/Products/IndexProducts"; }, 5000);
                    }
                }


            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese un precio unitario',
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese una descripcion',
        })
    }


}