$(document).ready(function () {

    var isListPage = $('#user_table').length > 0;
    var isModalPage = $('#userModal').length > 0;
    var isUpdatePage = (typeof initialUser !== "undefined" && initialUser !== null);

    if (isUpdatePage) {
        initialUser = initialUser[0];
        $('#UserId').val(initialUser.ID);
        $('#Code').val(initialUser.Code);
        $('#Name').val(initialUser.Name);
        $('#Email').val(initialUser.Email);
        $('#RoleId').val(initialUser.role_id);
    }

    if (isListPage) {
        loadUsers();
    }

    $('#saveUser').on('click', function () {

        var model = {
            ID: $('#UserId').val(),
            Code: $('#Code').val(),
            Name: $('#Name').val(),
            Email: $('#Email').val(),
            role_id: $('#RoleId').val(),
            Password: $('#Password').val()
        };

        var url = (model.ID && model.ID !== "0")
            ? '/User/UpdateUserSave'
            : '/User/SaveUser';

        $.ajax({
            url: url,
            type: 'POST',
            data: model,
            success: function (res) {
                alert(res.message || "Operation successful");
                if (isListPage && isModalPage) {
                    $('#userModal').modal('hide');
                    clearForm();
                    loadUsers();
                } else {
                    window.location.href = "/User";
                }
            },
            error: function () {
                alert("Something went wrong");
            }
        });
    });

    $('#exportUserSubmit').on('click', function () {
        exportTableToExcel("#user_table", "UserDetails.xlsx");
    });

});

function loadUsers() {

    if ($.fn.DataTable.isDataTable('#user_table')) {
        $('#user_table').DataTable().destroy();
    }

    $('#user_table').DataTable({
        ajax: {
            url: '/User/GetUser',
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
            {
                data: 'ID',
                render: function (data) {
                    return data ? `<a href="/User/UpdateUser/${data}" class="text-primary">${data}</a>` : '';
                }
            },
            { data: 'Code' },
            { data: 'Name' },
            { data: 'Email' },
            { data: 'role_Name' },
            {
                data: 'CreatedDate',
                render: function (data) {
                    return data ? moment(data).format('DD-MM-YYYY') : '';
                }
            },
            { data: 'UpdatedBy' },
            {
                data: 'UpdatedDate',
                render: function (data) {
                    return data ? moment(data).format('DD-MM-YYYY') : '';
                }
            }
        ]
    });
}

function editUser(id) {

    if (!id) return;

    $.get('/User/GetUserById', { id: id }, function (d) {

        if (!d) return;

        $('#UserId').val(d.ID);
        $('#Code').val(d.Code);
        $('#Name').val(d.Name);
        $('#Email').val(d.Email);
        $('#RoleId').val(d.role_id);
        $('#Password').val('');
        $('#userModal').modal('show');
    });
}

function clearForm() {
    $('#UserId').val('');
    $('#Code').val('');
    $('#Name').val('');
    $('#Email').val('');
    $('#RoleId').val('');
    $('#Password').val('');
}
