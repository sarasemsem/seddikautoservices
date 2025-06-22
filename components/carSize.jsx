import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// In CarSize.js
export default function CarSize({ washCarSizes, selectedServices, toggleService }) {
  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Choisissez la taille de véhicule</Text>
          {washCarSizes.map((size) => {
              const isSelected = selectedServices.some(s => s.id === size.id);
              return (
                  <TouchableOpacity
                      key={size.id}
                      style={[
                          styles.button,
                          isSelected && styles.selectedButton,
                      ]}
                      onPress={() => toggleService(size)}
                  >
                      <View style={styles.buttonIconContainer}>
                          <Image source={size.icon} style={styles.buttonIcon} />
                      </View>
                      <Text style={[
                          styles.buttonText, 
                          isSelected && styles.selectedButtonText
                      ]}>
                          {size.title} / {size.price} DT
                      </Text>
                  </TouchableOpacity>
              );
          })}
      </SafeAreaView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 22,
      fontFamily: 'outfit-bold',
      color: '#D32F2F',
      marginTop: 10,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#D32F2F',
      padding: 15,
      borderRadius: 12,
      marginVertical: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectedButton: {
      backgroundColor: '#FFCDD2',
    },
    selectedButtonText: {
      color: '#D32F2F',
    },
    buttonText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'outfit-bold',
    },
    buttonIconContainer: {
      alignItems: 'center',
    },
    buttonIcon: {
      width: 50,
      height: 50,
      tintColor: '#fff',
    },
  });
  