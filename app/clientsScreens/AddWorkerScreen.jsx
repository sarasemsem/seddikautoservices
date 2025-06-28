import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import CustomDropdown from "../../components/CustomDropdown";

export default function AddWorkerScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState(null);
  const [notes, setNotes] = useState('');

  const [roleOpen, setRoleOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  const [roleItems, setRoleItems] = useState([
    { id: '1', name: 'Chef', value: 'chef' },
    { id: '2', name: 'mecanicien', value: 'mecanicien' },
    { id: '3', name: 'technicien', value: 'technicien' },
    { id: '4', name: 'nettoyeur', value: 'nettoyeur' },
  ]);

  const [availabilityItems, setAvailabilityItems] = useState([
    { id: '1', name: 'Disponible' },
    { id: '2', name: 'Non Disponible' },
  ]);

  const saveWorker = async () => {
    if (!name || !contact) {
      alert("Nom et numéro de contact sont requis.");
      return;
    }
  
    try {
      await addDoc(collection(db, 'workers'), {
        name,
        role,
        contact,
        email,
        availability,
        notes,
        createdAt: new Date(),
      });
      alert('Mécanicien ajouté avec succès');
      router.back(); // return to previous screen
    } catch (error) {
      console.error('Erreur ajout Firestore:', error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un mécanicien</Text>
        <TouchableOpacity onPress={saveWorker}>
          <Text style={styles.saveText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Informations du mécanicien</Text>

      <Text style={styles.label}>Nom complet<Text style={styles.required}>*</Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Numéro de Contact<Text style={styles.required}>*</Text></Text>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.phoneInput}
          placeholder="Numéro de Contact"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />
      </View>
      <Text style={styles.label}>Email<Text style={styles.required}>*</Text></Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.phoneInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <Text style={styles.label}>Role<Text style={styles.required}>*</Text></Text>
      <CustomDropdown
              data={roleItems}
              onSelect={setRole}
              defaultButtonText="Role"
              value={role}
            />

      <Text style={styles.sectionTitle}>Plus de Details</Text>

      <Text style={styles.label}>Disponibilité</Text>
      <CustomDropdown
              data={availabilityItems}
              onSelect={setAvailability}
              defaultButtonText="Disponibilité"
              value={availability}
            />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        placeholder="Ajouter des notes"
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveWorker}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace("/clients")}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveText: {
    color: 'red',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  icon: {
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    height: 40,
  },
  dropdown: {
    marginTop: 5,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#333',
  },
});
