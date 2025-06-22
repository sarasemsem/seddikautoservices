// ClientsContext.js
import React, { createContext, useContext, useState } from 'react';

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([
    { id: 1, name: "Mohamed hedi", phone: "555-1234", vehicle: "Toyota Camry", licensePlate: "ABC-123", },
    { id: 2, name: "Nabil youssef", phone: "555-5678", vehicle: "Honda Civic", licensePlate: "XYZ-789", },
    { id: 3, name: "yassin korba", phone: "555-9012", vehicle: "Toyota Camry", licensePlate: "ABC-123", },
    { id: 4, name: "Nabil hedi", phone: "555-3456", vehicle: "Honda Civic", licensePlate: "XYZ-789", },
  ]);

  const addClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  const updateClient = (updatedClient) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  return (
    <ClientsContext.Provider value={{ clients, addClient, updateClient }}>
      {children}
    </ClientsContext.Provider>
  );
};

// Create a custom hook for easy access
export const useClientsContext = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClientsContext must be used within a ClientsProvider');
  }
  return context;
};