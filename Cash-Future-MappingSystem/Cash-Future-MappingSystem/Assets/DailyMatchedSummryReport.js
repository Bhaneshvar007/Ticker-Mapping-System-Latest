$(document).ready(function () {

    if (!$("#DailyMatchedSummrytbl").length) return;

    loadDailyMatchedSummaryGrid();

    $("#DailyMatchedSummrySearch").on("click", function () {
        searchDailyMatchedSummary();
    });

    $("#ExportDailyMatchedSummry").on("click", function () {
        exportTableToExcel("#DailyMatchedSummrytbl", "Daily Matched Summry Report.xlsx");
    });
});



function loadDailyMatchedSummaryGrid() {
    $.ajax({
        url: "/Reports/GetDailyMatchedSummryReport",
        type: "GET",
        dataType: "json",
        success: function (data) {
            bindDailyMatchedTable(data);
        },
        error: function (err) {
            console.error("Error fetching data:", err);
            alert("Error loading data");
        }
    });
}



function searchDailyMatchedSummary() {

    var broker = $("#broker").val();
    var accountname = $("#accountname").val();
    var transactiontype = $("#transactiontype").val();

    $.ajax({
        url: "/Reports/GetDailyMatchedSummryReport",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            Broker: broker,
            accountname: accountname,
            TransactionType: transactiontype
        }),
        success: function (data) {
            bindDailyMatchedTable(data);
        },
        error: function (err) {
            console.error("Search error:", err);
            alert("Failed to fetch data");
        }
    });
}



function bindDailyMatchedTable(data) {

    if ($.fn.DataTable.isDataTable("#DailyMatchedSummrytbl")) {
        $("#DailyMatchedSummrytbl").DataTable().clear().destroy();
    }

    $("#DailyMatchedSummrytbl").DataTable({
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
            { data: "TickerId", title: "ID" },
            { data: "Account", title: "Account" },
            { data: "Broker", title: "Broker" },
            { data: "Security", title: "Security" },
            { data: "Common_ParentTicker", title: "ParentTicker" },
            { data: "TransactionType", title: "Transaction Type" },
            { data: "Quantity", title: "Quantity" },
            { data: "Price", title: "Price" },
            { data: "Side", title: "Side" },
            { data: "QuantityMatching", title: "Quantity Matching Status" },
            { data: "HoldingsCheck", title: "Holdings Status" },
            { data: "BrokerLongNote", title: "Broker Long Note" },
            { data: "TickerLongNote", title: "Calculated Long Note" },
            { data: "WeightedSpread", title: "Weighted Spread" },
            { data: "Spread", title: "Spread" },
            {
                data: "DVD",
                title: "Dividend",
                render: d => d ? parseFloat(d).toString() : "0"
            },
            { data: "ConvertedSide", title: "Converted Side" },
            {
                data: "Comment",
                title: "Comment",
                render: function (d) {
                    let color = d === "Matched" ? "#28a745" : "#fd7e14";
                    return `<span style="background:${color};color:#fff;padding:4px 8px;border-radius:4px;">
                                ${d}
                            </span>`;
                }
            },
            {
                data: "ProcessDate",
                title: "Process Date",
                render: d => d
                    ? new Date(d).toLocaleString("en-GB", { hour12: false })
                    : ""
            }
        ]
    });
}
