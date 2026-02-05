
$(document).ready(function () {

    if (!$("#UnmatchedTradesReporttbl").length) return;

    loadUnmatchedTradesReportGrid();

    $("#UnmatchedTradesReportSearch").on("click", function () {
        searchUnmatchedTradesReport();
    });

    $("#UnmatchedTradesReportExport").on("click", function () {
        exportTableToExcel("#UnmatchedTradesReporttbl", "Unmatched Trades Report.xlsx");
    });
});



function loadUnmatchedTradesReportGrid() {
    $.ajax({
        url: "/Reports/GetUnmatchedTradesReport ",
        type: "GET",
        dataType: "json",
        success: function (data) {
            bindUnmatchedTradesReportTable(data);
        },
        error: function (err) {
            console.error("Error fetching data:", err);
            alert("Error loading data");
        }
    });
}



function searchUnmatchedTradesReport() {

    var broker = $("#broker").val();
    var accountname = $("#accountname").val();
    var transactiontype = $("#transactiontype").val();

    $.ajax({
        url: "/Reports/GetUnmatchedTradesReport",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            Broker: broker,
            accountname: accountname,
            TransactionType: transactiontype
        }),
        success: function (data) {
            bindUnmatchedTradesReportTable(data);
        },
        error: function (err) {
            console.error("Search error:", err);
            alert("Failed to fetch data");
        }
    });
}



function bindUnmatchedTradesReportTable(data) {

    if ($.fn.DataTable.isDataTable("#UnmatchedTradesReporttbl")) {
        $("#UnmatchedTradesReporttbl").DataTable().clear().destroy();
    }

    $("#UnmatchedTradesReporttbl").DataTable({
        data: data,
        destroy: true,
        scrollY: "400px",
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        lengthMenu: [[10, 25, -1], [10, 25, "All"]],
        columns: [
            { 'data': 'TickerId', 'title': 'ID' },
            { 'data': 'Account', 'title': 'Account' },
            { 'data': 'Broker', 'title': 'Broker' },
            { 'data': 'Security', 'title': 'Security' },
            { 'data': 'Common_ParentTicker', 'title': 'ParentTicker' },
            { 'data': 'TransactionType', 'title': 'Transaction Type' },
            { 'data': 'Quantity', 'title': 'Quantity' },
            { 'data': 'Side', 'title': 'Side' },
            { 'data': 'QuantityMatching', 'title': 'Quantity Matching Status' },
            { 'data': 'HoldingsCheck', 'title': 'Holdings Status' },
            { 'data': 'Price', 'title': 'Price' },
            //{ 'data': 'BrokerLongNote', 'title': 'Broker Long Note' },
            { 'data': 'TickerLongNote', 'title': 'Ticker Long Note' },
            { 'data': 'Spread', 'title': 'Spread' },
            {
                data: 'ProcessDate',
                title: 'Process Date',
                render: d => d ? new Date(d).toLocaleString('en-GB', { hour12: false }) : ''
            }
        ]
    });
}

 