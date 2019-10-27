const Server ={
  API_KEY : '4708677713bf2fc70d94e2badeb41f0d',
  URI: 'https://api.darksky.net/forecast/'
};
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: Server.URI + Server.API_KEY,
    },
  pwa: {
    
  }
}