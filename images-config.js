// ===================================
// LUMINA STUDIO LP - 画像設定ファイル
// ===================================
// このファイルで全ての画像パスを一元管理できます
// 画像を差し替える際は、このファイルのパスを変更するだけでOKです

const IMAGES = {
    // ===================================
    // Hero Section - 背景画像
    // ===================================
    heroBackground: null,  // 背景画像（オプション）nullの場合はグラデーション背景
    // 例: 'assets/images/hero-bg.jpg'

    // ===================================
    // Hero Section - Before/After比較
    // ===================================
    hero: {
        before: 'assets/images/before.png',  // 商品画像のみ（推奨: 800x1000px以上）
        after: 'assets/images/after.png'     // AI生成モデル着用写真（推奨: 800x1000px以上）
    },

    // ===================================
    // AI生成サンプルギャラリー
    // ===================================
    samples: [
        'assets/images/sample1.jpg',  // サンプル1（推奨: 600x800px以上）
        'assets/images/sample2.jpg',  // サンプル2（推奨: 600x800px以上）
        'assets/images/sample3.jpg'   // サンプル3（推奨: 600x800px以上）
    ],

    // ===================================
    // 活用シーン
    // ===================================
    useCases: {
        ec: 'assets/images/usecase_ec.jpg',    // EC商品画像（推奨: 1200x800px以上）
        sns: 'assets/images/usecase_sns.jpg',  // SNS投稿（推奨: 1200x800px以上）
        ad: 'assets/images/usecase_ad_banner.png'        // 広告バナー（推奨: 1200x800px以上）
    }
};

// ===================================
// 画像を自動的に適用する関数
// ===================================
function applyImages() {
    // Hero Section - 背景画像
    if (IMAGES.heroBackground) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${IMAGES.heroBackground}')`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            heroSection.style.backgroundRepeat = 'no-repeat';
        }
    }

    // Hero Section - Before画像
    const beforeImg = document.querySelector('.comparison-container .comparison-item:first-child img');
    if (beforeImg) {
        beforeImg.src = IMAGES.hero.before;
        beforeImg.alt = '商品画像のみ';
    }

    // Hero Section - After画像
    const afterImg = document.querySelector('.comparison-container .comparison-item:last-child img');
    if (afterImg) {
        afterImg.src = IMAGES.hero.after;
        afterImg.alt = 'AIで生成されたモデル着用写真';
    }

    // AI生成サンプルギャラリー
    const galleryItems = document.querySelectorAll('.image-gallery .gallery-item img');
    galleryItems.forEach((img, index) => {
        if (IMAGES.samples[index]) {
            img.src = IMAGES.samples[index];
            img.alt = `AI生成サンプル${index + 1}`;
        }
    });

    // 活用シーン - EC
    const ecImg = document.querySelector('.use-case-card:nth-child(1) .use-case-image img');
    if (ecImg) {
        ecImg.src = IMAGES.useCases.ec;
        ecImg.alt = 'EC商品画像';
    }

    // 活用シーン - SNS
    const snsImg = document.querySelector('.use-case-card:nth-child(2) .use-case-image img');
    if (snsImg) {
        snsImg.src = IMAGES.useCases.sns;
        snsImg.alt = 'SNS投稿';
    }

    // 活用シーン - 広告
    const adImg = document.querySelector('.use-case-card:nth-child(3) .use-case-image img');
    if (adImg) {
        adImg.src = IMAGES.useCases.ad;
        adImg.alt = '広告バナー';
    }
}

// ===================================
// ページ読み込み時に画像を適用
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyImages);
} else {
    applyImages();
}

// ===================================
// 使い方
// ===================================
// 1. 画像ファイルを assets/images/ フォルダに配置
// 2. このファイルの IMAGES オブジェクトのパスを変更
// 3. ブラウザをリロード（⌘+R）
//
// 例：
// heroBackground: 'assets/images/hero-bg.jpg',  // 背景画像を設定
// hero: {
//     before: 'assets/images/my-product.jpg',
//     after: 'assets/images/my-model-photo.jpg'
// }
