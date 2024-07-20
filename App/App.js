import React from 'react';
import { AppRegistry } from 'react-native';
import MyWeb from './MyWeb.js';
import { name as appName } from './app.json';

const App = () => {
  return <MyWeb />;
};

AppRegistry.registerComponent(appName, () => App);

export default App;