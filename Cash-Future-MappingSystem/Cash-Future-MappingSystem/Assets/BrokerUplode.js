$(document).ready(function () {
    $('.Broker-loader').css('display', 'flex');
    $('.Broker-loader').hide();

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    $('#Broker_UPLOAD_FROM_DATE').val(today.toISOString().split('T')[0]);


    $('#Broker_xlFile').on('change', function () {

        let files = this.files;

        if (!files || files.length === 0) {
            return;
        }

        $('#Broker_selected_file').text(files[0].name);
        $('#Broker_file_name').text(files[0].name + ' is the selected file.');

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("xlFile", files[i]);
        }

        $.ajax({
            url: "/ConfirmationBroker/Upload",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                console.log("Broker file uploaded successfully");
            },
            error: function (xhr, status, error) {
                //console.log("Status:", status);
                //console.log("Error:", error);
                //console.log("Response:", xhr.responseText);
                alert("Upload failed: " + xhr.responseText);
            }
        });
    });


    $('#Broker_btnUpload').on('click', function () {

        let fromDate = $('#Broker_UPLOAD_FROM_DATE').val();
        let fileInput = $('#Broker_xlFile')[0];

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please Select File");
            return;
        }

        $('.Broker-loader').show();

        $.ajax({
            url: "/ConfirmationBroker/GetUploadFile",
            type: "POST",
            data: JSON.stringify({
                FROM_DATE: new Date(fromDate).toJSON(),
                xlFile: fileInput.files[0].name
            }),
            contentType: "application/json",
            success: function (msg) {

                alert(msg);

                if (!msg.startsWith("Error")) {
                    window.location.href = window.location.origin + "/ConfirmationBroker";
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            },
            complete: function () {
                $('.Broker-loader').hide();
            }
        });
    });

});
