import React from 'react';
//import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile( { navigation } ) {
    const githubUsername = navigation.getParam( 'github_username' );

    return <WebView source={{ uri: `https://github.com/${githubUsername}` }}
                    style={styles.webview} />
}

const styles = StyleSheet.create({
    webview: {
      flex: 1
    }
} );

export default Profile;