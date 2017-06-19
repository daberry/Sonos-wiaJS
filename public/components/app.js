angular.module("wiaJS")
  .controller('AppCtrl', function(zonePlayer) {
    this.zpService = zonePlayer;
    console.log(this);
    this.zpService.initZonePlayer(false, () => {}, '192.168.1.8');
  })
  .component("wiaApp",{
    templateUrl: 'views/wiaJS.html',
    controller: 'AppCtrl'
  });

//