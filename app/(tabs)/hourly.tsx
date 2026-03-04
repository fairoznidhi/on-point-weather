import { StyleSheet, Text, View } from 'react-native';

export default function HourlyScreen() {
  return (
    <View style={styles.container}>
      <Text>Hourly Forecast Screen</Text>
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
