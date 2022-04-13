import React from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, View } from 'react-native';

const LoadingModal = ({ size, text }: { size: 'large' | 'small'; text?: string }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size={size} color="skyblue" />
          {text && <Text style={{ marginTop: 20 }}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { LoadingModal };
