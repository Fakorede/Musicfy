module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  pwa: {
    name: 'Musicfy',
    themeColor: '#ff5e3a',
    manifestOptions: {
      short_name: 'Musicfy',
    },
  },
}
