var compute = function () {
    // Get data
    var bank = $('#bank').val();
    var office = $('#office').val();
    var check = $('#check').val();
    var account = $('#account').val();

    // Continue if data is complete
    if (bank.length == 4 && office.length == 4 && check.length == 2 && account.length == 10) {

        // Build data for IBAN calculation
        var countryCode = 'ES';
        var bankCode = bank + office;
        var accountNumber = check + account;

        // Generate IBAN
        IBAN.generate(countryCode, bankCode, accountNumber)
            .success(function (iban) {
                // Display IBAN
                $('#iban > .text').text(iban.iban);
                $('#iban-formatted > .text').text(iban.iban_print);
            })
            .error(function (error) {
                // Do nothing on error (be smart, users!)
            });
    } else {
        $('#iban > .text').text('-');
        $('#iban-formatted > .text').text('-');
    }
};

$('#bank, #office, #check, #account').on('keyup', compute);

$('#bank').on('keyup', function () {
    if ($('#bank').val().length == 4) {
        $('#office').trigger('touchstart');
    }
});
$('#office').on('keyup', function () {
    if ($('#office').val().length == 4) {
        $('#check').trigger('touchstart');
    }
});
$('#check').on('keyup', function () {
    if ($('#check').val().length == 2) {
        $('#account').trigger('touchstart');
    }
});
$('#office, #check, #account').on('touchstart', function () {
    $(this).focus();
});

// Compute value on load, if needed
$(compute);