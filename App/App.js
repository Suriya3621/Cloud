import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
const App = () => {
  return <WebView source={{ uri: 'https://cloud-upload.netlify.app/' }} style={{ flex: 1 }} />;
}

export default App;