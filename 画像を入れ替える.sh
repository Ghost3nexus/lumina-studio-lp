#!/bin/bash

# ===================================
# LUMINA STUDIO LP - 画像入れ替えツール
# ===================================
# 
# 使い方:
# 1. このスクリプトを実行: ./画像を入れ替える.sh
# 2. 画面の指示に従って画像ファイルをドラッグ&ドロップ
# 3. 自動的に正しい場所にコピーされます
#

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  LUMINA STUDIO LP - 画像入れ替えツール"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# assetsディレクトリの確認
if [ ! -d "assets/images" ]; then
    echo "📁 assets/images フォルダを作成しています..."
    mkdir -p assets/images
    echo "✅ フォルダを作成しました"
    echo ""
fi

# メニュー表示
echo "どの画像を入れ替えますか？"
echo ""
echo "1) ヒーローメイン画像 (hero-main.jpg)"
echo "2) ヒーロー背景画像 (hero-bg.jpg)"
echo "3) Before画像 (before.png/jpg)"
echo "4) After画像 (after.png/jpg)"
echo "5) サンプル1 (sample1.jpg)"
echo "6) サンプル2 (sample2.jpg)"
echo "7) サンプル3 (sample3.jpg)"
echo "8) EC用途画像 (usecase_ec.jpg)"
echo "9) SNS用途画像 (usecase_sns.jpg)"
echo "0) すべての画像を一括入れ替え"
echo "q) 終了"
echo ""
read -p "番号を選択してください (0-9): " choice

case $choice in
    1)
        echo ""
        echo "📸 ヒーローメイン画像を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/hero-main.jpg"
        echo "✅ ヒーローメイン画像を更新しました"
        ;;
    2)
        echo ""
        echo "📸 ヒーロー背景画像を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/hero-bg.jpg"
        echo "✅ ヒーロー背景画像を更新しました"
        echo ""
        echo "📝 images-config.js を更新してください:"
        echo "   heroBackground: 'assets/images/hero-bg.jpg',"
        ;;
    3)
        echo ""
        echo "📸 Before画像を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        
        # 拡張子を取得
        ext="${filepath##*.}"
        eval cp "$filepath" "assets/images/before.$ext"
        echo "✅ Before画像を更新しました (before.$ext)"
        echo ""
        echo "📝 images-config.js を更新してください:"
        echo "   before: 'assets/images/before.$ext',"
        ;;
    4)
        echo ""
        echo "📸 After画像を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        
        ext="${filepath##*.}"
        eval cp "$filepath" "assets/images/after.$ext"
        echo "✅ After画像を更新しました (after.$ext)"
        echo ""
        echo "📝 images-config.js を更新してください:"
        echo "   after: 'assets/images/after.$ext',"
        ;;
    5)
        echo ""
        echo "📸 サンプル1を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/sample1.jpg"
        echo "✅ サンプル1を更新しました"
        ;;
    6)
        echo ""
        echo "📸 サンプル2を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/sample2.jpg"
        echo "✅ サンプル2を更新しました"
        ;;
    7)
        echo ""
        echo "📸 サンプル3を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/sample3.jpg"
        echo "✅ サンプル3を更新しました"
        ;;
    8)
        echo ""
        echo "📸 EC用途画像を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/usecase_ec.jpg"
        echo "✅ EC用途画像を更新しました"
        ;;
    9)
        echo ""
        echo "📸 SNS用途画像を入れ替えます"
        echo "画像ファイルをドラッグ&ドロップしてEnterを押してください:"
        read -e filepath
        filepath="${filepath//\'/}"
        filepath="${filepath//\"/}"
        filepath="${filepath// /\\ }"
        eval cp "$filepath" "assets/images/usecase_sns.jpg"
        echo "✅ SNS用途画像を更新しました"
        ;;
    9)
        echo ""
        echo "📸 すべての画像を一括入れ替えます"
        echo ""
        echo "画像が入っているフォルダをドラッグ&ドロップしてEnterを押してください:"
        read -e folderpath
        folderpath="${folderpath//\'/}"
        folderpath="${folderpath//\"/}"
        folderpath="${folderpath// /\\ }"
        
        echo ""
        echo "📁 フォルダ内の画像を確認しています..."
        eval ls -1 "$folderpath"
        echo ""
        echo "⚠️  上記のファイルを以下のように配置します:"
        echo "   - 最初の画像 → before"
        echo "   - 2番目の画像 → after"
        echo "   - 3番目の画像 → sample1"
        echo "   - 4番目の画像 → sample2"
        echo "   - 5番目の画像 → sample3"
        echo "   - 6番目の画像 → usecase_ec"
        echo "   - 7番目の画像 → usecase_sns"
        echo ""
        read -p "続行しますか？ (y/n): " confirm
        
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            # 画像ファイルを配列に格納
            eval images=("$folderpath"/*.{jpg,jpeg,png,JPG,JPEG,PNG})
            
            [ -f "${images[0]}" ] && cp "${images[0]}" "assets/images/before.jpg" && echo "✅ before.jpg"
            [ -f "${images[1]}" ] && cp "${images[1]}" "assets/images/after.jpg" && echo "✅ after.jpg"
            [ -f "${images[2]}" ] && cp "${images[2]}" "assets/images/sample1.jpg" && echo "✅ sample1.jpg"
            [ -f "${images[3]}" ] && cp "${images[3]}" "assets/images/sample2.jpg" && echo "✅ sample2.jpg"
            [ -f "${images[4]}" ] && cp "${images[4]}" "assets/images/sample3.jpg" && echo "✅ sample3.jpg"
            [ -f "${images[5]}" ] && cp "${images[5]}" "assets/images/usecase_ec.jpg" && echo "✅ usecase_ec.jpg"
            [ -f "${images[6]}" ] && cp "${images[6]}" "assets/images/usecase_sns.jpg" && echo "✅ usecase_sns.jpg"
            
            echo ""
            echo "✅ すべての画像を更新しました"
        else
            echo "❌ キャンセルしました"
        fi
        ;;
    0)
        echo "終了します"
        exit 0
        ;;
    *)
        echo "❌ 無効な選択です"
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 完了！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 次のステップ:"
echo "1. ブラウザをリロード (⌘+R)"
echo "2. 画像が正しく表示されるか確認"
echo ""
echo "💡 ヒント:"
echo "- 画像が表示されない場合は images-config.js のパスを確認"
echo "- 再度このスクリプトを実行: ./画像を入れ替える.sh"
echo ""
