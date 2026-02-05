
$(document).ready(function () {

    if (!$("#TradewiseMatchingLogReporttbl").length) return;

    loadTradewiseMatchingLogReportGrid();

    $("#TradewiseMatchingLogReportSearch").on("click", function () {
        searchTradewiseMatchingLogReport();
    });

    $("#TradewiseMatchingLogReportExport").on("click", function () {
        exportTableToExcel("#TradewiseMatchingLogReporttbl", "Tradewise MatchingLog Report.xlsx");
    });
});



function loadTradewiseMatchingLogReportGrid() {
    $.ajax({
        url: "/Reports/GetTradewiseMatchingLogReport",
        type: "GET",
        dataType: "json",
        success: function (data) {
            bindTradewiseMatchingLogReportTable(data);
        },
        error: function (err) {
            console.error("Error fetching data:", err);
            alert("Error loading data");
        }
    });
}



function searchTradewiseMatchingLogReport() {

    var broker = $("#broker").val();
    var accountname = $("#accountname").val();
    var transactiontype = $("#transactiontype").val();

    $.ajax({
        url: "/Reports/GetTradewiseMatchingLogReport",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            Broker: broker,
            Account: accountname,
            TransactionType: transactiontype
        }),
        success: function (data) {
            bindTradewiseMatchingLogReportTable(data);
        },
        error: function (err) {
            console.error("Search error:", err);
            alert("Failed to fetch data");
        }
    });
}



function bindTradewiseMatchingLogReportTable(data) {

    if ($.fn.DataTable.isDataTable("#TradewiseMatchingLogReporttbl")) {
        $("#TradewiseMatchingLogReporttbl").DataTable().clear().destroy();
    }

    $("#TradewiseMatchingLogReporttbl").DataTable({
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
            { 'data': 'Id', 'title': 's.no' },
            { 'data': 'Account', 'title': 'Account' },
            { 'data': 'Broker', 'title': 'Broker' },
            { 'data': 'TransactionType', 'title': 'Transaction Type' },
            { 'data': 'CashPrice', 'title': 'CashTotalPrice' },
            { 'data': 'FuturePrice', 'title': 'FutureTotalPrice' },
            { 'data': 'WeightedSpread', 'title': 'WeightedSpread' },

        ]
    });
}

 