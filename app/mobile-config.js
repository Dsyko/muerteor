//App.info({
//  name: 'Muerteor',
//  description: "A Deadman's Switch",
//  author: 'David Sykora',
//  email: 'dsykora@gmail.com',
//  website: 'https://muerteor.meteor.com',
//  version: '0.0.1'
//});

App.icons({
  // iOS
  'iphone': 'resources/icons/icon-60.png',
  'iphone_2x': 'resources/icons/icon-60@2x.png',
  'iphone_3x': 'resources/icons/icon-60@3x.png',
  'ipad': 'resources/icons/icon-72.png',
  'ipad_2x': 'resources/icons/icon-72@2x.png',
});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/Default~iphone.png',
  'iphone_2x': 'resources/splash/Default@2x~iphone.png',
  'iphone5': 'resources/splash/Default-568h@2x~iphone.png',
  'iphone6': 'resources/splash/Default-667h.png',
  'ipad_portrait': 'resources/splash/Default-Portrait~ipad.png',
  'ipad_portrait_2x': 'resources/splash/Default-Portrait@2x~ipad.png',
  'ipad_landscape': 'resources/splash/Default-Landscape~ipad.png',
  'ipad_landscape_2x': 'resources/splash/Default-Landscape@2x~ipad.png',
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');

