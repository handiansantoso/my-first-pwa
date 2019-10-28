const PROXY = 'https://cors-anywhere.herokuapp.com/';
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //devServer: {
  //  proxy: Server.URI + Server.API_KEY,
  //  },
  pwa: {
    name: 'My Weather App',
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback:'/index.html',
      runtimeCaching:[
        {
          urlPattern: new RegExp('^' + PROXY), //http://localhost:8080/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'api-cache',
            cacheableResponse:{
              statuses: [0,200]
            }
          }
        }
      ]
      // ...other Workbox options...
    },
    iconPaths: {
      favicon32: 'images/icons/icon-96x96.png',
      favicon16: 'images/icons/icon-72x72.png'
    }
  }
}