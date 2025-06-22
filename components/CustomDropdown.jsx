import React, { useRef, useState } from "react";
import {
    Animated,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const CustomDropdown = ({ data, onSelect, defaultButtonText, value }) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setVisible(!visible);
    Animated.timing(fadeAnim, {
      toValue: visible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onItemPress = (item) => {
    setSelectedItem(item);
    onSelect(item);
    toggleDropdown();
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={toggleDropdown}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedItem ? selectedItem.name : defaultButtonText}
        </Text>
        <Text style={styles.dropdownArrow}>{visible ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        onRequestClose={toggleDropdown}
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <Animated.View 
          style={[
            styles.dropdownMenu,
            { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }
          ]}
        >
          <ScrollView>
            {data.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => onItemPress(item)}
              >
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#000',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '50%',
    left: 16,
    right: 16,
    maxHeight: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDropdown;