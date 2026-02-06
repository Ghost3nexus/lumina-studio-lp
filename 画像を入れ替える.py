#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
LUMINA STUDIO LP - 画像入れ替えツール (Python版)

使い方:
    python3 画像を入れ替える.py
"""

import os
import shutil
import sys
from pathlib import Path

# カラー出力用
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*50}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.BLUE}  {text}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*50}{Colors.ENDC}\n")

def print_success(text):
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_error(text):
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

def print_info(text):
    print(f"{Colors.YELLOW}📝 {text}{Colors.ENDC}")

def ensure_assets_dir():
    """assets/imagesディレクトリを確保"""
    assets_dir = Path("assets/images")
    if not assets_dir.exists():
        print_info("assets/images フォルダを作成しています...")
        assets_dir.mkdir(parents=True, exist_ok=True)
        print_success("フォルダを作成しました")
    return assets_dir

def copy_image(source_path, dest_name):
    """画像ファイルをコピー"""
    source = Path(source_path.strip().strip("'\""))
    
    if not source.exists():
        print_error(f"ファイルが見つかりません: {source}")
        return False
    
    dest = Path("assets/images") / dest_name
    
    try:
        shutil.copy2(source, dest)
        print_success(f"{dest_name} を更新しました")
        return True
    except Exception as e:
        print_error(f"コピーに失敗しました: {e}")
        return False

def update_config_hint(key, value):
    """images-config.js の更新ヒントを表示"""
    print_info("images-config.js を更新してください:")
    print(f"   {key}: '{value}',")

def main():
    print_header("LUMINA STUDIO LP - 画像入れ替えツール")
    
    # assetsディレクトリの確認
    ensure_assets_dir()
    
    # メニュー表示
    print("どの画像を入れ替えますか？\n")
    print("1) 【★現在のトップ画像】 (hero-main.jpg)")
    print("2) 旧背景画像 (hero-bg.jpg) - 現在は未使用")
    print("3) Before画像 (before.png/jpg)")
    print("4) After画像 (after.png/jpg)")
    print("5) 生成サンプル画像 (sample1 ~ sample20)")
    print("6) EC用途画像 (usecase_ec.jpg)")
    print("7) SNS用途画像 (usecase_sns.jpg)")
    print("8) 広告バナー画像 (usecase_ad_banner.png)")
    print("0) すべての画像を一括入れ替え\n")
    
    choice = input("番号を選択してください (0-8): ").strip()
    
    if choice == "0":
        print("\n📸 すべての画像を一括入れ替えます")
        folderpath = input("画像が入っているフォルダのパスを入力 (ドラッグ&ドロップ可): ")
        folder = Path(folderpath.strip().strip("'\""))
        
        if not folder.exists() or not folder.is_dir():
            print_error("フォルダが見つかりません")
            sys.exit(1)
        
        # 画像ファイルを取得
        image_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
        images = sorted([f for f in folder.iterdir() if f.suffix in image_extensions])
        
        print(f"\n📁 フォルダ内の画像: {len(images)}枚")
        for i, img in enumerate(images[:10], 1):
            print(f"   {i}. {img.name}")
        
        print("\n⚠️  一括更新モードでは主要な画像のみ更新されます。")
        
        confirm = input("\n続行しますか？ (y/n): ").strip().lower()
        
        if confirm == 'y':
            # Basic mapping for bulk update
            mapping = [
                ("hero-main.jpg", None),
                ("before.jpg", None),
                ("after.jpg", None),
                ("sample1.png", None),
                ("sample2.png", None),
                ("sample3.png", None),
                ("sample4.png", None),
                ("sample5.png", None),
                ("usecase_ec.jpg", None),
                ("usecase_sns.jpg", None),
            ]
            
            for i, (dest_name, config_key) in enumerate(mapping):
                if i < len(images):
                    if copy_image(str(images[i]), dest_name):
                        if config_key:
                            update_config_hint(config_key, f"assets/images/{dest_name}")
            
            print_success("主要な画像を更新しました")
        else:
            print("❌ キャンセルしました")
            sys.exit(0)

    elif choice == "1":
        print("\n📸 ヒーローメイン画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        copy_image(filepath, "hero-main.jpg")
    
    elif choice == "2":
        print("\n📸 ヒーロー背景画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        if copy_image(filepath, "hero-bg.jpg"):
            update_config_hint("heroBackground", "assets/images/hero-bg.jpg")
    
    elif choice == "3":
        print("\n📸 Before画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        source = Path(filepath.strip().strip("'\""))
        ext = source.suffix
        if copy_image(filepath, f"before{ext}"):
            update_config_hint("before", f"assets/images/before{ext}")
    
    elif choice == "4":
        print("\n📸 After画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        source = Path(filepath.strip().strip("'\""))
        ext = source.suffix
        if copy_image(filepath, f"after{ext}"):
            update_config_hint("after", f"assets/images/after{ext}")
    
    elif choice == "5":
        print("\n📸 生成サンプル画像を入れ替えます")
        try:
            sample_num = int(input("入れ替えるサンプルの番号を入力してください (1-20): "))
            if 1 <= sample_num <= 20:
                filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
                copy_image(filepath, f"sample{sample_num}.png")
            else:
                print_error("1から20の間で指定してください")
        except ValueError:
            print_error("数値を入力してください")
    
    elif choice == "6":
        print("\n📸 EC用途画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        copy_image(filepath, "usecase_ec.jpg")
    
    elif choice == "7":
        print("\n📸 SNS用途画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        copy_image(filepath, "usecase_sns.jpg")

    elif choice == "8":
        print("\n📸 広告バナー画像を入れ替えます")
        filepath = input("画像ファイルのパスを入力 (ドラッグ&ドロップ可): ")
        copy_image(filepath, "usecase_ad_banner.png")
        update_config_hint("useCases.ad", "assets/images/usecase_ad_banner.png")
    
    else:
        print_error("無効な選択です")
        sys.exit(1)
    
    # 完了メッセージ
    print_header("🎉 完了！")
    print("📋 次のステップ:")
    print("1. ブラウザをリロード (⌘+R)")
    print("2. 画像が正しく表示されるか確認\n")
    print("💡 ヒント:")
    print("- 画像が表示されない場合は images-config.js のパスを確認")
    print("- 再度このスクリプトを実行: python3 画像を入れ替える.py\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n終了します")
        sys.exit(0)
    except Exception as e:
        print_error(f"エラーが発生しました: {e}")
        sys.exit(1)
