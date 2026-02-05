// For Equity Holdings

$(document).ready(function () {

    $('.EquityHoldings-loader').css('display', 'flex');
    $('.EquityHoldings-loader').hide();

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    $('#EquityHoldings_UPLOAD_FROM_DATE').val(today.toISOString().split('T')[0]);


    $('#EquityHoldings_xlFile').on('change', function () {

        let files = this.files;

        if (!files || files.length === 0) {
            return;
        }

        $('#EquityHoldings_selected_file').text(files[0].name);
        $('#EquityHoldings_file_name').text(files[0].name + ' is the selected file.');

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("xlFile", files[i]);
        }

        $.ajax({
            url: "/OpeningHoldings/EquityHoldings_UploadFile",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                console.log("EquityHoldings file loaded successfully");
            },
            error: function (xhr, status, error) {
                //console.log("Status:", status);
                //console.log("Error:", error);
                //console.log("Response:", xhr.responseText);
                alert("Upload failed: " + xhr.responseText);
            }
        });
    });


    $('#EquityHoldings_btnUpload').on('click', function () {

        let fromDate = $('#EquityHoldings_UPLOAD_FROM_DATE').val();
        let fileInput = $('#EquityHoldings_xlFile')[0];

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please Select File");
            return;
        }

        $('.EquityHoldings-loader').show();
     
        $.ajax({
            url: "/OpeningHoldings/GetUploadEquityFile",
            type: "POST",
            data: JSON.stringify({
                FROM_DATE: new Date(fromDate).toJSON(),
                xlFile: fileInput.files[0].name
            }),
            contentType: "application/json",
            success: function (msg) {

                alert(msg);

                if (!msg.startsWith("Error")) {
                    window.location.href = window.location.origin + "/OpeningHoldings/EquityHoldingsUpload";
                }
            },
            error: function (xhr) {
                alert("Error While Uploding the files !!");
            },
            complete: function () {
                $('.EquityHoldings-loader').hide();
            }
        });
    });

});




// For Future Holdings

$(document).ready(function () {
    $('.FutureHoldings-loader').css('display', 'flex');
    $('.FutureHoldings-loader').hide();

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    $('#FutureHoldings_UPLOAD_FROM_DATE').val(today.toISOString().split('T')[0]);


    $('#FutureHoldings_xlFile').on('change', function () {

        let files = this.files;

        if (!files || files.length === 0) {
            return;
        }

        $('#FutureHoldings_selected_file').text(files[0].name);
        $('#FutureHoldings_file_name').text(files[0].name + ' is the selected file.');

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("xlFile", files[i]);
        }

        $.ajax({
            url: "/OpeningHoldings/FutureHoldings_UploadFile",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                console.log("FutureHoldings file loaded successfully");
            },
            error: function (xhr, status, error) {
                //console.log("Status:", status);
                //console.log("Error:", error);
                //console.log("Response:", xhr.responseText);
                alert("Upload failed: " + xhr.responseText);
            }
        });
    });


    $('#FutureHoldings_btnUpload').on('click', function () {

        let fromDate = $('#FutureHoldings_UPLOAD_FROM_DATE').val();
        let fileInput = $('#FutureHoldings_xlFile')[0];

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please Select File");
            return;
        }

        $('.FutureHoldings-loader').show();

        $.ajax({
            url: "/OpeningHoldings/GetFutureUploadFile",
            type: "POST",
            data: JSON.stringify({
                FROM_DATE: new Date(fromDate).toJSON(),
                xlFile: fileInput.files[0].name
            }),
            contentType: "application/json",
            success: function (msg) {

                alert(msg);

                if (!msg.startsWith("Error")) {
                    window.location.href = window.location.origin + "/OpeningHoldings/FutureHoldingsUpload";
                }
            },
            error: function (xhr) {
                //alert(xhr.responseText);
                alert("Error While Uploding the files !!");
            },
            complete: function () {
                $('.FutureHoldings-loader').hide();
            }
        });
    });

});
