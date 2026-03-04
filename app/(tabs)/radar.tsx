import { StyleSheet, Text, View } from 'react-native';

export default function RadarScreen() {
  return (
    <View style={styles.container}>
      <Text>Radar Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
