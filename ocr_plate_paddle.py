from paddleocr import PaddleOCR, draw_ocr
import cv2
import matplotlib.pyplot as plt

def read_plate(image_path):
    # Inisialisasi PaddleOCR
    ocr = PaddleOCR(use_angle_cls=True, lang='en')
    # Baca gambar
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Gambar {image_path} tidak ditemukan")
    # Lakukan OCR
    results = ocr.ocr(image_path, cls=True)
    # Ekstrak hasil
    boxes = [line[0] for line in results[0]]
    txts = [line[1][0] for line in results[0]]
    scores = [line[1][1] for line in results[0]]
    # Tentukan path font
    font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" # Ganti dengan path font Anda
    # Gambar hasil OCR
    im_show = draw_ocr(img, boxes, txts, scores, font_path=font_path)
    # Tampilkan hasil
    plt.imshow(im_show)
    plt.show()
    return txts

if __name__ == "__main__":
    image_path = "pn1.jpg"
    read_plate(image_path)