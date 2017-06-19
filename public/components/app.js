angular.module("wiaJS")
  .controller('AppCtrl', function(zonePlayer) {
    this.zpService = zonePlayer;
    console.log(this);
    this.zpService.initZonePlayer(false, (data) => {
      var splitData = data.data.split('\n');
      var filtered = splitData.filter(function (cur) {
        if (cur.includes('PHY errors since')) {
          return true;
        } else {
          return false;
        }
      });
      console.log('filtered :: ' + filtered);
      console.log('zpService pointer: ' + this.zpService.statusUrl);
    }, '192.168.1.8');
  })
  .component("wiaApp",{
    templateUrl: 'views/wiaJS.html',
    controller: 'AppCtrl'
  });

//