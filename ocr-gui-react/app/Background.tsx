import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Background Project</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.getStartedText}>Projek ini dibuat berdasarkan kebutuhan tugas dari mata kuliah
              <Text style={styles.title}> Machine Learning </Text> dengan subjek membaca <Text style={styles.title}> Membaca Plat Nomor Kendaraan</Text></Text>
      

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
