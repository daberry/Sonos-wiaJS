angular.module('wiaJS')
  .factory('zonePlayer', function($http, $window) {
    this.x2js = new X2JS();
    this.phyData = [];
    this.initZonePlayer = (useLocal, callback, ipString, useInterval) => {
      this.url = '';
      //url initialization logic
      if (useLocal) {
        this.url = 'assets/Sonos Support Info.xml';
      } else {
        if (ipString) {
          this.statusUrl = 'http://' + ipString + ':1400/status';
          this.url = this.statusUrl + '/proc/ath_rincon/status'
        } else {
          // console.log('falsy IPString');
          this.url = 'http://192.168.1.8:1400/status/proc/ath_rincon/status';
        }
      }
      this.fetchPhyErr(function() {});
      $http.get(this.statusUrl + '/zp')
        .then((resultPrev) => {
          //console.log('data from previous: ' + JSON.stringify());
          this.zpName = resultPrev.data.ZPSupportInfo.ZPInfo.ZoneName;
          if (useInterval) {
            this.phyErrGrabber = setInterval(this.fetchPhyErr, 2000);
          }
          callback();
        })
        .catch(function (data) {
          console.error(data);
        });
    };

    this.fetchPhyErr = (cb) => {
      $http.get(this.url)
        .then((result) => {
          var splitData = result.data.ZPSupportInfo.File.__text.split('\n');
          var filtered = splitData.filter(function (cur) {
            return cur.includes('PHY errors since');
          }).join('');
          this.phyErrSinceLastRead = filtered.match(/[0-9]/g).join('');
          this.timeOfLastRead = Date.parse(new Date());
          this.phyData.push({value: this.phyErrSinceLastRead, label: this.timeOfLastRead});
          if (cb) {
            cb();
          }
        })
        .catch(function (data) {
            console.error(data);
          });
    }
    return this;
  });