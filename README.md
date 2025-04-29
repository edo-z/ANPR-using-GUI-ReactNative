# ANPR-using-GUI-ReactNative
Berikut adalah rangkuman dan prosedur yang baik dan benar untuk dijadikan isi file `README.md` pada GitHub, menyesuaikan dengan proyek ANPR (Automated Number Plate Recognition) yang frontend-nya dibangun dengan React Native (Expo) dan backend-nya menggunakan Python dengan OpenCV + Tesseract:

---

# 🚘 Automated Number Plate Recognition (ANPR)

Proyek ini merupakan aplikasi mobile berbasis **React Native + Expo** yang terintegrasi dengan backend **Python Flask** untuk mendeteksi dan membaca teks dari plat nomor kendaraan menggunakan **OpenCV** dan **Tesseract OCR**.

---

## 🧩 Fitur

- Upload/capture gambar kendaraan dari galeri atau kamera
- Kirim gambar ke server lokal
- Proses OCR pada server menggunakan OpenCV + Tesseract
- Tampilkan hasil bacaan OCR di aplikasi

---

## 📱 Frontend: React Native + Expo

### Install & Jalankan

```bash
npm install
npx expo start
```

### Fitur Utama UI
- Expo ImagePicker
- Upload gambar ke backend via `fetch POST`
- Menampilkan hasil OCR sebagai respons JSON

---

## 🖥️ Backend: Python Flask + OpenCV + Tesseract

### Struktur Sederhana

```bash
server/
├── app.py
├── requirements.txt
└── uploads/
```

### Requirements

```bash
pip install -r requirements.txt
sudo apt install tesseract-ocr
```

### Jalankan Flask

```bash
python app.py
```

> ⚠️ Pastikan `app.py` dijalankan di alamat IP LAN (bukan `localhost`) agar bisa diakses oleh HP (misalnya: `host='0.0.0.0'` dan port `5000`)

---

## 🧠 API Endpoint

### POST `/upload`

- **Request**: multipart/form-data
  - `file`: gambar (.jpg, .png, dll.)
- **Response**: JSON
  ```json
  {
    "text": "B 1234 ABC"
  }
  ```

---

## 🛠️ Tools yang Digunakan

- React Native (Expo)
- TypeScript
- Flask (Python)
- OpenCV
- Tesseract OCR

---

## 📶 Koneksi React Native ⇄ Flask

- Gunakan IP lokal PC (bukan localhost/127.0.0.1)
- Contoh URL:
  ```ts
  const API_URL = 'http://192.168.100.79:5000/upload';
  ```
- Jangan lupa izinkan permissions kamera & galeri di aplikasi Expo

---

## 📌 Catatan

- Jalankan Flask dan Expo dalam **jaringan WiFi yang sama**
- Port `8081` untuk React Native, dan `5000` untuk Flask backend

---

## 🤝 Kontribusi

Silakan fork dan pull request jika ingin menambahkan fitur atau memperbaiki bug.

---

Kalau kamu ingin saya bantu sekalian bikin file `README.md`-nya langsung dari isi ini, tinggal bilang aja! Mau dilanjut dari sini ke tahap deploy atau integrasi tambahan juga bisa.
