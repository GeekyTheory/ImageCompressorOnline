$(function() {

    var outputFormat = "jpg",
        fileName = "compressed";

    var s = $('.slider-input').jRange({
        from: 1,
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
            if (this.files[0].type == "image/png") {
                outputFormat = "png";
            }
            fileName = this.files[0].name.substring(0, this.files[0].name.length - outputFormat.length);
            $("#btn-compress").prop("disabled", false);
            $("#btn-download").addClass("disabled");
        }
    });

    $("#btn-compress").click(function() {
        var compressedImage = $("#compressedImage"),
            buttonDownload = $("#btn-download"),
            quality = $('.slider-input').val();
        var compressed = jic.compress(document.getElementById("originalImage"), quality, outputFormat);
        compressedImage.attr("src", compressed.src);
        buttonDownload.attr("href", compressed.src);
        buttonDownload.attr("download", fileName + "-compressed." + outputFormat);
        $(".compressed-image-container").removeClass("hidden");
        $("#btn-download").removeClass("disabled");
    });

});

function imageIsLoaded(e) {
    $('#originalImage').attr('src', e.target.result);
}
