angular.module('wiaJS')
  .factory('zonePlayer', function($http, $window) {
    this.initZonePlayer = (useLocal, callback, ipString) => {
      console.log('initzoneplayer this=',this);
      this.url = '';
      if (useLocal) {
        this.url = 'assets/Sonos Support Info.xml';
      } else {
        if (ipString) {
          console.log('truthy IPString');
          this.statusUrl = 'http://' + ipString + ':1400/status';
          this.url = this.statusUrl + '/proc/ath_rincon/status'
        } else {
          console.log('falsy IPString');
          this.url = 'http://192.168.1.8:1400/status/proc/ath_rincon/status';
        }
      }
      $http.get(this.url)
        .then(function (data) {
          if (callback) {
            callback(data);
          }
        })
        .catch(function (data) {
          console.error(data);
        });
    };
    this.grabZPInfo = (cb) => {
      console.log('test grabZPInfo: ' + this);
    }
    return this;
  });