$(function() {

    var s = $('.slider-input').jRange({
        from: 0,
        to: 100,
        step: 1,
        scale: [],
        format: '%s',
        width: 'auto',
        showLabels: true,
        theme: "theme-blue"
    });

    $(":file").change(function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            $("#btn-compress").prop("disabled", false);
            $("#btn-download").addClass("disabled");
        }
    });

    $("#btn-compress").click(function() {
        var compressedImage = $("#compressedImage"),
            buttonDownload = $("#btn-download"),
            quality = $('.slider-input').val(),
            outputFormat = 'jpg';
        var compressed = jic.compress(document.getElementById("originalImage"), quality, outputFormat);
        compressedImage.attr("src", compressed.src);
        buttonDownload.attr("href", compressed.src);
        buttonDownload.attr("download", "compressed.jpg");
        $(".compressed-image-container").removeClass("hidden");
        $("#btn-download").removeClass("disabled");
    });

});

function imageIsLoaded(e) {
    $('#originalImage').attr('src', e.target.result);
}
