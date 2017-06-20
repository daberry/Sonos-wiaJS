angular.module('wiaJS', ['xml', 'nvd3'])
  .config(function($httpProvider) {
    // console.log('start of config');
    $httpProvider.interceptors.push('xmlHttpInterceptor');
    // console.log('wiaJS loaded');
  });