angular.module("wiaJS")
  .controller('AppCtrl', function($scope, zonePlayer) {
    this.zpService = zonePlayer;
    console.log(this);
    this.zpService.initZonePlayer(false, () => {}, '192.168.1.8', true);
    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 450,
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
        useInteractiveGuideline: true,
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
        xAxis: {
          axisLabel: 'Time (ms)',
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          axisLabelDistance: 100,
        },
        yDomain: [0,4000],
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        }
      },
      title: {
        enable: true,
        text: 'Title for Line Chart'
      },
      subtitle: {
        enable: true,
        text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      },
      caption: {
        enable: true,
        html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        css: {
          'text-align': 'justify',
          'margin': '10px 13px 0px 7px'
        }
      }
    };
    this.options = $scope.options;
    $scope.data = [{
      key: "Cumulative Return",
      /*values: [
        { "label" : "A" , "value" : -29.765957771107 },
        { "label" : "B" , "value" : 0 },
        { "label" : "C" , "value" : 32.807804682612 },
        { "label" : "D" , "value" : 196.45946739256 },
        { "label" : "E" , "value" : 0.19434030906893 },
        { "label" : "F" , "value" : -98.079782601442 },
        { "label" : "G" , "value" : -13.925743130903 },
        { "label" : "H" , "value" : -5.1387322875705 }
      ]
      */
      values: this.zpService.phyData
    }];
    $scope.config = {
      visible: true, // default: true
      extended: false, // default: false
      disabled: false, // default: false
      refreshDataOnly: true, // default: true
      deepWatchOptions: true, // default: true
      deepWatchData: true, // default: true
      deepWatchDataDepth: 2, // default: 2
      debounce: 10 // default: 10
    };
  })
  .component("wiaApp",{
    templateUrl: 'views/wiaJS.html',
    controller: 'AppCtrl'
  });

//