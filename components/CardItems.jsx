import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import { useItemStore } from '../store/itemStore';

export default function CardItems( {item,index} ) {
  const router = useRouter();
  const setItem = useItemStore((state) => state.setItem);
  console.log("item is here in cardItems : ",item);
  return (
    <Animatable.View delay={index * 120} animation="slideInRight" 
                duration={500} key={index} style={styles.section}> 
          {/* <Text style={styles.sectionTitle}>Car Repairs</Text> */}
        <View style={styles.card}>
        <Image source={item.icon} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <View style={styles.cartContainer}>
            <TouchableOpacity style={styles.cardButton}
            onPress={() => {
              setItem(item);
              router.replace('/serviceDetailsScreen')
            }}>
              <Ionicons name="cart" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginRight: 5,
  },
  card: {
    width: 155,
    height: 210,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: "white",
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  cardContent: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    fontFamily: 'outfit-bold',
  },
  cardDescription: {
    fontSize: 10,
    color: 'gray',
    fontFamily: 'outfit',
  },

  cardImage: {
    width: 155,
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 10,
    objectFit: 'cover',
  },
  cartContainer: {
    width: "100%",
    alignItems: 'center',
    marginTop: 15,
  },
  cardButton: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(228, 228, 228, 0.64)",
    justifyContent: 'center',
    alignItems: 'center',
  }
})