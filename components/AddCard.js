import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { ref, get, update } from 'firebase/database';
import { database } from '../firebaseConfig';

function AddCard({ route }) {
  const { issuer, user } = route.params;
  const [cards, setCards] = useState([]);
  const [selectedCardKeys, setSelectedCardKeys] = useState([]);
  const userWalletRef = ref(database, 'users', user, 'wallet');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardDataRef = ref(database, 'cards');
        const dataSnapshot = await get(cardDataRef);

        if (dataSnapshot.exists()) {
          const cardData = dataSnapshot.val();
          const cardList = Object.entries(cardData).map(([key, value]) => ({
            key,
            ...value,
          }));

          const issuerCards = cardList.filter((card) => card['Issuer'] === issuer);

          setCards(issuerCards);
        } else {
          console.log('No card data found in Realtime Database');
        }
      } catch (error) {
        console.error('Error fetching data from Realtime Database:', error);
      }
    };

    fetchData();
  }, [issuer, user]);

  const handleToggleCardSelection = (cardKey) => {
    setSelectedCardKeys((prevSelectedCardKeys) => {
      if (prevSelectedCardKeys.includes(cardKey)) {
        return prevSelectedCardKeys.filter((key) => key !== cardKey);
      } else {
        return [...prevSelectedCardKeys, cardKey];
      }
    });
  };

  const handleAddToWallet = async () => {
    try {
      if (selectedCardKeys.length > 0) {
        const walletSnapshot = await get(userWalletRef);
        const currentWallet = walletSnapshot.val() || [];

        const newCardKeys = selectedCardKeys.filter(
          (cardKey) => !currentWallet.includes(cardKey)
        );

        const updatedWallet = [...currentWallet, ...newCardKeys];

        const updates = {};
        updates[`/users/${user}/wallet`] = updatedWallet;

        await update(ref(database), updates);

        Alert.alert('Success', 'Selected cards added to your wallet.');
      } else {
        Alert.alert('Info', 'Please select cards before adding them to your wallet.');
      }
    } catch (error) {
      console.error('Error adding cards to wallet:', error);
      Alert.alert('Error', 'An error occurred while adding the cards to your wallet.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Cards</Text>
      <ScrollView style={styles.cardList}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.key}
            onPress={() => handleToggleCardSelection(card.key)}
          >
            <View
              style={[
                styles.cardItem,
                {
                  borderColor: selectedCardKeys.includes(card.key) ? 'green' : 'blue',
                },
              ]}
            >
              <Text style={styles.cardText}>{card['CardName']}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button title="Add to Wallet" onPress={handleAddToWallet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardList: {
    width: '100%',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  cardText: {
    fontSize: 18,
  },
});

export default AddCard;
