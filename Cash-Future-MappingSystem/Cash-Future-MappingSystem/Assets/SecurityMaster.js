
$(document).ready(function () {

    loadSecGrid();

    function loadSecGrid() {
        $.ajax({
            url: "/SecurityMasterData/GetSecurityGrid",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#Seq_Table").DataTable({
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
                    data: response,
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
    $("#btnSecurityExport").on("click", function () {
        exportTableToExcel("#Seq_Table", "SecurityData.xlsx");
    });

});






