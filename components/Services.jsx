import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

// In Services.js
export default function Services({ services, selectedServices, toggleService }) {
  return (
      <ScrollView contentContainerStyle={styles.servicesContainer}>
          {services.map((service) => {
              const isSelected = selectedServices.some((s) => s.id === service.id);
              return (
                  <TouchableOpacity
                      key={service.id}
                      style={[
                          styles.serviceCard,
                          isSelected && styles.selectedService,
                      ]}
                      onPress={() => toggleService(service)}
                  >
                      {service.icon}
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <Text style={styles.price}>{service.price} DT</Text>
                  </TouchableOpacity>
              );
          })}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 100
  },
  serviceCard: {
    width: '40%',
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  selectedService: {
    borderColor: '#d32f2f',
    backgroundColor: '#fff5f5',
  },
  serviceTitle: { marginTop: 10, fontWeight: '600' },
  price: { color: 'gray', marginTop: 4 },
});
