
$(document).ready(function () {
    if (!$("#tableClient").length) return;

    loadClientGrid();

    function loadClientGrid() {
        $.ajax({
            url: "/clientmaster/GetclientGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {
                
                $("#tableClient").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    autoWidth: false,
                    scrollX: true,
                    bPaginate: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    data: response, 
                    columns: [
                        { data: "Client_ID", defaultContent: '' },
                        { data: "AccountNo", defaultContent: '' },
                        { data: "Security", defaultContent: '' },
                        { data: "Quantity", defaultContent: '' },
                        {
                            data: "Created_Date",
                            render: function (data) {
                                if (!data) return "";
                                return moment(data).format("DD-MM-YYYY");
                            }
                        }
                    ]
                });
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    }

    // Export button
    $("#btnClientExport").on("click", function () {
        exportTableToExcel("#tableClient", "ClientData.xlsx");
    });

});




// For Bulk

$(document).ready(function () {
    if (!$("#tableOldClient").length) return;


    loadOldClientGrid();

    function loadOldClientGrid() {
        $.ajax({
            url: "/clientmaster/OldClientGetData",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#tableOldClient").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    autoWidth: false,
                    scrollX: true,
                    bPaginate: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    data: response,
                    columns: [
                        { data: "Client_ID", defaultContent: '' },
                        { data: "AccountNo", defaultContent: '' },
                        { data: "Security", defaultContent: '' },
                        { 'data': 'Broker', defaultContent: '' },
                        { data: "Quantity", defaultContent: '' },
                        {
                            data: "Created_Date",
                            render: function (data) {
                                if (!data) return "";
                                return moment(data).format("DD-MM-YYYY");
                            }
                        }
                    ]
                });
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    }

    // Export button
    $("#btnOldClientExport").on("click", function () {
        exportTableToExcel("#tableOldClient", "AllClientData.xlsx");
    });



});
