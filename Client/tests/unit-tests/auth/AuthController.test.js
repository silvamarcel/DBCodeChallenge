describe('AuthCtrl', function() {

    var defferedLogin;
    var defferedLogout;
    var authCtrl;
    var AuthenticationMock;
    var StateMock;
    var MessageServiceMock;
    var credentials = {
        email: 'email',
        password: 'password'
    };
    var user = {
        name: 'name',
        email: 'email',
        password: 'password'
    };

    // Load the Auth Module
    beforeEach(module('auth.module'));

    // load the controller's module
    beforeEach(inject(function(_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        defferedLogin = $q.defer();
        defferedLogout = $q.defer();
        defferedSignup = $q.defer();

        //Mocks
        AuthenticationMock = {
            getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(user),
            signin: jasmine.createSpy('signin').and.returnValue(defferedLogin.promise),
            signout: jasmine.createSpy('signout').and.returnValue(defferedLogout.promise),
            signup: jasmine.createSpy('signup').and.returnValue(defferedSignup.promise),
        };
        StateMock = {
            go: jasmine.createSpy('go')
        };
        MessageServiceMock = {
            throwError: jasmine.createSpy('throwError'),
            success: jasmine.createSpy('success')
        };

        // instantiate AuthCtrl
        authCtrl = $controller('AuthCtrl', {
            $rootScope: $rootScope,
            $state: StateMock,
            'Authentication': AuthenticationMock,
            'MessageService': MessageServiceMock
        });
    }));

    describe('#login', function() {
        beforeEach(function() {
            authCtrl.credentials = credentials;
            authCtrl.login();
        });
        it('should call AuthenticationMock signin', function() {
            expect(AuthenticationMock.signin).toHaveBeenCalledWith(credentials);
        });

        describe('is executed', function() {
            it('if successful, should go to restaurants page', function() {
                defferedLogin.resolve();
                $rootScope.$digest();
                expect(AuthenticationMock.getCurrentUser).toHaveBeenCalled();
                expect(StateMock.go).toHaveBeenCalledWith('tab.restaurants');
            });

            it('if unsuccessful, should call throwError from MessageService and go to login page', function() {
                defferedLogin.reject({data: 'Error message'});
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith('Error message');
                expect(StateMock.go).toHaveBeenCalledWith('login');
            });
        });
    });

    describe('#logout', function() {
        beforeEach(function() {
            authCtrl.logout();
        });
        it('should call AuthenticationMock signout', function() {
            expect(AuthenticationMock.signout).toHaveBeenCalled();
        });

        describe('is executed', function() {
            it('if successful, should go to login page', function() {
                defferedLogout.resolve();
                $rootScope.$digest();
                expect(StateMock.go).toHaveBeenCalledWith('login');
            });

            it('if unsuccessful, should call throwError from MessageService and go to login page', function() {
                defferedLogout.reject({data: 'Error message'});
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith('Error message');
                expect(StateMock.go).toHaveBeenCalledWith('login');
            });
        });
    });

    describe('#signup', function() {
        beforeEach(function() {
            authCtrl.user = user;
            authCtrl.signup();
        });
        it('should call AuthenticationMock signup', function() {
            expect(AuthenticationMock.signup).toHaveBeenCalledWith(user);
        });

        describe('is executed', function() {
            it('if successful, should go to login page', function() {
                defferedSignup.resolve();
                $rootScope.$digest();
                expect(MessageServiceMock.success).toHaveBeenCalled();
                expect(AuthenticationMock.getCurrentUser).toHaveBeenCalled();
                expect(StateMock.go).toHaveBeenCalledWith('tab.restaurants');
            });

            it('if unsuccessful, should call throwError from MessageService and go to login page', function() {
                defferedSignup.reject({data: 'Error message'});
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith('Error message');
                expect(StateMock.go).toHaveBeenCalledWith('login');
            });
        });
    });
});
