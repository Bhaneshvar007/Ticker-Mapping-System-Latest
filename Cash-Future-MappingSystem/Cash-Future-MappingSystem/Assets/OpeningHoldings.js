// For Equity Holdings

$(document).ready(function () {
    if (!$("#EquityHoldingsTbl").length) return;

    loadEquityGrid();

    function loadEquityGrid() {
        $.ajax({
            url: "/OpeningHoldings/GetEquityHoldingsGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#EquityHoldingsTbl").DataTable({
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
                    data: response, // safe handling
                    columns: [
                        { data: 'EquityHoldingsId', title: 'Sr. No.', defaultContent: '' },
                        { data: 'DisplayName', title: 'Display Name', defaultContent: '' },
                        { data: 'Issuer', title: 'Issuer', defaultContent: '' },
                        { data: 'Position', title: 'Position', defaultContent: '' },
                        { data: 'Saleable', title: 'Saleable', defaultContent: '' },
                        { data: 'UnderlyingEquivalentPosition', title: 'Underlying Equivalent Position', defaultContent: '' },
                        { data: 'IndustrySector', title: 'Industry Sector', defaultContent: '' },

                        { data: 'Price', title: 'Price', defaultContent: '' },
                        { data: 'PreviousEODPrice', title: 'Previous EOD Price', defaultContent: '' },
                        { data: 'PreviousDay_Futures', title: 'Previous Day Futures', defaultContent: '' },
                        { data: 'CumAvgCost', title: 'Cum Avg Cost', defaultContent: '' },

                        { data: 'SecurityDescription', title: 'Security Description', defaultContent: '' },
                        { data: 'AssetType', title: 'Asset Type', defaultContent: '' },
                        { data: 'GrossExp_NAV', title: 'Gross Exp / NAV', defaultContent: '' },

                        { data: 'A_Cost_Local', title: 'A Cost Local', defaultContent: '' },
                        { data: 'Industry', title: 'Industry', defaultContent: '' },

                        { data: 'Change', title: 'Change', defaultContent: '' },
                        { data: 'AccruedInterest', title: 'Accrued Interest', defaultContent: '' },
                        { data: 'TotalPL', title: 'Total P&L', defaultContent: '' },

                        { data: 'GrossMV', title: 'Gross MV', defaultContent: '' },
                        { data: 'ISIN', title: 'ISIN', defaultContent: '' },
                        { data: 'ACCRINT', title: 'ACCRINT', defaultContent: '' },

                        { data: 'ParentCompanyName', title: 'Parent Company Name', defaultContent: '' },
                        { data: 'AccountName', title: 'Account Name', defaultContent: '' },
                        { data: 'Cusip', title: 'Cusip', defaultContent: '' },

                        { data: 'Previous_Day_Perc', title: 'Previous Day %', defaultContent: '' },
                        {
                            data: 'IsClosed',
                            title: 'Is Closed'

                        },


                        {
                            data: 'CreatedDate',
                            title: 'Created Date',
                            render: function (d) {
                                return d ? new Date(d).toLocaleString('en-GB', { hour12: false }) : '';
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
    $("#EquityExportBtn").on("click", function () {
        exportTableToExcel("#EquityHoldingsTbl", "Equity Holdings Data.xlsx");
    });

});


// For future holdings

$(document).ready(function () {
    if (!$("#FutureHoldingsTbl").length) return;

    loadFutureGrid();

    function loadFutureGrid() {
        $.ajax({
            url: "/OpeningHoldings/GetFutureHoldingsGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#FutureHoldingsTbl").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    bPaginate: true,
                    autoWidth: false,
                    scrollX: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    data: response, 
                    columns: [
                        { data: 'FutureHoldingsId', title: 'Sr. No.' },

                        { data: 'DisplayName', title: 'Display Name', defaultContent: '' },
                        { data: 'AccountCode', title: 'Account Code', defaultContent: '' },
                        { data: 'AccountName', title: 'Account Name', defaultContent: '' },

                        { data: 'Name', title: 'Name', defaultContent: '' },
                        { data: 'SecurityDescription', title: 'Security Description', defaultContent: '' },

                        { data: 'Position', title: 'Position', defaultContent: '' },
                        { data: 'UnderlyingEquivalentPosition', title: 'Underlying Eq Position', defaultContent: '' },

                        { data: 'A_MarketValueLocal', title: 'Market Value (Local)', defaultContent: '' },
                        { data: 'Price', title: 'Price', defaultContent: '' },

                        {
                            data: 'ExpirationDate',
                            title: 'Expiration Date',
                            render: function (d) {
                                if (!d) return '';
                                return d.split('T')[0];
                            }
                        },

                        { data: 'Issuer', title: 'Issuer' },

                        {
                            data: 'IsClosed',
                            title: 'Is Closed'

                        },

                        {
                            data: 'CreatedDate',
                            title: 'Created Date',
                            render: d => d ? new Date(d).toLocaleString('en-GB', { hour12: false }) : ''
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
    $("#FutrureExportBtn").on("click", function () {
        exportTableToExcel("#FutureHoldingsTbl", "Future Holdings Data.xlsx");
    });

});


// For Join Opening Holding
$(document).ready(function () {
    if (!$("#JoinOpeningHoldingsTbl").length) return;

    loadJoinHoldingsGrid();

    function loadJoinHoldingsGrid() {
        $.ajax({
            url: "/OpeningHoldings/GetJoinOpeningHoldingsGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#JoinOpeningHoldingsTbl").DataTable({
                    destroy: true,
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
                        { data: 'Id', title: 'Sr. No.' },
                        { data: 'EquityDisplayName', title: 'Display Name Equity', defaultContent: '' },
                        { data: 'FutureDisplayName', title: 'Display Name Future', defaultContent: '' },
                        { data: 'AccountCode', title: 'Account Code', defaultContent: '' },
                        { data: 'AccountName', title: 'Account Name', defaultContent: '' },
                        { data: 'Issuer', title: 'Issuer', defaultContent: '' },
                        { data: 'EquityPosition', title: 'Equity Position', defaultContent: '' },
                        { data: 'Saleable', title: 'Saleable', defaultContent: '' },
                        { data: 'FuturePosition_Lots', title: 'Future Position (Lots)', defaultContent: '' },
                        { data: 'FuturePosition', title: 'Future Position', defaultContent: '' }
                    ]
                });
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    }

    // Export button
    $("#JoinHoldingsExportBtn").on("click", function () {
        exportTableToExcel("#JoinOpeningHoldingsTbl", "Join Opening Holdings.xlsx");
    });

});


