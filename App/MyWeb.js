import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Alert, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

class MyWeb extends Component {
  state = {
    loading: true,
    isConnected: true,
  };

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        this.setState({ isConnected: false });
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      } else {
        this.setState({ isConnected: true });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleLoadEnd = () => {
    this.setState({ loading: false });
  };

  render() {
    const { loading, isConnected } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {isConnected ? (
          <>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <WebView 
              source={{ uri: 'https://cloud-upload.netlify.app/' }}
              onLoadEnd={this.handleLoadEnd}
              style={{ flex: 1 }}
            />
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default MyWeb;