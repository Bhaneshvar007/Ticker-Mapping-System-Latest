$(document).ready(function () {
    $('.client-loader').css('display', 'flex');
    $('.client-loader').hide();
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    $('#client_UPLOAD_FROM_DATE').val(today.toISOString().split('T')[0]);

   
    $('#client_xlFile').on('change', function () {

        let files = this.files;

        if (!files || files.length === 0) {
            return;
        }

        $('#client_selected_file').text(files[0].name);
        $('#client_file_name').text(files[0].name + ' is the selected file.');

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("xlFile", files[i]);
        }

        $.ajax({
            url: "/clientupload/Upload",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                console.log("Client file uploaded successfully");
            },
            error: function (xhr, status, error) {
                //console.log("Status:", status);
                //console.log("Error:", error);
                //console.log("Response:", xhr.responseText);
                alert("Upload failed: " + xhr.responseText);
            }
        });
    });

  
    $('#client_btnUpload').on('click', function () {

        let fromDate = $('#client_UPLOAD_FROM_DATE').val();
        let fileInput = $('#client_xlFile')[0];

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please Select File");
            return;
        }

        $('.client-loader').show();

        $.ajax({
            url: "/clientupload/GetUploadFile",
            type: "POST",
            data: JSON.stringify({
                FROM_DATE: new Date(fromDate).toJSON(),
                xlFile: fileInput.files[0].name
            }),
            contentType: "application/json",
            success: function (msg) {

                alert(msg);

                if (!msg.startsWith("Error")) {
                    window.location.href = window.location.origin + "/clientupload";
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            },
            complete: function () {
                $('.client-loader').hide();
            }
        });
    });

});
