import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
    );
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🎵 Music App</Text>
      <Button title="Play demo track" onPress={playSound} />
    </View>
  );
}
