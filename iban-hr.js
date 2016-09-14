(function (window) {
    'use strict';

    var ibanHrLength = 21;

    /* Source: https://www.hnb.hr/temeljne-funkcije/platni-promet/vodeci-brojevi-banaka */
    var bankCodeToBankName ={
        '2500009': 'ADDIKO BANK d.d. Zagreb',
        '4133006': 'BANKA KOVANICA d.d. Varaždin',
        '2488001': 'BKS BANK d.d. Rijeka',
        '2485003': 'CROATIA BANKA d.d. Zagreb',
        '2402006': 'ERSTE & STEIERMÄRKISCHE BANK d.d. Rijeka',
        '2493003': 'HRVATSKA BANKA ZA OBNOVU I RAZVITAK Zagreb',
        '1001005': 'HRVATSKA NARODNA BANKA',
        '2390001': 'HRVATSKA POŠTANSKA BANKA d.d. Zagreb',
        '2492008': 'IMEX BANKA d.d. Split',
        '2380006': 'ISTARSKA KREDITNA BANKA UMAG d.d. Umag',
        '2411006': 'JADRANSKA BANKA d.d. Šibenik',
        '2400008': 'KARLOVAČKA BANKA d.d. Karlovac',
        '4124003': 'KENTBANK d.d. Zagreb',
        '2481000': 'KREDITNA BANKA ZAGREB d.d. Zagreb',
        '2407000': 'OTP BANKA HRVATSKA d.d. Zadar',
        '2408002': 'PARTNER BANKA d.d. Zagreb',
        '2386002': 'PODRAVSKA BANKA d.d. Koprivnica',
        '4132003': 'PRIMORSKA BANKA d.d. Rijeka',
        '2340009': 'PRIVREDNA BANKA ZAGREB d.d. Zagreb',
        '2484008': 'RAIFFEISENBANK AUSTRIA d.d. Zagreb',
        '2403009': 'SAMOBORSKA BANKA d.d. Samobor',
        '2503007': 'SBERBANK d.d. Zagreb',
        '2412009': 'SLATINSKA BANKA d.d. Slatina',
        '2330003': 'SOCIETE GENERALE- SPLITSKA BANKA d.d. Split',
        '2483005': 'ŠTEDBANKA d.d. Zagreb',
        '6717002': 'TESLA ŠTEDNA BANKA d.d. Zagreb',
        '2489004': 'VABA d.d. BANKA  Varaždin',
        '2381009': 'VENETO BANKA d.d.. Zagreb',
        '2360000': 'ZAGREBAČKA BANKA d.d. Zagreb'
    };

    function isValid(ibanString) {
        var iban = cleanIbanString(ibanString),
            code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
            digits;

        if (!code || iban.length !== ibanHrLength) {
            return false;
        }

        digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
            return letter.charCodeAt(0) - 55;
        });

        return mod97(digits) === 1;
    }
    function mod97(digits) {
        var checksum = digits.slice(0, 2), fragment;
        for (var offset = 2; offset < digits.length; offset += 7) {
            fragment = String(checksum) + digits.substring(offset, offset + 7);
            checksum = parseInt(fragment, 10) % 97;
        }
        return checksum;
    }

    function getDetails(ibanString) {
        var code = cleanIbanString(ibanString).match(/^([A-Z]{2})(\d{2})([A-Z\d]{7})([A-Z\d]{10})$/);
         /* Mmatch and capture
            (1) the country code,
            (2) the check digits,
            (3) the bank code, and
            (4) the account  number */
        return {
            countryCode:   code[1],
            checkDigits:   code[2],
            bankCode:      code[3],
            accountNumber: code[4],
            bankName:      bankCodeToBankName[code[3]]
        };
    }
    
    function cleanIbanString(ibanString) {
        return String(ibanString).toUpperCase().replace(/[^A-Z0-9]/g, '');
    }


    window.ibanHr = {
        isValid: isValid,
        getDetails: getDetails
    };
})(window);