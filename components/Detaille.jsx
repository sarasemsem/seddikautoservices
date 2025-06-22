import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
// In Detaille.js
export default function Detaille({ selectedServices, toggleService, customizedServices }) {
  return (
      <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <Text style={styles.sectionTitle}>Options</Text>
              <View style={styles.optionRow}>
                  {customizedServices.map((item) => (
                      <TouchableOpacity 
                          key={item.title} 
                          style={[
                              styles.optionCard, 
                              selectedServices.some(s => s.id === item.id) && styles.selectedOption
                          ]} 
                          onPress={() => toggleService(item)}
                      >
                          <View style={styles.optionImageContainer}>
                              <Image source={item.icon} style={styles.optionImage} />
                          </View>
                          <View style={styles.optionTextContainer}>
                              <Text style={styles.optionText}>{item.title}</Text>
                              <View style={styles.priceContainer}>
                                  <Text style={styles.price}>{item.price} DT</Text>
                                  <Ionicons name="add-circle-sharp" size={24} color={Colors.PRIMARY} />
                              </View>
                          </View>
                      </TouchableOpacity>
                  ))}
              </View>
          </ScrollView>
      </View>
  );
}

      {/* <View style={styles.bottomBar}>
        <Text style={styles.totalText}>
          Total <Text style={{ color: "red", fontWeight: "bold" }}>Dt16.49</Text>
        </Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View> */}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    image: {
      width: "60%",
      height: 200,
    },
    section: {
      padding: 16,
    },
    bold: {
      fontWeight: "bold",
      fontSize: 14,
    },
    text: {
      marginVertical: 4,
      color: "#444",
    },
    label: {
      fontWeight: "bold",
      marginTop: 14,
    },
    sliderLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    portionRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    btn: {
      backgroundColor: "red",
      padding: 8,
      borderRadius: 10,
      marginHorizontal: 12,
    },
    btnText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    portionText: {
      fontSize: 18,
    },
    sectionTitle: {
      fontFamily: "outfit-bold",
      fontSize: 20,
      marginLeft: 16,
      marginTop: 20,
    },
    optionRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 16,
      marginTop: 10,
      gap: 15,
    },
    optionCard: {
      width: 120,
      backgroundColor: "#f5f5f5",
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    plus: {
      color: "red",
      fontWeight: "bold",
      fontSize: 18,
    },
    bottomBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 0.5,
      borderColor: "#ddd",
    },
    totalText: {
      fontSize: 16,
    },
    orderButton: {
      backgroundColor: "red",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    orderButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    optionImageContainer: {
      alignItems: "center",
      height: 50,
      width: 50,
      marginBottom: 8,
    },
    optionImage: {
      width: 50,
      height: 50,
    },
    optionTextContainer: {
      alignItems: "center",
      width: "100%",
    },
    optionText: {
      fontFamily: "BebasNeue",
      letterSpacing: 0.5,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 4,

    },
    price: {
      color: Colors.GRAY.MEDIUM,
      marginTop: 4,
      fontSize: 16,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    optionCard: {
        width: '30%',
        padding: 10,
        marginVertical: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
      },
      selectedOption: {
        borderColor: '#d32f2f',
        backgroundColor: '#fff5f5',
      },
  });
  