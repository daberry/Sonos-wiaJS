angular.module('wiaJS')
  .factory('Sonos', function($http, $window) {
    this.x2js = new X2JS();
    this.phyData = [];
    this.otherZPs = {ips: []};
    this.curTime = 0;
    this.startTime = 0;
    this.zpName = '';
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
          this.url = 'http://192.168.1.8:1400/status/proc/ath_rincon/status';
        }
      }
      this.fetchPhyErr.bind(this, function() {});
      $http.get(this.statusUrl + '/zp')
        .then((resultPrev) => {
          this.zpName = resultPrev.data.ZPSupportInfo.ZPInfo.ZoneName;
          if (useInterval) {
            this.phyErrGrabber = setInterval(this.fetchPhyErr.bind(this, function() {}), 2000);
          }
          callback();
        })
        .catch(function (data) {
          console.error(data);
        });
      this.grabXMLfromZP('/topology', (result) => {
        result.ZonePlayers.ZonePlayer.map((cur) => {
          var curIp = cur._location.match(/\/\/(.+):1400/)[1];
          var curUrl = 'http://' + curIp + ':1400/status/proc/ath_rincon/status'
          this.otherZPs[curIp] = {ip: curIp,
                                  name: cur.__text,
                                  url: curUrl};
          this.otherZPs.ips.push(curIp);
        });
      });
    };
    this.grabXMLfromZP = (urlSuffix, cb) => {
      $http.get(this.statusUrl + urlSuffix)
        .then((fetchedResult) => {
        cb(fetchedResult.data.ZPSupportInfo);
        })
      .catch(function (data) {
          console.error(data);
        });
    }
    this.fetchPhyErr = (cb) => {
      $http.get(this.url)
        .then((result) => {
          var splitData = result.data.ZPSupportInfo.File.__text.split('\n');
          var filtered = splitData.filter(function (cur) {
            return cur.includes('PHY errors since');
          }).join('');
          this.phyErrSinceLastRead = Math.round(Number.parseInt(filtered.match(/[0-9]/g).join('')) / 4);
          if (this.startTime === 0) {
            this.startTime = Date.parse(new Date());
          }
          this.timeOfLastRead = Date.parse(new Date());
          this.phyData.push({value: this.phyErrSinceLastRead, label: (this.timeOfLastRead - this.startTime)});
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