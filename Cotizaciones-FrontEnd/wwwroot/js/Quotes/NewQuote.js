$(document).ready(function () {
    debugger;
    getClientsForSelect();
    getProductsForSelect();
});

function getProductsForSelect() {
    const select = document.getElementById('SelectProduct');
    debugger;
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

function getClientsForSelect() {
    const select = document.getElementById('SelectClients');

    $.ajax({
        method: 'Get',
        url: 'https://localhost:44379/api/Client/',
        success: function (response) {
            debugger;
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
        debugger;
        $("#cuerpo-tabla").append(`<tr>        
                <th scope="row">${item.description}</th>
                 <td>${item.amount}</td>
                 <td>${item.unitPrice}</td>
                 <td>${item.total}</td>
                 <td>${item.price}</td>
                <td>
                <a id="btnEditar"  class="btn btn-info" href="/Quotessss/Editar?id=${item.id}" >Editar</a>
                <button onclick="QuestionDeleteProduct(${item.id});" id="btnEliminar"  class="btn btn-danger">Eliminar</button>
                
               </td>
                </tr>`);
    });

}

function CreateQuoteProduct() {
    debugger;
    const Amount = parseInt($('#Amount').val());

    const ProductId = $('#SelectProduct').val();
    
    $.ajax({
        method: 'Post',
        url: 'https://localhost:44379/api/Quotes/postQuotesProducts?Amount=' + Amount + '&IdProduct=' + ProductId,
        success: function (response) {
            debugger;
            cleanTable();
            getQuotesProducts();
        }
    })
}

//function QuestionDeleteQuote(id) {
//    Swal.fire({
//        title: '¿Estas seguro de eliminar esta Cotización?',
//        text: "No es posible recuperarla!",
//        icon: 'warning',
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Si, Eliminar',
//        cancelButtonText: 'Cancelar'
//    }).then((result) => {
//        if (result.isConfirmed) {
//            DeleteQuote(id);
//        }
//    })
//}

//function DeleteQuote(id) {
//    $.ajax({
//        method: 'Delete',
//        url: 'https://localhost:44379/api/Quotes/?Id=' + id,
//        success: function (response) {
//            debugger;
//            cleanTable();
//            getQuotes(0);
//        }
//    })
//}


//function getQuotesProducts(page) {
//    const IdQuote = $('#IdQuote').val()
//    const IdClient = $('#SelectClients').val()
//    const DateFrom = ($('#DateFrom').val()).toString()
//    const DateTo = ($('#DateTo').val()).toString()

//    $.ajax({
//        method: 'get',
//        url: 'https://localhost:44379/api/Quotes?Id=' + IdQuote + '&DateTo=' + DateTo + '&DateFrom=' + DateFrom + '&IdClient=' + IdClient,
//        //data: { IdQuote, DateTo, DateFrom },
//        //dataType: "json",
//        success: function (response) {
//            cleanTable();
//            renderTable(response.quotes);
//        }
//    })
//}

//function cleanTable() {
//    var table = document.getElementById("tabla");
//    while (table.rows.length > 1) {
//        table.deleteRow(1);
//    }
//}