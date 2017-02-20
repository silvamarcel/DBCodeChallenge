describe('AuthCtrl', function() {

    var defferedLogin;
    var defferedLogout;
    var authCtrl;
    var ApiServiceMock;
    var StateMock;
    var MessageServiceMock;
    var user = {
        username: 'username',
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

        //Mocks
        ApiServiceMock = {
            post: jasmine.createSpy('post').and.returnValue(defferedLogin.promise),
            get: jasmine.createSpy('get').and.returnValue(defferedLogout.promise)
        };
        StateMock = {
            go: jasmine.createSpy('go')
        };
        MessageServiceMock = {
            throwError: jasmine.createSpy('throwError')
        };

        // instantiate AuthCtrl
        authCtrl = $controller('AuthCtrl', {
            $state: StateMock,
            'ApiService': ApiServiceMock,
            'MessageService': MessageServiceMock
        });
    }));

    describe('#login', function() {
        beforeEach(function() {
            authCtrl.user = user;
            authCtrl.login();
        });
        it('should call ApiService post', function() {
            expect(ApiServiceMock.post).toHaveBeenCalledWith('/auth/login', user);
        });

        describe('is executed', function() {
            it('if successful, should go to restaurants page', function() {
                defferedLogin.resolve();
                $rootScope.$digest();
                expect(StateMock.go).toHaveBeenCalledWith('restaurants');
            });

            it('if unsuccessful, should call throwError from MessageService and go to login page', function() {
                defferedLogin.reject('Error message');
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
        it('should call ApiService post', function() {
            expect(ApiServiceMock.get).toHaveBeenCalledWith('/auth/logout');
        });

        describe('is executed', function() {
            it('if successful, should go to login page', function() {
                defferedLogout.resolve();
                $rootScope.$digest();
                expect(StateMock.go).toHaveBeenCalledWith('login');
            });

            it('if unsuccessful, should call throwError from MessageService and go to login page', function() {
                defferedLogout.reject('Error message');
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith('Error message');
                expect(StateMock.go).toHaveBeenCalledWith('login');
            });
        });
    });
});
