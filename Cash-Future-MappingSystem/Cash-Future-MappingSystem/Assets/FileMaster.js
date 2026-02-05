$(function () {

    if (!$("#fileMaster_table").length) return;

    loadFileGrid();

 
    function loadFileGrid() {

        $.ajax({
            url: "/FileMaster/GetFiles",
            type: "POST",
            dataType: "json",
            success: function (response) {

                $("#fileMaster_table").DataTable({
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
                        { data: 'Id', title: 'File Id', defaultContent: '' },
                        { data: 'FileName', title: 'FileName', defaultContent: '' },
                        { data: 'Email', title: 'Email', defaultContent: '' },
                        { data: 'FileRef', title: 'Reference Type', defaultContent: '' },
                        { data: 'TotalRecord', title: 'Total Record', defaultContent: '' },
                        { data: 'UplodedBy', title: 'Updated By', defaultContent: '' },
                        {
                            data: 'UplodedDate',
                            title: 'Uploded Date',
                            render: function (data) {
                                return data ? moment(data).format("DD-MM-YYYY") : '';
                            }
                        },
                        {
                            data: 'Id',
                            title: 'Action',
                            orderable: false,
                            render: function (data) {
                                return `<button class="btn btn-danger btn-sm delete-file" data-id="${data}">
                         Delete
                     </button>`;
                            }
                        }
                    ]
                });
            },
            error: function (xhr) {
                alert(xhr.responseText || "Error loading files");
            }
        });
    }

   
    $("#exportSubmit").on("click", function () {
        exportTableToExcel("#fileMaster_table", "Filemaster.xlsx");
    });

 
    $("#fileMaster_table").on("click", ".delete-file", function () {

        var id = $(this).data("id");

        if (!confirm("Are you sure you want to delete this file?")) return;

        $.ajax({
            url: "/FileMaster/DeleteFiles/" + id,
            type: "POST",
            success: function (res) {
                if (res && res.success) {
                    alert("Record deleted successfully!");
                    loadFileGrid();
                } else {
                    alert("Error deleting record!");
                }
            },
            error: function () {
                alert("Server error while deleting record");
            }
        });
    });

});
