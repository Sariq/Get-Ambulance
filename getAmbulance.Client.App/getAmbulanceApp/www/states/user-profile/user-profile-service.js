

angular.module('starter.controllers').service('UserProfileService', function ($rootScope,$q, $http, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    

    self.setUserProfileLocal = function (userProfile) {
        localStorageService.set('UserProfile', userProfile);
    }
    self.getUserProfileLocal = function () {
        return localStorageService.get('UserProfile');
    }
    
    self.updateUserProfile = function (data) {
        return $http.post(serviceBase + 'api/Client/UpdateUserProfile', data);
    }

    self.getUserProfileFromServer = function (userName) {
        var deferred = $q.defer();
        var data = {
            userName: userName
        }
        $http.post(serviceBase + 'api/Client/GetUserProfile', data).success(function (res) {

            self.setUserProfileLocal(res);
            $rootScope.$broadcast('user-profile-updated');
            deferred.resolve(res);
        });
        return deferred.promise;
    }
    self.RefreshUserProfile = function (data) {
        var userProfile = self.getUserProfileLocal();
        self.getUserProfileFromServer(userProfile.User_Name);
    }
    


  
})


