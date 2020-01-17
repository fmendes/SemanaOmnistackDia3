import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Omnistack!!!!</Text>
    </View>
  );
}

// App.js is the main file instead of index.js from React.js
// we can't use HTML here
// there are no semantic elements in ReactNative
// no attribute for classes, ids, only style
// each element has to have its own style, there is no style inheritance

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  }
  , title: {
    fontWeight: "bold"
  }
});
