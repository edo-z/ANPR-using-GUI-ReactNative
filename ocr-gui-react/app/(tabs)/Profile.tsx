import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Team</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.desc}>1. Ewaldo Zenobia       ( 0922040012 )</Text>
            <Text style={styles.desc}>2. Ajib Dzaki Al-Choiri  ( 0922040003 )</Text>
            <Text style={styles.desc}>3. Rindu Marito             ( 0922040021 )</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  desc: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
