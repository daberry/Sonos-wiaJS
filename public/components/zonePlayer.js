angular.module('wiaJS')
  .controller('zpCtrl', function() {
    if (this.zpObject.ip !== '192.168.1.8') {
      //setInterval(this.zpService.fetchPhyErr.bind(this.ZPObject, function () {}), 2000);
    } else {
      console.log('zp object ip is 192.168.1.8');
    }


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
        /*
         dispatch: {
         stateChange: function (e) {
         console.log("stateChange");
         },
         changeState: function (e) {
         console.log("changeState");
         },
         tooltipShow: function (e) {
         console.log("tooltipShow");
         },
         tooltipHide: function (e) {
         console.log("tooltipHide");
         }

         },
         */
        xAxis: {
          axisLabel: 'Time (ms)',
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          axisLabelDistance: 100,
        },
        yDomain: [0,10000],
        xDomain: [0,60000],
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        }
      },
      caption: {
        enable: true,
        html: '<b>Figure 1.</b>',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      }
    };
    //this.options = $scope.options;
    this.data = [{
      key: this.zpService.zpName,
      values: this.zpService.phyData
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
      zpObject: '=',
      zpName: '<',
      phyData: '<',
      curTime: '<',
      startTime: '<',
      zpService: '='
    },
    controller: 'zpCtrl',
    templateUrl: 'views/zonePlayer.html'
});