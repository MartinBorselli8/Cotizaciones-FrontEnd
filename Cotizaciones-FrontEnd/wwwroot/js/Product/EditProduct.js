/*
 $(document).ready(function () {
    debugger;
    editProduct(0)
    
    $('#remove').prop('disabled', true)
    $('#edit').prop('disabled', true)
    $('#show').prop('disabled', true)
});
function editProduct(page) {
    const Description = ($('#Description').val()).toString()
    const UnitPrice = $('#UnitPrice').val()
    $.ajax({
        method: 'put',
        url: 'https://cotizaciones-backend.herokuapp.com/api/Product?Id= ' + @ViewBag.Id  + '&Description=' + Description + '&UnitPrice=' + UnitPrice,
        success: function (response) {
            if (response.fueModificado == true) {
                Swal.fire(
                    '¡Genial!',
                    'El producto se modifico con éxito.',
                    'success'
                )
                setTimeout(function () { window.location.href = "/Product/Index"; }, 5000);
            }
        }
    })
};
*/