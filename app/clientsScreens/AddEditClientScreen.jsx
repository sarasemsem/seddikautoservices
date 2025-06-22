import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TopBarButtons from "../../components/TopBarButtons";
import Colors from "../../constants/Colors";
import { useClientsContext } from "../../lib/ClientsContext";

const AddEditClientScreen = ({ route }) => {
    const navigation = useNavigation();
    const { addClient, updateClient } = useClientsContext();
  const clientToEdit = route?.params?.client || null;

  // State for client fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  useEffect(() => {
    if (clientToEdit) {
      setName(clientToEdit.name);
      setPhone(clientToEdit.phone);
      setVehicle(clientToEdit.vehicle);
      setLicensePlate(clientToEdit.licensePlate);
    }
  }, [clientToEdit]);

  const onSave = () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter the client's name.");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Validation", "Please enter the client's phone number.");
      return;
    }
    if (!vehicle.trim()) {
      Alert.alert("Validation", "Please enter the vehicle model.");
      return;
    }
    if (!licensePlate.trim()) {
      Alert.alert("Validation", "Please enter the license plate.");
      return;
    }

    const clientData = {
      id: clientToEdit?.id || Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      vehicle: vehicle.trim(),
      licensePlate: licensePlate.trim(),
    };

    if (clientToEdit) {
      updateClient(clientData);
    } else {
      addClient(clientData);
    }
    navigation.replace("clients");
  };

  const onClear = () => {
    setName("");
    setPhone("");
    setVehicle("");
    setLicensePlate("");
  };

  return (
    <View style={styles.container}>   
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {clientToEdit ? "Modifier Client" : "Nouveau Client"}
        </Text>
        <TopBarButtons isBackButton={true} />
      </View>

      <ScrollView contentContainerStyle={styles.listContent} keyboardShouldPersistTaps="handled">
      <View style={styles.iconContainer}>
      <FontAwesome5 name="car-side" size={24} color="#d32f2f" style={styles.icon}/>
      <Text style={styles.label}>
          Remplir les champs avec les informations du client
        </Text>
      </View>
        {/* Client Name */}
        <View style={styles.containers}>
        <Text style={styles.ContainerTitle}>Informations client</Text>
        <Text style={styles.label}>Nom Client</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom Client"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
        />

        {/* Phone */}
        <Text style={styles.label}>Numéro de Téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Numéro de Téléphone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          returnKeyType="next"
        />
        </View>

        {/* Vehicle */}
        <View style={styles.containers}>
        <Text style={styles.ContainerTitle}>Informations véhicule</Text>
        <Text style={styles.label}>Modele Véhicule</Text>
        <TextInput
          style={styles.input}
          placeholder="Modele Véhicule"
          value={vehicle}
          onChangeText={setVehicle}
          autoCapitalize="words"
          returnKeyType="next"
        />

        {/* License Plate */}
        <Text style={styles.label}>Immatriculation</Text>
        <TextInput
          style={styles.input}
          placeholder="Immatriculation"
          value={licensePlate}
          onChangeText={setLicensePlate}
          autoCapitalize="characters"
          returnKeyType="done"
        />
        </View>       
      </ScrollView>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <Text style={styles.clearButtonText}>Effacer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>{clientToEdit ? "Modifier" : "Ajouter"}</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    </View>
  );
};

export default AddEditClientScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  safeArea: {
    position : "relative",
    flex: 1,
    backgroundColor: Colors.GRAY.LIGHT,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 65,
    paddingBottom: 18,
    paddingLeft: 70,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY.LIGHT,
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    color: Colors.BLACK,
    fontSize: 22,
    fontWeight: "500",
  },
  listContent: {
    position: "absolute",
    width: "100%",
    top: 60,
    padding: 20,
    paddingBottom: 40,
  },
  containers: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    marginTop: 15,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontFamily: "outfit",
    color: "#444",
    marginBottom: 6,
    marginTop: 12,
    fontSize: 14,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 20, 
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#d32f2f",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
  },
  clearButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#d32f2f",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },
  saveButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  clearButtonText: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  ContainerTitle: {
    fontFamily: "outfit-bold",
    color: Colors.BLACK,
    fontSize: 16,
    marginBottom: 12,
    marginTop: 12,
  },
});
