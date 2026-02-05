
$(document).ready(function () {

    if (!$("#tblPageAccessLogs").length) return;

    loadPageAccessLogReportGrid();

    $("#PageAccessLogSearch").on("click", function () {
        searchPageAccessLogReport();
    });

    $("#PageAccessLogExport").on("click", function () {
        exportTableToExcel("#tblPageAccessLogs", "Unmatched Trades Report.xlsx");
    });
});



function loadPageAccessLogReportGrid() {
    $.ajax({
        url: "/PageAccessLog/GetPageAccessLog",
        type: "GET",
        dataType: "json",
        success: function (data) {
            bindPageAccessLogTable(data);
        },
        error: function (err) {
            console.error("Error fetching data:", err);
            alert("Error loading data");
        }
    });
}



function searchPageAccessLogReport() {

    var emailSearch = $("#emailSearch").val();
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();



    $.ajax({
        url: "/PageAccessLog/GetPageAccessLog",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            emailSearch: emailSearch,
            fromDate: fromDate,
            toDate: toDate
        }),
        success: function (data) {
            bindPageAccessLogTable(data);
        },
        error: function (err) {
            console.error("Search error:", err);
            alert("Failed to fetch data");
        }
    });
}



function bindPageAccessLogTable(data) {

    if ($.fn.DataTable.isDataTable("#tblPageAccessLogs")) {
        $("#tblPageAccessLogs").DataTable().clear().destroy();
    }

    $("#tblPageAccessLogs").DataTable({
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
            { 'data': 'ID', 'title': 'ID' },
            { 'data': 'UserName', 'title': 'User Name' },
            { 'data': 'EmailID', 'title': 'Email ID' },
            { 'data': 'AccessTime', 'title': 'Access Time' },
            { 'data': 'PageName', 'title': 'Page Name' },
            { 'data': 'LoginTime', 'title': 'Login Time' },
            { 'data': 'SessionId', 'title': 'Session Id' },
            { 'data': 'IpAddress', 'title': 'Ip Address' }

        ]
    });
}

