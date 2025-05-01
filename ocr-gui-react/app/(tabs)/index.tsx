import React, { useState } from 'react';
import { Platform, StyleSheet, Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string>('');

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      alert('Kita butuh akses ke Library HP atau Kameramu agar bsia menikmati fitur ini!');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setOcrResult('');
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setOcrResult('');
    }
  };

  const handleScan = async () => {
    if (!image) {
      alert('Pilih Gambar Terlebih Dahulu!');
      return;
    }

    setOcrResult('⏳ Memindai gambar...');

    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    } as any);

    try {
      console.log('Sending request to: http://192.168.67.56:8000/ocr');
      console.log('Image URI:', image); // Log the URI for debugging

      const response = await fetch('http://192.168.67.56:8000/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Server error:', errorData);
        setOcrResult(`❌ Error: ${errorData.error || response.statusText}`);
        return;
      }
      const data = await response.json();
      console.log('Response data:', data); // Log the response for debugging
      if (data.texts && data.texts.length > 0) {
        setOcrResult(data.texts.join('\n'));
      } else {
        setOcrResult('⚠️ Tidak ada teks terdeteksi.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setOcrResult('❌ Gagal terhubung ke server.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>

        <Text style={styles.title}>Automated Number Plate Recognition</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 12 }}>
          <Button title="📷 Kamera" onPress={takePhoto} />
          <Button title="🖼️ Galeri" onPress={pickImage} />
        </View>


        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}
        <View style={styles.separator} />
        <Button title="Scan" onPress={handleScan} disabled={!image} />

        {ocrResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Hasil Scan OCR:</Text>
            <Text style={styles.resultText}>{ocrResult}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultText: {
    fontSize: 16,
    marginTop: 8,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 2,
    width: '90%',
  },
});