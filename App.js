import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum izni verilmedi');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  let text = 'Konum alınıyor';
  let latitude = 37.78825; 
  let longitude = -122.4324;

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Konum: ${location.coords.latitude}, ${location.coords.longitude}`;
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <StatusBar/>
      <MapView
      
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,  
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}  
      >
        
        {location && (
          
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title="Mevcut Konum"
            description="Buradasınız"
            
          >
             <FontAwesome name="map-marker" size={32} color="blue" />
          </Marker>
        )}
            
      </MapView>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
});

export default App;