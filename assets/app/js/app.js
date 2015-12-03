
var CompressorView = Backbone.View.extend({
    outputFormat: "jpg",
    fileName: "compressed",
    initialize: function() {
        this.slider = this.getSlider();
        this.render();
    },
    render: function() {
        return this;
    },
    events: {
        "change #fileUploader": "uploadOriginalFile",
        "click #btn-compress": "compressImage"
    },
    getSlider: function() {
        return $('.slider-input').jRange({
            from: 1,
            to: 100,
            step: 1,
            scale: [],
            format: '%s',
            width: 'auto',
            showLabels: true,
            theme: "theme-blue"
        });
    },
    uploadOriginalFile: function(e) {
        var fileUploader = $(e.target),
            file;
        if (fileUploader[0].files && fileUploader[0].files[0]) {
            file = fileUploader[0].files[0];
            var reader = new FileReader();
            reader.onload = this.imageIsLoaded;
            reader.readAsDataURL(file);
            if (file.type == "image/png") {
                this.outputFormat = "png";
            }
            this.fileName = file.name.substring(0, file.name.length - this.outputFormat.length - 1);
            this.$(".compressed-image-container").addClass("hidden");
            this.$("#btn-compress").prop("disabled", false);
            this.$("#btn-download").addClass("disabled");
        }
    },
    compressImage: function (e) {
        var buttonDownload = this.$("#btn-download"),
            quality = this.slider.val();
        var compressed = jic.compress(document.getElementById("originalImage"), quality, this.outputFormat);
        this.$("#compressedImage").attr("src", compressed.src);
        buttonDownload.attr("href", compressed.src);
        buttonDownload.attr("download", this.fileName + "-compressed." + this.outputFormat);
        this.$(".compressed-image-container").removeClass("hidden");
        buttonDownload.removeClass("disabled");
    },
    imageIsLoaded: function(e) {
        $('#originalImage').attr('src', e.target.result);
    }
});

$(document).ready(function() {
    var compressorView = new CompressorView({
        el: '#compressor-image-container'
    });
});
