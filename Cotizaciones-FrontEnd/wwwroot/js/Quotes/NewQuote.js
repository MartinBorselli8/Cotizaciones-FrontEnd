$(document).ready(function () {
    getClientsForSelect();
    getProductsForSelect();
    getQuotesProducts();
});

function foo() {
    globalThis.QuoteProducIdToEdit = 0;
}


function getProductsForSelect() {
    const select = document.getElementById('SelectProduct');
    $.ajax({
        method: 'Get',
        url: 'https://localhost:44379/api/Product/',
        success: function (response) {
            response.products.forEach(e => {
                const option = document.createElement('option');
                option.text = e.description;
                option.value = e.id;
                select.appendChild(option);
            })
        }
    })
    
}

function confirmQuote() {
    const IdClient = $('#SelectClients').val();
    $.ajax({
        method: 'Put',
        url: 'https://localhost:44379/api/Quotes?IdClient='+ IdClient,
        success: function (response) {
            if (response.status == true) {
                Swal.fire(
                    '¡Genial!',
                    'La cotizacion se guardó con éxito.',
                    'success'
                )
                setTimeout(function () { window.location.href = "/Quotes/IndexQuotes"; }, 5000);
            } else {
                Swal.fire(
                    '¡Oops!',
                    'Ocurrió un error',
                    'error'
                )
            }
            
        }
    })
}



function getClientsForSelect() {
    const select = document.getElementById('SelectClients');

    $.ajax({
        method: 'Get',
        url: 'https://localhost:44379/api/Client/',
        success: function (response) {
            response.clients.forEach(e => {
                const option = document.createElement('option');
                option.text = e.name + ' ' +e.lastName;
                option.value = e.id;
                select.appendChild(option);
            })
        }
    })
    
}

function renderTable(value) {
    cleanTable(0);
    $.each(value, (index, item) => {
        $("#body-tableProductsSelected").append(`<tr>        
                <th scope="row">${item.description}</th>
                 <td>${item.amount}</td>
                 <td>${item.unitPrice}</td>
                 <td>${item.total}</td>
                 
                <td>
                <button id="btnEditar"  class="btn btn-info" onclick="editQuoteProductModal(${item.id});">Editar</button>
                <button onclick="QuestionDeleteQuoteProduct(${item.id});" id="btnEliminar"  class="btn btn-danger">Eliminar</button>
                
               </td>
                </tr>`);
    });

}

function CreateQuoteProduct() {
    const IdClient = $('#SelectClients').val();
    const Amount = parseInt($('#Amount').val());
    const ProductId = $('#SelectProduct').val();

    if (IdClient > 0) {
        if (ProductId > 0) {
            if (Amount > 0) {
                $.ajax({
                    method: 'Post',
                    url: 'https://localhost:44379/api/Quotes/postQuotesProducts?Amount=' + Amount + '&IdProduct=' + ProductId,
                    success: function (response) {
                        $('#Amount').val(0)
                        $('#SelectProduct').val(0)
                        cleanTable();
                        getQuotesProducts();
                    }
                })
            } else {
                Swal.fire(
                    '¡Oops!',
                    'Seleccione una cantidad',
                    'error'
                )
            }
        } else {
            Swal.fire(
                '¡Oops!',
                'Seleccione un Producto',
                'error'
            )
        }
    } else {
        Swal.fire(
            '¡Oops!',
            'Seleccione un Cliente',
            'error'
        )
    }
 
}

function QuestionDeleteQuoteProduct(id) {
    Swal.fire({
        title: '¿Estas seguro de eliminar este producto?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            DeleteQuoteProduct(id);
        }
    })
}

function DeleteQuoteProduct(id) {
    $.ajax({
        method: 'Delete',
        url: 'https://localhost:44379/api/Quotes/deleteQuotesProducts?Id=' + id,
        success: function (response) {
            if (response.status == true) {
                cleanTable();
                getQuotesProducts();
            }
        }
    })
}


function getQuotesProducts() {
    $.ajax({
        method: 'get',
        url: 'https://localhost:44379/api/Quotes/getQuotesProductsForCreateQuote',
        
        success: function (response) {
            cleanTable();
            renderTable(response.quotesProducts);
        }
    })
}

function cleanTable() {
    var table = document.getElementById("tableProductsSelected");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}


function editQuoteProductModal(Id) {
    QuoteProducIdToEdit = Id;
    var
        overlay = document.getElementById('overlay'),
        popup = document.getElementById('popup');

    overlay.classList.add('active');
    popup.classList.add('active');
}


function editQuoteProduct() {
    const NewAmount = parseInt($('#newAmount').val());
   
    $.ajax({
        method: 'Put',
        url: 'https://localhost:44379/api/Quotes/editQuoteProduct?Id=' + QuoteProducIdToEdit + '&NewAmount='+ NewAmount,

        success: function (response) {
            if (response.status) {
                closeEditQuoteProduct();
                Swal.fire(
                    '¡Genial!',
                    'Se modifico la cantidad con exito.',
                    'success'
                )
                cleanTable();
                getQuotesProducts();
            }
        }
    })
}

function closeEditQuoteProduct() {
    var
        overlay = document.getElementById('overlay'),
        popup = document.getElementById('popup');
    overlay.classList.remove('active');
    popup.classList.remove('active');
}