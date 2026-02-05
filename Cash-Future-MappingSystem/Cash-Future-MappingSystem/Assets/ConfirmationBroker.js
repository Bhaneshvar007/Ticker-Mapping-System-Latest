$("#BrokerPageLoad").ready(function () {
    if (!$("#table_Broker").length) return;

    loadBrokerGrid();

    function loadBrokerGrid() {
        $.ajax({
            url: "/ConfirmationBrokerData/GetConfirmationBroker",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#table_Broker").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    bPaginate: true,
                    scrollY: "400px",
                    autoWidth: false,
                    scrollX: true,
                    scrollCollapse: true,
                    data: response, // safe handling
                    columns: [
                        {
                            data: "Id",
                            render: function (data, type, row) {
                                return `<a href="/ConfirmationBrokerData/UpdateConfirmationBroker/${row.Id}">
                                            ${row.Id}
                                        </a>`;
                            }
                        },
                        { data: "Account", defaultContent: '' },
                        { data: "Broker", defaultContent: '' },
                        { data: "Security", defaultContent: '' },
                        { data: "Price", defaultContent: '' },
                        { data: "Side", defaultContent: '' },
                        { data: "Quantity", defaultContent: '' },
                        { data: "Reason", defaultContent: '' },
                        { data: "LongNote1", defaultContent: '' },
                        {
                            data: "CreatedDate",
                            render: function (data) {
                                return data ? moment(data).format("DD-MM-YYYY") : "";
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
    $("#btnBrokerExport").on("click", function () {
        exportTableToExcel("#table_Broker", "BrokerData.xlsx");
    });

});




$(document).ready(function () {
    if (!$("#table_OldBroker").length) return;

    loadBrokerGrid();

    function loadBrokerGrid() {
        $.ajax({
            url: "/ConfirmationBrokerData/GetOldBroker",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#table_OldBroker").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    bPaginate: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    data: response, // safe handling
                    columns: [
                        { data: "Id", },
                        { data: "Account" },
                        { data: "Broker" },
                        { data: "Security" },
                        { data: "Price" },
                        { data: "Side" },
                        { data: "Quantity" },
                        { data: "Reason" },
                        { data: "LongNote1" },
                        {
                            data: "CreatedDate",
                            render: function (data) {
                                return data ? moment(data).format("DD-MM-YYYY") : "";
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
    $("#btnOldBrokerExport").on("click", function () {
        exportTableToExcel("#table_OldBroker", "BrokerData.xlsx");
    });

});




