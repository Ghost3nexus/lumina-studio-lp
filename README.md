# LUMINA STUDIO Landing Page

AIファッションフォト生成 × クリエイティブ制作サービスのランディングページ

## 📁 プロジェクト構成

```
LUMINA STUDIO LP/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript
├── assets/
│   └── images/         # 画像フォルダ
│       ├── before.png  # Hero: Before画像
│       ├── after.png   # Hero: After画像
│       ├── sample1.png # AI生成サンプル1
│       ├── sample2.png # AI生成サンプル2
│       ├── sample3.png # AI生成サンプル3
│       ├── usecase_ec.png  # EC用途画像
│       └── usecase_sns.png # SNS用途画像
└── README.md           # このファイル
```

## 🖼️ 画像の差し替え方法

実際のLUMINA生成画像に差し替える際は、以下のファイルを置き換えてください：

### Hero Section (Before/After比較)
- `assets/images/before.png` - 商品画像のみ（フラットレイまたはマネキン）
- `assets/images/after.png` - AIで生成されたモデル着用写真

### AI生成サンプルギャラリー
- `assets/images/sample1.png` - サンプル画像1
- `assets/images/sample2.png` - サンプル画像2
- `assets/images/sample3.png` - サンプル画像3

### 活用シーン
- `assets/images/usecase_ec.png` - EC商品画像の例
- `assets/images/usecase_sns.png` - SNS投稿の例

**推奨画像サイズ:**
- Before/After: 800x1000px 以上（縦長）
- サンプル: 600x800px 以上
- 活用シーン: 1200x800px 以上（横長）

## 🚀 ローカルで確認する方法

### 方法1: シンプルなHTTPサーバー（Python）
```bash
cd "LUMINA STUDIO LP"
python3 -m http.server 8000
```
ブラウザで `http://localhost:8000` を開く

### 方法2: Live Server（VS Code拡張機能）
1. VS Codeで「Live Server」拡張機能をインストール
2. `index.html`を右クリック → "Open with Live Server"

### 方法3: 直接ブラウザで開く
`index.html`をダブルクリックしてブラウザで開く

## 📸 画像の差し替え方法

### 🚀 自動スクリプトを使う（おすすめ）

**Pythonスクリプト（推奨）:**
```bash
python3 画像を入れ替える.py
```

**シェルスクリプト:**
```bash
./画像を入れ替える.sh
```

**特徴:**
- 📁 画像ファイルをドラッグ&ドロップするだけ
- ✅ 自動的に正しい場所にコピー
- 💡 設定ファイルの更新方法も表示
- 🎯 一括入れ替えにも対応

### 📝 手動で差し替える

`images-config.js`ファイルを編集：

```javascript
const IMAGES = {
    heroBackground: 'assets/images/hero-bg.jpg',  // ヒーロー背景（オプション）
    hero: {
        before: 'assets/images/before.png',
        after: 'assets/images/after.jpg'
    },
    samples: [
        'assets/images/sample1.jpg',
        'assets/images/sample2.jpg',
        'assets/images/sample3.jpg'
    ],
    useCases: {
        ec: 'assets/images/usecase_ec.jpg',
        sns: 'assets/images/usecase_sns.jpg',
        ad: 'assets/images/sample1.jpg'
    }
};
```

詳細は [`画像差し替えガイド.md`](画像差し替えガイド.md) を参照してください。

---

## 🎨 デザインのカスタマイズ特徴

### カラーパレット
- **ダークモード**: 深い黒 (#0a0a0a, #1a1a1a)
- **アクセント**: パープル (#C084FC) → ゴールド (#F59E0B) グラデーション
- **テキスト**: ホワイト (#ffffff) / グレー (#a0a0a0)

### タイポグラフィ
- **見出し**: Playfair Display (セリフ体)
- **本文**: Inter (サンセリフ体)

### デザインパターン
- フルスクリーンヒーロー画像
- グラスモーフィズム効果
- スムーズなスクロールアニメーション
- レスポンシブデザイン（モバイル対応）

## 📝 カスタマイズ

### 連絡先情報の変更
`index.html`の以下の箇所を編集：
```html
<!-- Contact Section -->
<a href="mailto:info@lumina-studio.com" class="btn-large btn-primary">お問い合わせ</a>
<a href="https://forms.gle/example" target="_blank" class="btn-large btn-secondary">デモ依頼</a>
```

### 料金プランの変更
`index.html`の`#pricing`セクションを編集

### FAQの追加・編集
`index.html`の`#faq`セクションで質問と回答を追加・編集

## 🔧 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: カスタムプロパティ、グリッドレイアウト、フレックスボックス
- **Vanilla JavaScript**: モバイルメニュー、FAQ、スムーズスクロール
- **Google Fonts**: Playfair Display, Inter

## 📱 レスポンシブ対応

- デスクトップ: 1400px以上
- タブレット: 768px - 1399px
- モバイル: 767px以下

## 🌐 デプロイ

### Vercel（推奨）

**GitHubから自動デプロイ:**
1. [Vercel](https://vercel.com/)にログイン
2. "Import Project" → GitHubリポジトリを選択
3. プロジェクト設定:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (空欄)
   - Output Directory: (空欄)
4. "Deploy"をクリック

**自動デプロイ設定:**
- `main`ブランチへのプッシュで自動デプロイ
- プルリクエストごとにプレビューURL生成
- カスタムドメイン設定可能

**ローカルからデプロイ:**
```bash
npm install -g vercel
cd "LUMINA STUDIO LP"
vercel
```

### Netlify
1. [Netlify](https://www.netlify.com/)にログイン
2. "LUMINA STUDIO LP"フォルダをドラッグ&ドロップ

### GitHub Pages
1. GitHubリポジトリを作成
2. ファイルをプッシュ
3. Settings → Pages → ソースを選択

## 📋 フォーム機能

### お問い合わせフォーム
- **場所**: `index.html` の `#contact` セクション
- **必須項目**: 会社名、担当者名、メールアドレス、お問い合わせ種別、相談内容
- **スパム対策**: Honeypotフィールド実装済み
- **送信後**: `thanks.html` にリダイレクト

### Google広告コンバージョン計測
`thanks.html` にGoogle広告のコンバージョントラッキングコードを追加してください:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXX'
  });
</script>
```

## 📧 お問い合わせ

ご質問やサポートが必要な場合は、お気軽にお問い合わせください。

---

© 2026 LUMINA STUDIO. All rights reserved.
