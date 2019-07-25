$('#button').click(function () {
    var fullName = $('#fullName').val()
    var email = $('#email').val()
    var phoneNumber = $('#phoneNumber').val()
    var message = $('#message').val()

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    toastr.options.closeButton = true;
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
    toastr.options.timeOut = 2000;
    toastr.options.extendedTimeOut = 1000;

    if (fullName == "") {
        toastr.error('Molimo Vas da unesete Vaše ime.')
    } else if (email == "") {
        toastr.error("Molimo Vas da unesete Vašu E-mail adresu.")
    } else if (!validateEmail(email)) {
        toastr.warning("Molimo Vas da unesete ispravnu E-mail adresu.")
    }

     else if (message == "") {
        toastr.error("Molimo Vas da uensete Vašu poruku.")
    } else {
        $.ajax({
            url: "./emailSend/sendEmail.php?task=message&fullName=" + fullName + "&email=" + email + "&phoneNumber=" + phoneNumber + "&message=" + message,
            success: function (data) {
                if (data == 'sent') {
                    toastr.success("Vaša poruka je uspješno poslana. Hvala!")
                } else {
                    toastr.error("Došlo je do greške, molimo Vas da pokušate kasnije")
                }
            },
            error: function (data, err) {
                toastr.error("Došlo je do greške, molimo Vas da pokušate kasnije!")
            }
        });
    }
})
