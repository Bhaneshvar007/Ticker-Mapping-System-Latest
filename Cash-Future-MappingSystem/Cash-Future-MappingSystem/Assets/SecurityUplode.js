$(document).ready(function () {
    $('.Security-loader').css('display', 'flex');
    $('.Security-loader').hide();

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    $('#Security_UPLOAD_FROM_DATE').val(today.toISOString().split('T')[0]);


    $('#Security_xlFile').on('change', function () {

        let files = this.files;

        if (!files || files.length === 0) {
            return;
        }

        $('#Security_selected_file').text(files[0].name);
        $('#Security_file_name').text(files[0].name + ' is the selected file.');

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("xlFile", files[i]);
        }

        $.ajax({
            url: "/SecurityMaster/Upload",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                console.log("Security file uploaded successfully");
            },
            error: function (xhr, status, error) {
                //console.log("Status:", status);
                //console.log("Error:", error);
                //console.log("Response:", xhr.responseText);
                alert("Upload failed: " + xhr.responseText);
            }
        });
    });


    $('#Security_btnUpload').on('click', function () {

        let fromDate = $('#Security_UPLOAD_FROM_DATE').val();
        let fileInput = $('#Security_xlFile')[0];

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please Select File");
            return;
        }

        $('.Security-loader').show();

        $.ajax({
            url: "/SecurityMaster/GetUploadFile",
            type: "POST",
            data: JSON.stringify({
                FROM_DATE: new Date(fromDate).toJSON(),
                xlFile: fileInput.files[0].name
            }),
            contentType: "application/json",
            success: function (msg) {

                alert(msg);

                if (!msg.startsWith("Error")) {
                    window.location.href = window.location.origin + "/SecurityMaster/UploadSecuritymaster";
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            },
            complete: function () {
                $('.Security-loader').hide();
            }
        });
    });

});
