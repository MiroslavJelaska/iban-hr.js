var should = chai.should();
var oibLength = 11;

describe('ibanHr', function() {

    /* Generated IBANs using http://www.mobilefish.com/services/random_iban_generator/random_iban_generator.php */
    describe('#isValid(ibanString)', function() {
        it('#1 test of validity', function() {
            var ibanString = 'HR1210010051863000160';
            expect(ibanHr.isValid(ibanString)).to.be.true;
        });

        it('#2 test of validity', function() {
            var ibanString = 'HR1210010051863000166';
            expect(ibanHr.isValid(ibanString)).to.be.false;
        });

        it('#3 test of validity', function() {
            var ibanString = 'HR7908023056524366277';
            expect(ibanHr.isValid(ibanString)).to.be.true;
        });

        it('#4 test of validity', function() {
            var ibanString = 'HR4925424749699486786';
            expect(ibanHr.isValid(ibanString)).to.be.true;
        });

        it('#5 test of validity', function() {
            var ibanString = 'HR3715481770190187522';
            expect(ibanHr.isValid(ibanString)).to.be.true;
        });

        it('#6 test of validity', function() {
            var ibanString = 'HR4443435361069994801';
            expect(ibanHr.isValid(ibanString)).to.be.true;
        });

        it('#7 test of validity', function() {
            var ibanString = 'HR9191550122930709703';
            expect(ibanHr.isValid(ibanString)).to.be.true;
        });
    });

});