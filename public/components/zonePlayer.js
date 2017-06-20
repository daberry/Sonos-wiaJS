angular.module('wiaJS')
  .controller('zpCtrl', function() {
    console.log('test from zpCtrl');
  })
  .component('zonePlayer', {
    bindings: {
      zpName: '<',
      phyData: '<',
      curTime: '<',
      startTime: '<'
    },
    templateUrl: 'views/zonePlayer.html'
});