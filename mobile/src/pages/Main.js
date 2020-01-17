import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
//import { View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main( { navigation } ) {
    const [ currentRegion, setCurrentRegion ] = useState( null );

    useEffect( () => {
        async function loadInitialPosition () {
            const { granted } = await requestPermissionsAsync();
            if( granted ) {
                const location = await getCurrentPositionAsync( {
                    enableHighAccuracy: true // requires GPS enabled in cell phone
                } );

                const { latitude, longitude } = location.coords;
                setCurrentRegion( {
                    latitude
                    , longitude
                    , latitudeDelta: 0.02
                    , longitudeDelta: 0.02
                } );
            }
            
        }

        loadInitialPosition();
    } );

    // don't show map until we have the location
    if( ! currentRegion ) {
        return null;
    }

    return ( 
    <MapView initialRegion={currentRegion}
                    style={styles.map} >
        <Marker coordinate={{ latitude: 37.7780959, longitude: -122.4079491 }} >
            <Image source={{ uri: 'https://avatars3.githubusercontent.com/u/19373920?v=4' }}
                    style={styles.avatar} />
            <Callout onPress={ () => {
                // navigate to profile
                navigation.navigate( 'Profile', { github_username: 'fulanodetal' } );
            }}>
                <View style={styles.callout} >
                    <Text style={styles.devName} >Fulano de Tal</Text>
                    <Text style={styles.devBio} >Someone who develops</Text>
                    <Text style={styles.devTechs} >Cobol</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>
    );
    //return <View />
}

const styles = StyleSheet.create({
    map: {
      flex: 1
    }
    , avatar: {
        width: 54
        , height: 54
        , borderRadius: 4
        , borderWidth: 4
        , borderColor: 'white'
    }
    , callout: {
        width: 260
    }
    , devName: {
        fontWeight: 'bold'
        , fontSize: 16
    }
    , devBio: {
        color: '#666'
        , marginTop: 5
    }
    , devTechs: {
        marginTop: 5
    }
  });

export default Main;