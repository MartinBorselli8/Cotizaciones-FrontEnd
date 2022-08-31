
function newProduct() {
    const Description = $("#Description").val()
    const UnitPrice = $("#UnitPrice").val()


    $.ajax({
        url: 'https://localhost:44379/api/Product?Description=' + Description + '&UnitPrice=' + UnitPrice,
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
}