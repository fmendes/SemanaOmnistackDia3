import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View
    , Text, TouchableOpacity, Keyboard } from 'react-native';
//import { View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

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
    <>
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
    <View style={styles.searchForm} >
        <TextInput style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    />
        <TouchableOpacity onPress={ () => {

        } }
                    style={styles.loadButton} >
            <MaterialIcons name="my-location"
                            size={20}
                            color="white" />
        </TouchableOpacity>
                        
    </View>
    </>
    );
    //return <View />
}

// TODO:  use Keyboard api to detect keyboard and move search input up

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
    , searchForm: {
        position: 'absolute'
        , bottom: 20
        , left: 20
        , right: 20
        , zIndex: 5
        , flexDirection: 'row'
    }
    , searchInput: {
        flex: 1
        , height: 50
        , backgroundColor: 'white'
        , color: "#333"
        , borderRadius: 25
        , paddingHorizontal: 20
        , fontSize: 16
        , shadowColor: 'black'
        , shadowOpacity: 0.2
        , shadowOffset: {
            width: 4
            , height: 4 
        }
        , elevation: 2
    }
    , loadButton: {
        width: 50
        , height: 50
        , backgroundColor: '#8e4dff'
        , borderRadius: 25
        , justifyContent: 'center'
        , alignItems: 'center'
        , marginLeft: 15
    }
  });

export default Main;