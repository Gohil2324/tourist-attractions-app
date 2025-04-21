import React, { useState } from 'react';
import {
  View, Text, Button, StyleSheet, Image, ScrollView,
  TouchableOpacity, Alert, Linking, FlatList
} from 'react-native';

const cityData = {
  "Big Ben": {
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/f8/bb/big-ben.jpg?w=1200&h=1200&s=1",
    description: "Big Ben is one of London's most famous landmarks, known for its massive clock and rich history.",
    history: "Big Ben, officially called the Great Bell, is part of the Elizabeth Tower. The clock was completed in 1859 and has been a symbol of British culture ever since."
  },
  "London Eye": {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG",
    description: "The London Eye is the tallest Ferris wheel in Europe, providing breathtaking panoramic views of the city.",
    history: "Opened in 2000, the London Eye was the world's tallest Ferris wheel at the time. It attracts millions of visitors annually."
  },
  "Buckingham Palace": {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Buckingham_Palace_UK.jpg",
    description: "The official residence of the British monarch, famous for its magnificent architecture and royal events.",
    history: "Originally built in 1703 as a townhouse for the Duke of Buckingham, it became the official royal palace of the British monarchy in 1837."
  },
  "Tower of London": {
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Tower_of_London_viewed_from_the_River_Thames.jpg",
    description: "A historic fortress that has served as a royal palace, prison, and treasury.",
    history: "Built by William the Conqueror in 1078, the Tower of London has played a key role in British history, including being home to the Crown Jewels."
  },
  "British Museum": {
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg",
    description: "One of the world’s most famous museums, featuring millions of artifacts from all over the world.",
    history: "Founded in 1753, the British Museum houses the Rosetta Stone, Egyptian mummies, and countless historical treasures."
  }
};

const nearbyPlaces = [
  {
    id: '1', name: 'McDonald’s', type: 'Food', hours: '8 AM - 10 PM',
    menu: 'https://www.mcdonalds.com/gb/en-gb.html',
    image: 'https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png'
  },
  {
    id: '2', name: 'Pret A Manger', type: 'Food', hours: '6 AM - 9 PM',
    menu: 'https://www.pret.co.uk/en-GB',
    image: 'https://www.kindpng.com/picc/m/697-6978478_pret-a-manger-logo-png-transparent-png.png'
  },
  {
    id: '3', name: 'Tesco Express', type: 'Kiosk', hours: '24 Hours',
    menu: 'https://www.tesco.com/store-locator/',
    image: 'https://1.bp.blogspot.com/-sDt5FdO_ZAo/VWBnLrh1_vI/AAAAAAAACow/r9eeJ139JNQ/s1600/Tesco-logo-vector.png'
  },
  {
    id: '4', name: 'Sainsbury’s', type: 'Kiosk', hours: '7 AM - 11 PM',
    menu: 'https://www.sainsburys.co.uk/gol-ui/groceries',
    image: 'https://th.bing.com/th/id/OIP.HkQ9Xg22HGyUIJ7R_1X6oQHaHa?rs=1&pid=ImgDetMain'
  },
  {
    id: '5', name: 'Burger King', type: 'Food', hours: '10 AM - 12 AM',
    menu: 'https://www.burgerking.co.uk/',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/2560px-Burger_King_2020.svg.png'
  },
];

export default function VisitPlanScreen({ route }) {
  const { place } = route.params;
  const [visited, setVisited] = useState(false);

  const handlePlaceClick = (place) => {
    Alert.alert(
      place.name,
      `Opening Hours: ${place.hours}\nView Menu: ${place.menu}`,
      [
        { text: "Open Menu", onPress: () => Linking.openURL(place.menu) },
        { text: "Close", style: "cancel" }
      ]
    );
  };

  const renderFoodCard = ({ item, index }) => {
    const headerColors = ['#004d40', '#b71c1c', '#1a237e', '#2e7d32', '#0d47a1', '#4e342e'];
    return (
      <TouchableOpacity style={styles.cardBox} onPress={() => handlePlaceClick(item)}>
        <View style={[styles.cardHeader, { backgroundColor: headerColors[index % headerColors.length] }]} />
        <View style={styles.cardContent}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.hours}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Plan Your Visit</Text>
      <Text style={styles.place}>Destination: {place}</Text>

      {cityData[place] && (
        <>
          <Image source={{ uri: cityData[place].image }} style={styles.image} />
          <Text style={styles.description}>{cityData[place].description}</Text>
          <Text style={styles.historyHeader}>📜 History</Text>
          <Text style={styles.historyText}>{cityData[place].history}</Text>
        </>
      )}

      <Button
        title={visited ? "Visited ✅" : "Mark as Visited"}
        onPress={() => setVisited(!visited)}
        color={visited ? "green" : "red"}
      />

      <Text style={styles.subHeader}>🍴 Nearby Food & Kiosk Stores</Text>
      <FlatList
        data={nearbyPlaces}
        renderItem={renderFoodCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.cardRow}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  place: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  historyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
    textAlign: 'center',
  },
  historyText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardBox: {
    flex: 1,
    margin: 5,
    backgroundColor: '#2D2D2D',
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 180,
    elevation: 3,
  },
  cardHeader: {
    height: 40,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 80,
    borderRadius: 6,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
  },
});
