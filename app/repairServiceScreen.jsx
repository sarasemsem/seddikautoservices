import { Ionicons, Octicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import CustomDropdown from "../components/CustomDropdown";
import Colors from "../constants/Colors";

const RepairServiceScreen = ({ selectedServices, setSelectedServices }) => {
  const client = {
    name: "John Smith",
    phone: "+1 234 567 8900",
    vehicle: "Toyota Camry",
    year: "2025",
    license: "ABC 123",
  };

  const workers = [
    { id: 1, name: "Ouvrier 1" },
    { id: 2, name: "Ouvrier 2" },
    { id: 3, name: "Ouvrier 3" },
  ];

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [damageDescription, setDamageDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAddRepair = () => {
    console.warn(selectedWorker);
    console.warn(damageDescription);
    console.warn(price);
    /* if (!selectedWorker) {
      Alert.alert("Erreur", "Veuillez sélectionner un technicien");
      return;
    } */

    if (!price || isNaN(parseInt(price))) {
      Alert.alert("Erreur", "Veuillez entrer un montant valide");
      return;
    }
    const repairData = {
      id: Date.now(),
      title: "Réparation Véhicule",
      price: parseInt(price),
      icon: <Octicons name="tools" size={24} color="#d32f2f" />,
      serviceDetails: {
        client: client,
        worker: selectedWorker,
        damageDescription: damageDescription,
        date: new Date().toISOString()
      }
    };
    setSelectedServices(prev => [...prev, repairData]);
  };

  useEffect(() => {
    // This will trigger the parent to update when our data changes
  }, [selectedWorker, damageDescription, price]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Réparation Véhicule</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Client Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-circle-sharp" size={25} color={Colors.PRIMARY} style={styles.headerIcon}/>
              <Text style={styles.sectionTitle}>Client</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Nom:</Text>
              <Text style={styles.value}>{client.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Téléphone:</Text>
              <Text style={styles.value}>{client.phone}</Text>
            </View>
          </View>

          {/* Vehicle Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="car" size={25} color={Colors.PRIMARY} style={styles.headerIcon}/>
              <Text style={styles.sectionTitle}>Véhicule</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Modèle:</Text>
              <Text style={styles.value}>{client.vehicle}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Année:</Text>
              <Text style={styles.value}>{client.year}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Numéro de série:</Text>
              <Text style={styles.value}>{client.license}</Text>
            </View>
          </View>

          {/* Repair Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="build" size={25} color={Colors.PRIMARY} style={styles.headerIcon}/>
              <Text style={styles.sectionTitle}>Détails de la réparation</Text>
            </View>
            <Text style={styles.inputLabel}>Description du dommage</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter damage description"
              multiline
              value={damageDescription}
              onChangeText={setDamageDescription}
            />
            <Text style={styles.inputLabel}>Technicien assigné</Text>
            <CustomDropdown
              data={workers}
              onSelect={setSelectedWorker}
              defaultButtonText="Selectionner un technicien"
              value={selectedWorker}
            />
            <Text style={styles.inputLabel}>Montant</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="numeric"
              placeholder="taper le montant"
              value={price}
              onChangeText={(value)=> setPrice(value)}
              onBlur={handleAddRepair}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.GRAY.LIGHT,
  },
  header: {
    backgroundColor: Colors.PRIMARY,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 16,
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    marginTop: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    color: "#d32f2f",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#555",
    fontWeight: "500",
  },
  value: {
    color: "#111",
    fontWeight: "bold",
  },
  inputLabel: {
    marginTop: 10,
    marginBottom: 6,
    color: "#444",
    fontWeight: "600",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
});

export default RepairServiceScreen;