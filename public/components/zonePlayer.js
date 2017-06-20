angular.module('wiaJS')
  .controller('zpCtrl', function() {
    this.options = {
      chart: {
        type: 'lineChart',
        height: 200,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d) {
          return d.label;
        },
        y: function (d) {
          return d.value;
        },
        useInteractiveGuideline: false,
        dispatch: {},
        xAxis: {
          axisLabel: 'Time (ms)',
        },
        yAxis: {
          axisLabel: 'PhyErr',
          axisLabelDistance: 100,
        },
        yDomain: [0,2000],
        xDomain: [0,60000],
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        }
      },
    };
    //this.options = $scope.options;
    this.data = [{
      key: this.zpObject.zpName,
      values: this.zpObject.phyData
    }];
    //this.data = $scope.data;
    this.config = {
      visible: true, // default: true
      extended: false, // default: false
      disabled: false, // default: false
      refreshDataOnly: true, // default: true
      deepWatchOptions: true, // default: true
      deepWatchData: true, // default: true
      deepWatchDataDepth: 2, // default: 2
      debounce: 10 // default: 10
    };
    //this.config = $scope.config;
  })
  .component('zonePlayer', {
    bindings: {
      zpObject: '<'/*,
      zpName: '<',
      phyData: '<',
      curTime: '<',
      startTime: '<',
      zpService: '<'
      */
    },
    controller: 'zpCtrl',
    templateUrl: 'views/zonePlayer.html'
});