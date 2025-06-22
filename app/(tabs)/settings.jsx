import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useEffect } from 'react';

const workersData = [
  { id: '1', name: 'Mehdi Seddik', role: { value: 'chef' }, contact: '0654321098', email: 'mehdi@seddikauto.com' },
  { id: '2', name: 'Karim Benzema', role: { value: 'mecanicien' }, contact: '0612345678', email: 'karim@seddikauto.com' },
  { id: '3', name: 'Youssef En-Nesyri', role: { value: 'technicien' }, contact: '0698765432', email: 'youssef@seddikauto.com' },
];

export default function Settings() {
  const router = useRouter();
  const [workers, setWorkers] = useState(workersData);
  const [expandedWorker, setExpandedWorker] = useState(null);

  const toggleWorkerDetails = (workerId) => {
    setExpandedWorker(expandedWorker === workerId ? null : workerId);
  };

  const addNewWorker = () => {
    router.push('../clientsScreens/addWorkerScreen');
  };

  const editWorker = (workerId) => {
    // Edit functionality would go here
    alert(`Edit worker with ID: ${workerId}`);
  };

  const deleteWorker = (workerId) => {
    setWorkers(workers.filter(worker => worker.id !== workerId));
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'workers'), (snapshot) => {
      const newData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setWorkers(prevWorkers => {
        // Keep existing items not in the new snapshot
        const existingIds = new Set(newData.map(worker => worker.id));
        const uniqueOldWorkers = prevWorkers.filter(w => !existingIds.has(w.id));
        return [...uniqueOldWorkers, ...newData];
      });
    });
  
    return unsubscribe;
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestion des Mécaniciens</Text>
      
      {/* Add New Worker Button */}
      <TouchableOpacity style={styles.addButton} 
      onPress={ () => router.push('../clientsScreens/AddWorkerScreen')}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Ajouter un mécanicien</Text>
      </TouchableOpacity>

      {/* Workers List */}
      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workerCard}>
            <TouchableOpacity 
              style={styles.workerHeader}
              onPress={() => toggleWorkerDetails(item.id)}
            >
              <View>
                <Text style={styles.workerName}>{item.name}</Text>
                {item.role?.value && (
                  <Text style={styles.workerRole}>{item.role?.value}</Text>
                )}
              </View>
              <Ionicons 
                name={expandedWorker === item.id ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color={Colors.PRIMARY} 
              />
            </TouchableOpacity>

            {expandedWorker === item.id && (
              <View style={styles.workerDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="call" size={20} color={Colors.PRIMARY} />
                  <Text style={styles.detailText}>{item.contact}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="mail" size={20} color={Colors.PRIMARY} />
                  <Text style={styles.detailText}>{item.email}</Text>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => editWorker(item.id)}
                  >
                    <Ionicons name="create" size={18} color="white" />
                    <Text style={styles.actionButtonText}>Modifier</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteWorker(item.id)}
                  >
                    <Ionicons name="trash" size={18} color="white" />
                    <Text style={styles.actionButtonText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    top: 0,
    paddingTop: 30,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  workerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  workerRole: {
    fontSize: 14,
    color: Colors.GRAY.DARK,
    marginTop: 5,
  },
  workerDetails: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY.LIGHT,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.BLACK,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: Colors.PRIMARY,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});