$(document).ready(function () {

    if (!$("#BrokerwiseMatchingReporttbl").length) return;

    loadBrokerwiseMatchingReportGrid();

    $("#BrokerwiseMatchingReportSearch").on("click", function () {
        searchBrokerwiseMatchingReport();
    });

    $("#ExportBrokerwiseMatchingReport").on("click", function () {
        exportTableToExcel("#BrokerwiseMatchingReporttbl", "Broker wise Matching Report.xlsx");
    });
});



function loadBrokerwiseMatchingReportGrid() {
    $.ajax({
        url: "/Reports/GetBrokerwiseMatchingReport",
        type: "GET",
        dataType: "json",
        success: function (data) {
            BrokerwiseMatchingReport(data);
        },
        error: function (err) {
            console.error("Error fetching data:", err);
            alert("Error loading data");
        }
    });
}



function searchBrokerwiseMatchingReport() {

    var broker = $("#broker").val();
    var accountname = $("#accountname").val();
   // var transactiontype = $("#transactiontype").val();

    $.ajax({
        url: "/Reports/GetBrokerwiseMatchingReport",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            Broker: broker,
            accountname: accountname
            //TransactionType: transactiontype
        }),
        success: function (data) {
            BrokerwiseMatchingReport(data);
        },
        error: function (err) {
            console.error("Search error:", err);
            alert("Failed to fetch data");
        }
    });
}



function BrokerwiseMatchingReport(data) {

    if ($.fn.DataTable.isDataTable("#BrokerwiseMatchingReporttbl")) {
        $("#BrokerwiseMatchingReporttbl").DataTable().clear().destroy();
    }

    $("#BrokerwiseMatchingReporttbl").DataTable({
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
            { data: 'Broker', title: 'Broker' },
            { data: 'Account', title: 'Account' },

            {
                data: 'CashTradeValue',
                title: 'Cash Trade Value',
                render: data => data ? parseFloat(data).toString() : '0'
            },
            {
                data: 'FutureTradeValue',
                title: 'Future Trade Value',
                render: data => data ? parseFloat(data).toString() : '0'
            },
            //{
            //    data: 'NetTradeValue',
            //    title: 'Net Trade Value',
            //    render: data => data ? parseFloat(data).toString() : '0'
            //},
            {
                data: 'Spread',
                title: 'Spread',
                render: data => data ? parseFloat(data).toString() : ''
            },
            {
                data: 'QuantityStatus',
                title: 'Status',
                render: function (data, type, row) {
                    if (data === 'Matched') {
                        return `<span style="background-color:#28a745;color:white;padding:4px 8px;border-radius:4px;">
                        ${data}
                    </span>`;
                    } else {
                        return `<span style="background-color:#fd7e14;color:white;padding:4px 8px;border-radius:4px;">
                        ${data}
                    </span>`;
                    }
                }
            }

        ]
    });
}

 