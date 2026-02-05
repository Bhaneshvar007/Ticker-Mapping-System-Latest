// For Equity Holdings

$(document).ready(function () {
    if (!$("#OldEquityHoldingsTbl").length) return;

    loadClientGrid();

    function loadClientGrid() {
        $.ajax({
            url: "/Settings/OldEquityholdingsGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#OldEquityHoldingsTbl").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    bPaginate: true,
                    scrollX: true,
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
    $("#OldEquityExportBtn").on("click", function () {
        exportTableToExcel("#OldEquityHoldingsTbl", "Equity Holdings Data.xlsx");
    });

});


// For future holdings

$(document).ready(function () {
    if (!$("#OldFutureHoldingsTbl").length) return;

    loadClientGrid();

    function loadClientGrid() {
        $.ajax({
            url: "/Settings/OldFutureholdingsGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#OldFutureHoldingsTbl").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true, scrollX: true,
                    bPaginate: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    data: response, // safe handling
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
    $("#OldFutrureExportBtn").on("click", function () {
        exportTableToExcel("#OldFutureHoldingsTbl", "Future Holdings Data.xlsx");
    });

});






// Security


$(document).ready(function () {
    if (!$("#OldSeq_Table").length) return;

    loadClientGrid();

    function loadClientGrid() {
        $.ajax({
            url: "/Settings/GetOldSecurityGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#OldSeq_Table").DataTable({
                    destroy: true,
                    bLengthChange: true,
                    lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                    bFilter: true,
                    bSort: true,
                    scrollX: true,
                    bPaginate: true,
                    scrollY: "400px",
                    scrollCollapse: true,
                    data: response, // safe handling
                    columns: [

                        {
                            'data': 'Security_ID',

                        },
                        { 'data': 'Parent_Ticker', defaultContent: '' },
                        { 'data': 'NSE_CODE', defaultContent: '' },
                        { 'data': 'NSE_Ticker', defaultContent: '' },
                        { 'data': 'BSE_Ticker', defaultContent: '' },
                        { 'data': 'Common_Ticker', defaultContent: '' },
                        { 'data': 'CurrentMonth', defaultContent: '' },
                        { 'data': 'CurrentMonth_BBG', defaultContent: '' },
                        { 'data': 'CurrentMonth_LotSize', defaultContent: '' },
                        { 'data': 'NextMonth', defaultContent: '' },
                        { 'data': 'NextMonth_BBG', defaultContent: '' },
                        { 'data': 'NextMonth_LotSize', defaultContent: '' },
                        { 'data': 'FarMonth', defaultContent: '' },
                        { 'data': 'FarMonth_BBG', defaultContent: '' },
                        { 'data': 'FarMonth_LotSize', defaultContent: '' },
                        {
                            'data': 'Created_Date',
                            render: function (data) {
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
    $("#btnOldSecurityExport").on("click", function () {
        exportTableToExcel("#OldSeq_Table", "AllSecurityData.xlsx");
    });

});
