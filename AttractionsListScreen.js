import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Button,
  TextInput, Alert, Image, ScrollView, ActivityIndicator, Linking
} from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../contexts/ThemeContext';


const initialAttractions = [
  { id: '1', name: 'Big Ben', category: 'Landmarks', latitude: 51.5007, longitude: -0.1246, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/f8/bb/big-ben.jpg?w=1200&h=1200&s=1" },
  { id: '2', name: 'London Eye', category: 'Landmarks', latitude: 51.5033, longitude: -0.1195, image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG" },
  { id: '3', name: 'Buckingham Palace', category: 'Landmarks', latitude: 51.5014, longitude: -0.1419, image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Buckingham_Palace_UK.jpg" },
  { id: '4', name: 'Tower of London', category: 'Museums', latitude: 51.5081, longitude: -0.0759, image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Tower_of_London_viewed_from_the_River_Thames.jpg" },
  { id: '5', name: 'British Museum', category: 'Museums', latitude: 51.5194, longitude: -0.1270, image: "https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg" },
];

const extraPlaces = [

  {
  id: '6',
  name: 'London Explorer Pass',
  category: 'Deals',
  latitude: 51.5074,
  longitude: -0.1278,
  image: 'https://th.bing.com/th/id/OIP.J9tLQziHZAQ5gQr0OqsX1QAAAA?rs=1&pid=ImgDetMain',
  url: 'https://www.londonpass.com/',
  discount: 'Up to 40% off on top attractions'
},
{
  id: '7',
  name: 'Thames River Cruise Combo',
  category: 'Deals',
  latitude: 51.5079,
  longitude: -0.0877,
  image: 'https://i.ytimg.com/vi/QEw00qox8fo/maxresdefault.jpg',
  url: 'https://www.citycruises.com/london-thames-river-pass/',
  discount: '20% off for app users'
},
{
  id: '8',
  name: 'London Museum Bundle',
  category: 'Deals',
  latitude: 51.5194,
  longitude: -0.1270,
  image: 'https://i.etsystatic.com/38476749/r/il/1fbed3/5167207131/il_fullxfull.5167207131_i0iw.jpg',
  url: 'https://www.londonmuseum.com/bundle-deals',
  discount: 'Save 25% on combined tickets'
},
{
  id: '9',
  name: 'West End Theatre Package',
  category: 'Deals',
  latitude: 51.5128,
  longitude: -0.1195,
  image: 'https://images.ctfassets.net/6pezt69ih962/28ZPyQNwgJVyTIS8gPtoES/b87e82d4d453eac53ef7c67caab4fe75/LTNOLOGO1200.jpg',
  url: 'https://www.londontheatres.com/packages',
  discount: 'Exclusive 15% off for app members'
},

{
    id: '10',
    name: 'Westfield London',
    category: 'Shopping',
    latitude: 51.5077,
    longitude: -0.1281,
    image: 'https://s3-media1.fl.yelpcdn.com/bphoto/5Bi1hOiB2iQ6LuvvB-Xqow/o.jpg',
    url: 'https://uk.westfield.com/london'
  },
  {
    id: '11',
    name: 'Oxford Street',
    category: 'Shopping',
    latitude: 51.5154,
    longitude: -0.1410,
    image: 'https://th.bing.com/th/id/OIP.Erf33qf7DsA4lOoZRWjyfwHaE8?rs=1&pid=ImgDetMain',
    url: 'https://www.oxfordstreet.co.uk/'
  },

  {
  id: '12',
  name: 'Brent Cross Shopping Centre',
  category: 'Shopping',
  latitude: 51.5763,
  longitude: -0.2222,
  image: 'https://c8.alamy.com/comp/BBFJA9/brent-cross-shopping-centre-london-england-uk-BBFJA9.jpg',
  url: 'https://www.brentcross.co.uk/'
},
{
  id: '13',
  name: 'Canary Wharf Shopping Centre',
  category: 'Shopping',
  latitude: 51.5054,
  longitude: -0.0235,
  image: 'https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/AWT6G2/triangle-shopping-centre-manchester-uk-AWT6G2.jpg',
  url: 'https://canarywharf.com/shops-services/'
},
{
  id: '14',
  name: 'Covent Garden',
  category: 'Shopping',
  latitude: 51.5115,
  longitude: -0.1230,
  image: 'https://th.bing.com/th/id/OIP.OU0I61E_mJOKP7KQpDT6IQHaE1?rs=1&pid=ImgDetMain',
  url: 'https://www.coventgarden.london/'
},

  {
    id: '15',
    name: 'McDonald’s',
    category: 'Food',
    latitude: 51.509,
    longitude: -0.135,
    image: 'https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png',
    url: 'https://www.mcdonalds.com/gb/en-gb.html'
  },
  {
    id: '16',
    name: 'Pret A Manger',
    category: 'Food',
    latitude: 51.507,
    longitude: -0.128,
    image: 'https://www.kindpng.com/picc/m/697-6978478_pret-a-manger-logo-png-transparent-png.png',
    url: 'https://www.pret.co.uk/en-GB'
  },
  {
    id: '17',
    name: 'Tesco Express',
    category: 'Kiosks',
    latitude: 51.505,
    longitude: -0.13,
    image: 'https://1.bp.blogspot.com/-sDt5FdO_ZAo/VWBnLrh1_vI/AAAAAAAACow/r9eeJ139JNQ/s1600/Tesco-logo-vector.png',
    url: 'https://www.tesco.com/store-locator/'
  },
  {
    id: '18',
    name: 'Sainsbury’s',
    category: 'Kiosks',
    latitude: 51.506,
    longitude: -0.125,
    image: 'https://th.bing.com/th/id/OIP.HkQ9Xg22HGyUIJ7R_1X6oQHaHa?rs=1&pid=ImgDetMain',
    url: 'https://www.sainsburys.co.uk/gol-ui/groceries'
  },
  {
    id: '19',
    name: 'Burger King',
    category: 'Food',
    latitude: 51.504,
    longitude: -0.132,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/2560px-Burger_King_2020.svg.png',
    url: 'https://www.burgerking.co.uk/'
  },
  
  // Existing entries...
  {
    id: '20',
    name: 'Uber Eats',
    category: 'Delivery',
    latitude: 51.5074,
    longitude: -0.1278,
    image: 'https://is2-ssl.mzstatic.com/image/thumb/Purple113/v4/94/78/a1/9478a1c2-c846-9917-1e86-5bbc21934837/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.jpeg/1200x630wa.png',
    url: 'https://www.ubereats.com/gb'
  },
  {
    id: '21',
    name: 'Just Eat',
    category: 'Delivery',
    latitude: 51.5075,
    longitude: -0.1279,
    image: 'https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/43/7b/1e/437b1e6d-b10c-b3be-91f9-a91e2b6e7880/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/1200x630wa.png',
    url: 'https://www.just-eat.co.uk/'
  },
  {
    id: '22',
    name: 'Deliveroo',
    category: 'Delivery',
    latitude: 51.5076,
    longitude: -0.1280,
    image: 'https://www.biancolapisdesign.it/Blog/wp-content/uploads/2018/09/Logo-deliveroo-.jpg',
    url: 'https://deliveroo.co.uk/'
  },
  

{
  id: '23',
  name: 'Premier Inn London City',
  category: 'Hotel',
  latitude: 51.5152,
  longitude: -0.1023,
  image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/f7/e0/71/premier-inn-london-city.jpg?w=1200&h=-1&s=1',
  url: 'https://www.premierinn.com/gb/en/hotels/england/greater-london/london/london-city-old-street.html',
  discount: 'Save 15% when booking via the app'
},
{
  id: '24',
  name: 'The Z Hotel Shoreditch',
  category: 'Hotel',
  latitude: 51.5257,
  longitude: -0.0837,
  image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/644288724.jpg?k=79e69072f46370ec04e3648f35a49b0cc90c2a25599bd5ca533c186133a77a58&o=&hp=1',
  url: 'https://www.thezhotels.com/hotels/shoreditch/',
  discount: '10% off for app members'
},
{
  id: '25',
  name: 'Point A Hotel London Kings Cross',
  category: 'Hotel',
  latitude: 51.5308,
  longitude: -0.1238,
  image: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/487387769.jpg?k=5b8bda9211cd8b32ffab74ca33e4597bb72a79271b8fdd2b20965f55737fc553&o=',
  url: 'https://www.pointahotels.com/hotels/london/kings-cross',
  discount: 'Exclusive 5% off + Early Check-in'
},
{
  id: '26',
  name: 'YOTEL London Shoreditch',
  category: 'Hotel',
  latitude: 51.5325,
  longitude: -0.0511,
  image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/24/a3/f6/restaurant-and-outdoor.jpg?w=1100&h=-1&s=1',
  url: 'https://www.yotel.com/en/hotels/yotel-london-shoreditch',
  discount: 'Free breakfast for app users'
},

];




const headerColors = ['#004d40', '#b71c1c', '#1a237e', '#1b5e20', '#0d47a1', '#4e342e'];

export default function AttractionsListScreen({ navigation }) {
  
    const { isDarkMode, theme } = useTheme();

  const [places, setPlaces] = useState([...initialAttractions, ...extraPlaces]);
  const [location, setLocation] = useState(null);
  const [nearest, setNearest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [placeHistory, setPlaceHistory] = useState('');
  const [placeImage, setPlaceImage] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const [open, setOpen] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState('All');

  const [categories, setCategories] = useState([
    
    { label: 'Museums', value: 'Museums' },
    { label: 'Landmarks', value: 'Landmarks' },
    { label: 'Food', value: 'Food' },
    { label: 'Kiosks', value: 'Kiosks' },
    { label: 'Delivery', value: 'Delivery' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Hotel', value: 'Hotel' },
    { label: 'Deals', value: 'Deals' }
  ]);


  const findNearestAttraction = useCallback((coords) => {
    let minDistance = Number.MAX_VALUE;
    let nearestAttraction = null;
    places.forEach((place) => {
      const dist = getDistance(coords.latitude, coords.longitude, place.latitude, place.longitude);
      if (dist < minDistance) {
        minDistance = dist;
        nearestAttraction = place;
      }
    });
    setNearest(nearestAttraction);
  }, [places]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Enable location services to find nearby attractions.");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      findNearestAttraction(userLocation.coords);
    })();
  }, [findNearestAttraction]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'London',
            units: 'metric',
            appid: '840bd76baf89a471e7c5644f17edb125' // Replace with your OpenWeather key
          }
        });
        setWeather(res.data);
      } catch (err) {
        setWeatherError("N/A");
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => (Math.PI * angle) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setPlaceImage(result.assets[0].uri);
  };

  const handleAddPlace = () => {
    if (!placeName || !placeDescription || !placeHistory || !placeImage) {
      Alert.alert('Fill all fields and image');
      return;
    }
    const newPlace = {
      id: String(places.length + 1),
      name: placeName,
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      category: 'Landmarks',
      image: placeImage,
    };
    setPlaces([...places, newPlace]);
    setModalVisible(false);
    setPlaceName('');
    setPlaceDescription('');
    setPlaceHistory('');
    setPlaceImage('');
    Alert.alert('Added!', `${placeName} added successfully.`);
  };

  const filteredPlaces = selectedCategory === 'All'
    ? places
    : places.filter((p) => p.category === selectedCategory);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.subscriptionButton} onPress={() => navigation.navigate('Subscribe')}>
          <Text style={styles.subscriptionText}>💳 Subscription</Text>
        </TouchableOpacity>

        
        {weatherLoading ? (
          <ActivityIndicator size="small" color="#FFD700" />
        ) : weatherError ? (
          <Text style={styles.weatherText}>🌤️ N/A</Text>
        ) : (
          <View style={styles.weatherBox}>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} style={styles.weatherIcon} />
            <Text style={styles.weatherText}>🌤️ {Math.round(weather.main.temp)}°C in {weather.name}</Text>
          </View>
        )}
      </View>

 <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={selectedCategory}
          items={categories}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          setItems={setCategories}
          placeholder="Filter by Category"
          style={{ backgroundColor: '#333', borderColor: '#FFD700' }}
          dropDownContainerStyle={{ backgroundColor: '#333' }}
          textStyle={{ color: '#FFD700', fontWeight: 'bold' }}
        />
      </View>

      <Text style={styles.header}>🏙️ Explore London Attractions</Text>
      {nearest && <Text style={styles.nearest}>📍 Nearest: {nearest.name}</Text>}

      <View style={styles.listWrapper}>
        {filteredPlaces.map((item, index) => {
          const distance = location
            ? getDistance(location.latitude, location.longitude, item.latitude, item.longitude).toFixed(1)
            : null;

          return (
            <TouchableOpacity
  key={item.id}
  style={styles.cardBox}
  onPress={() => {
    if (item.url) {
      Linking.openURL(item.url);
    } else {
      navigation.navigate('Visit Plan', { place: item.name });
    }
  }}
>

              <View style={[styles.cardHeader, { backgroundColor: headerColors[index % headerColors.length] }]} />
              <View style={styles.cardContent}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name}</Text>
                {distance && <Text style={styles.cardSubtitle}>📍 {distance} km away</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.deliveryContainer}>
  <Text style={styles.deliveryHeader}>🍔 Delivery Options</Text>
  <View style={styles.deliveryButtons}>
    <TouchableOpacity
      style={styles.deliveryButton}
      onPress={() => Linking.openURL('https://www.ubereats.com/')}
    >
      <Text style={styles.deliveryText}>Uber Eats</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.deliveryButton}
      onPress={() => Linking.openURL('https://www.just-eat.co.uk/')}
    >
      <Text style={styles.deliveryText}>Just Eat</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.deliveryButton}
      onPress={() => Linking.openURL('https://deliveroo.co.uk/')}
    >
      <Text style={styles.deliveryText}>Deliveroo</Text>
    </TouchableOpacity>
  </View>
</View>


      <Button title="➕ Add New Place" onPress={() => setModalVisible(true)} color="#FFD700" />

      {location && (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={location} title="You are here" pinColor="blue" />
          {places.map((p) => (
            <Marker key={p.id} coordinate={{ latitude: p.latitude, longitude: p.longitude }} title={p.name} />
          ))}
        </MapView>
      )}

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Place</Text>
         <TextInput
  style={styles.input}
  placeholder="Place Name"
  placeholderTextColor="#888"  // Optional: makes placeholder visible on black
  value={placeName}
  onChangeText={setPlaceName}
/>

<TextInput
  style={styles.input}
  placeholder="Description"
  placeholderTextColor="#888"
  value={placeDescription}
  onChangeText={setPlaceDescription}
/>

<TextInput
  style={styles.input}
  placeholder="History"
  placeholderTextColor="#888"
  value={placeHistory}
  onChangeText={setPlaceHistory}
/>

          <Button title="📷 Pick Image from Gallery" onPress={pickImage} />
          {placeImage && <Image source={{ uri: placeImage }} style={{ width: '100%', height: 150, marginTop: 10 }} />}
          <Button title="✅ Add Place" color="#00C853" onPress={handleAddPlace} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  subscriptionButton: { backgroundColor: '#FFD700', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 18 },
  subscriptionText: { fontSize: 10, color: '#000', fontWeight: 'bold' },
  weatherBox: { flexDirection: 'row', alignItems: 'center' },
  weatherText: { color: '#FFD700', fontWeight: 'bold', fontSize: 13 },
  weatherIcon: { width: 24, height: 24, marginRight: 5 },
  dropdownContainer: { marginHorizontal: 20, marginBottom: 10 },

  header: { fontSize: 20, fontWeight: 'bold', color: '#FFD700', textAlign: 'center', marginBottom: 10 },
  nearest: { fontSize: 18, fontWeight: 'bold', color: '#F0F0F0', textAlign: 'center', marginBottom: 10 },
  listWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10 },
  cardBox: { width: '48%', marginBottom: 12, backgroundColor: '#2D2D2D', borderRadius: 10, overflow: 'hidden', minHeight: 180 },
  cardHeader: { height: 40 },
  cardContent: { padding: 10, alignItems: 'center' },
  cardImage: { width: '100%', height: 80, borderRadius: 6, marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', marginBottom: 4, textAlign: 'center' },
  cardSubtitle: { fontSize: 13, color: '#ccc', textAlign: 'center' },
  input: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, marginVertical: 8 },
  map: { width: '100%', height: 200, marginTop: 20 },
  modalContainer: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFD700', marginBottom: 20, textAlign: 'center' },
  deliveryContainer: {
  padding: 20,
  backgroundColor: '#2D2D2D',
  borderRadius: 10,
  marginVertical: 10,
},
deliveryHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFD700',
  marginBottom: 10,
},
deliveryButtons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
},
deliveryButton: {
  backgroundColor: '#FFD700',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
},
deliveryText: {
  color: '#000',
  fontWeight: 'bold',
},

});
