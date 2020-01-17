import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View
    , Text, TouchableOpacity, Keyboard } from 'react-native';
//import { View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main( { navigation } ) {
    const [ devs, setDevs ] = useState( [] );
    const [ currentRegion, setCurrentRegion ] = useState( null );
    const [ techs, setTechs ] = useState( '' );

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

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get( '/search', {
            params: {
                latitude
                , longitude
                , techs
            }
        } );

        console.log( 'devs', response.data.devs );

        setDevs( response.data.devs );
    }

    function handleRegionChanged( region ) {
        console.log( 'region', region );
        setCurrentRegion( region );
    }

    // don't show map until we have the location
    if( ! currentRegion ) {
        return null;
    }

    return ( 
    <>
    <MapView initialRegion={currentRegion}
            onRegionChangeComplete={handleRegionChanged}
                    style={styles.map} >
        {devs.map( dev => (
            <Marker key={dev._id} 
                coordinate={{ 
                latitude: dev.location.coordinates[ 1 ]
                , longitude: dev.location.coordinates[ 0 ] 
                }} >
                <Image source={{ uri: dev.avatar_url }}
                        style={styles.avatar} />
                <Callout onPress={ () => {
                    // navigate to profile
                    navigation.navigate( 'Profile', { github_username: dev.github_username } );
                }}>
                    <View style={styles.callout} >
                        <Text style={styles.devName} >{dev.name}</Text>
                        <Text style={styles.devBio} >{dev.bio}</Text>
                        <Text style={styles.devTechs} >{dev.techs.join( ', ' )}</Text>
                    </View>
                </Callout>
            </Marker>
        ) )}
    </MapView>
    <View style={styles.searchForm} >
        <TextInput style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={ text => setTechs( text ) }
                    />
        <TouchableOpacity onPress={loadDevs}
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
        , top: 20
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