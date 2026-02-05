$(document).ready(function () {
    debugger
    if (!$("#tickerMappingTable").length) return;

    $('.ticker-loader').css('display', 'flex');
    $(".ticker-loader").hide();



    loadTickerMappingGrid();

    $("#btnTickerExport").on("click", function () {
        exportTableToExcel("#tickerMappingTable", "TickerMapping.xlsx");
    });

    $("#btnProcess").on("click", function () {
        processTickerMapping();
    });
});

function loadTickerMappingGrid() {

    $.ajax({
        url: "/TickerMapping/GetTickerMappingGrid",
        type: "POST",
        dataType: "json",
        success: function (response) {
            $("#tickerMappingTable").DataTable({
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
                        render: d => d ? parseFloat(d) : 0
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
        },
        error: function (err) {
            console.error("Grid load error", err);
            alert("Error loading data");
        }
    });
}

function processTickerMapping() {
    $('.ticker-loader').css('display', 'flex');
    $(".ticker-loader").show();

    let startTime = new Date().getTime();

    $.ajax({
        url: "/TickerMapping/ProcessTickerMapping",
        type: "GET",
        success: function (res) {

            let delay = Math.max(2000 - (new Date().getTime() - startTime), 0);

            setTimeout(function () {
                $(".ticker-loader").hide();

                if (res.success) {
                    alert(res.message);
                    loadTickerMappingGrid();
                } else {
                    alert("Process failed");
                }
            }, delay);
        },
        error: function () {
            $(".ticker-loader").hide();
            alert("Server error");
        }
    });
}
