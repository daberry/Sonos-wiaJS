angular.module('wiaJS', ['xml'])
  .config(function($httpProvider) {
    console.log('start of config');
    $httpProvider.interceptors.push('xmlHttpInterceptor');
    console.log('wiaJS loaded');
  });