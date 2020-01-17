import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
//import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content"
                backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}

//<View style={styles.container}>
//<Text style={styles.title}>Hello Omnistack!!!!</Text>
//</View>


// App.js is the main file instead of index.js from React.js
// we can't use HTML here
// there are no semantic elements in ReactNative
// no attribute for classes, ids, only style
// each element has to have its own style, there is no style inheritance
// styles don't have hyphens, use camelCase

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  }
  , title: {
    fontWeight: "bold"
    , fontSize: 32
    , color: 'white'
  }
});
