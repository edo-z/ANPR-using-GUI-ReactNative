from flask import Flask, request, jsonify
from flask_cors import CORS
from paddleocr import PaddleOCR
import os
import cv2
import tempfile
from PIL import Image

app = Flask(__name__)
CORS(app)

# Batas maksimal file upload (5MB)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

# Inisialisasi PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang='en')

# Ekstensi file yang diizinkan
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/ocr', methods=['POST'])
def ocr_image():
    print('Received request:', request.files)

    if 'image' not in request.files:
        print('No image file provided')
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    if file.filename == '':
        print('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        print('Unsupported file type')
        return jsonify({'error': 'Unsupported file type'}), 400

    print(f"File received: {file.filename}, type: {file.mimetype}")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
            file_path = tmp.name

            # Konversi menggunakan PIL agar format aman untuk OCR
            image = Image.open(file.stream).convert("RGB")
            image.save(file_path, format='JPEG')

        # Validasi gambar
        img = cv2.imread(file_path)
        if img is None:
            print('Failed to read image')
            os.remove(file_path)
            return jsonify({'error': 'Invalid or corrupted image'}), 400

        # Proses OCR
        result = ocr.ocr(file_path, cls=True)
        texts = []
        if result and isinstance(result, list):
            for line in result:
                for word_info in line:
                    texts.append(word_info[1][0])

    except Exception as e:
        print('OCR error:', str(e))
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({'error': f'OCR failed: {str(e)}'}), 500

    if os.path.exists(file_path):
        os.remove(file_path)

    return jsonify({'texts': texts}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
