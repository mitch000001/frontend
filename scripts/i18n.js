define([
    'i18next'
  ], function(I18n) {
    'use strict';
    var baseUrl = require.toUrl('.')

    I18n.init({
      interpolationPrefix: '%{',
      interpolationSuffix: '}',
      resGetPath: baseUrl + './locales/%{lng}.json',
      lng: 'de',
      preload: ['de'],
      fallbackLng: 'de',
    });

    return I18n;
  });