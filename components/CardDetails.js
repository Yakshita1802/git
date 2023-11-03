import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardDetails({ route }) {
  const { cardData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Details</Text>
      <Text style={styles.cardName}>Card Name: {cardData['Card Name']}</Text>
      <Text style={styles.issuer}>Issuer: {cardData.Issuer}</Text>
      <Text style={styles.network}>Network: {cardData.Network}</Text>
      <Text style={styles.lyft}>Lyft(%): {cardData['Lyft(%)']}</Text>
      <Text style={styles.airTravel}>Air Travel(%): {cardData['Air Travel(%)']}</Text>
      <Text style={styles.hotels}>Hotels(%): {cardData['Hotels(%)']}</Text>
      <Text style={styles.dining}>Dining(%): {cardData['Dining(%)']}</Text>
      <Text style={styles.drugstores}>Drugsrores(%): {cardData['Drugsrores(%)']}</Text>
      <Text style={styles.everythingElse}>Everything Else(%): {cardData['Everything Else(%)']}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cardName: {
    fontSize: 20,
    marginVertical: 5,
  },
  issuer: {
    fontSize: 18,
    marginVertical: 5,
  },
  network: {
    fontSize: 18,
    marginVertical: 5,
  },
  lyft: {
    fontSize: 18,
    marginVertical: 5,
  },
  airTravel: {
    fontSize: 18,
    marginVertical: 5,
  },
  hotels: {
    fontSize: 18,
    marginVertical: 5,
  },
  dining: {
    fontSize: 18,
    marginVertical: 5,
  },
  drugstores: {
    fontSize: 18,
    marginVertical: 5,
  },
  everythingElse: {
    fontSize: 18,
    marginVertical: 5,
  },
});
