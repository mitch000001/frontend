define([
    'i18next'
  ], function(I18n) {
    'use strict';

    I18n.init({
      interpolationPrefix: '%{',
      interpolationSuffix: '}',
      resGetPath: 'locales/%{lng}.json',
      lng: 'de',
      preload: ['de'],
      fallbackLng: 'de',
    });

    return I18n;
  });