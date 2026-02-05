$(document).ready(function () {

    var isListPage = $('#RoleTable').length > 0;
    var isAddPage = $('#saveRole').length > 0;

    if (isListPage) {
        loadRoleGrid();
    }

    $('#saveRole').on('click', function () {

        var model = {
            Code: $('#RoleCode').val(),
            Name: $('#RoleName').val()
        };

        $.ajax({
            url: '/Role/SaveRole',
            type: 'POST',
            data: model,
            success: function (res) {
                alert(res.message || "Role saved successfully");
                window.location.href = "/Role";
            },
            error: function () {
                alert("Something went wrong");
            }
        });
    });

    $('#exportSubmit').on('click', function () {
        exportTableToExcel("#RoleTable", "RoleDetails.xlsx");
    });

});

function loadRoleGrid() {

    if ($.fn.DataTable.isDataTable("#RoleTable")) {
        $("#RoleTable").DataTable().clear().destroy();
    }

    $("#RoleTable").DataTable({
        ajax: {
            url: '/Role/GetRole',
            type: 'GET',
            dataSrc: ''
        },
        scrollY: "400px",
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        dom: '<"top"lf>rt<"bottom"ip><"clear">',
        lengthMenu: [[10, 25, -1], [10, 25, "All"]],
        columns: [
            { data: 'ID' },
            { data: 'Code' },
            { data: 'Name' },
            { data: 'Created_By' },
            {
                data: 'Created_Date',
                render: function (d) {
                    return d ? new Date(d).toLocaleString('en-GB', { hour12: false }) : '';
                }
            },
            { data: 'IsActive' }
        ]
    });
}
