$(".tab-wizard").steps({
    headerTag: "h6"
    , bodyTag: "section"
    , transitionEffect: "none"
    , titleTemplate: '#title#'
    , labels: {
        finish: "Submit"
    }
    , onFinished: function () {
        swal({
            title: "Your request has been submitted!",
            text: "You will be contacted by the travel administrator with corrections or approval. Do not make non-refundable travel arrangements until you receive official approval to proceed.",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#7367F0",
            confirmButtonText: "OK",
            closeOnConfirm: true
        });

    }
});


var form = $(".validation-wizard").show();
var approvalForm = $('.validation-wizard-approval').show();

$(".validation-wizard").steps({
    headerTag: "h6"
    , bodyTag: "section"
    , transitionEffect: "none"
    , titleTemplate: '#title#'
    , labels: {
        finish: "Submit"
    }
    , onStepChanging: function (event, currentIndex, newIndex) {
        return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
    }
    , onFinishing: function () {
        return form.validate().settings.ignore = ":disabled", form.valid()
    }
    , onFinished: function () {
        //console.log('test',JSON.parse(form.serialize()))
        $.ajax({
            type: 'POST',
            url: form[0].action,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: form.serialize(),
            success: function () {
                swal({
                    title: "Your request has been submitted!",
                    text: "You will be contacted by the travel administrator with corrections or approval. Do not make non-refundable travel arrangements until you receive official approval to proceed.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#7367F0",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = "/request/list"
                });
            },
            error: function () {
                swal({
                    title: "Your request has been not submitted!",
                    text: "Please try after some time or contact to your admin",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                });
            }
        })

    }
}), $(".validation-wizard").validate({
    ignore: "input[type=hidden]"
    , errorClass: "text-danger"
    , successClass: "text-success"
    , highlight: function (element, errorClass) {
        $(element).removeClass(errorClass)
    }
    , unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass)
    }
    , errorPlacement: function (error, element) {
        error.insertAfter(element)
    }
    , rules: {
        email: {
            email: !0
        }
    }
})


$(".validation-wizard-approval").steps({
    headerTag: "h6"
    , bodyTag: "section"
    , transitionEffect: "none"
    , titleTemplate: '#title#'
    , labels: {
        finish: "Approve"
    }
    , onStepChanging: function (event, currentIndex, newIndex) {
        return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), approvalForm.find(".body:eq(" + newIndex + ") .error").removeClass("error")), approvalForm.validate().settings.ignore = ":disabled,:hidden", approvalForm.valid())
    }
    , onFinishing: function () {
        return approvalForm.validate().settings.ignore = ":disabled", approvalForm.valid()
    }
    , onFinished: function () {
        $.ajax({
            type: 'POST',
            url: approvalForm[0].action,
            data: approvalForm.serialize(),
            success: function () {
                swal({
                    title: "Your request has been approved!",
                    text: "You will be contacted by the travel administrator with corrections or approval. Do not make non-refundable travel arrangements until you receive official approval to proceed.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#7367F0",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                }, function () {
                    window.location.href = "/request/list"
                });
            },
            error: function (err) {
                swal({
                    title: "Your request has been not approved!",
                    text: "Please try after some time or contact to your admin",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                });
            }
        })

    }
}), $(".validation-wizard").validate({
    ignore: "input[type=hidden]"
    , errorClass: "text-danger"
    , successClass: "text-success"
    , highlight: function (element, errorClass) {
        $(element).removeClass(errorClass)
    }
    , unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass)
    }
    , errorPlacement: function (error, element) {
        error.insertAfter(element)
    }
    , rules: {
        email: {
            email: !0
        }
    }
})
