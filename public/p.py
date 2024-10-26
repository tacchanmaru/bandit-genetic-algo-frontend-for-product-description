import os
from PIL import Image

def compress_images_in_folder(folder_path, quality=50):
    """
    指定したフォルダ内のすべてのjpg画像を画質を下げて圧縮します。ネストされたフォルダ内も含めます。

    :param folder_path: 画像を圧縮するフォルダのパス
    :param quality: 圧縮後の画質（1〜100で指定、デフォルトは50）
    """
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(".jpg") or file.lower().endswith(".jpeg"):
                file_path = os.path.join(root, file)
                
                # 画像を開き、画質を下げて再保存
                try:
                    with Image.open(file_path) as img:
                        img = img.convert("RGB")  # RGBに変換
                        img.save(file_path, "JPEG", quality=quality)
                        print(f"圧縮済み: {file_path}")
                except Exception as e:
                    print(f"エラーが発生しました: {file_path} - {e}")

# 使用例
compress_images_in_folder('./photo', quality=30)