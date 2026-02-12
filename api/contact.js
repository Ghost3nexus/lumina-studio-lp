const { Resend } = require('resend');

// Resend APIクライアント初期化
const resend = new Resend(process.env.RESEND_API_KEY);

// CORS設定
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async (req, res) => {
    // OPTIONSリクエスト（プリフライト）対応
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ ok: true });
    }

    // POSTメソッドのみ許可
    if (req.method !== 'POST') {
        return res.status(405).json({
            ok: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    try {
        // リクエストボディから送信データを取得
        const { company, name, email, contact_type, message, honeypot } = req.body;

        // Honeypotスパム対策チェック
        if (honeypot) {
            console.log('Spam detected via honeypot');
            // スパムの場合も成功レスポンスを返す（ボットに気づかせない）
            return res.status(200).json({ ok: true });
        }

        // 必須項目チェック
        if (!company || !name || !email || !contact_type || !message) {
            return res.status(400).json({
                ok: false,
                error: '必須項目が入力されていません。'
            });
        }

        // メールアドレスの簡易バリデーション
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                ok: false,
                error: '有効なメールアドレスを入力してください。'
            });
        }

        // 環境変数から通知先メールアドレスを取得
        const toEmail = process.env.CONTACT_TO_EMAIL || 'tomorrowprooftokyo@gmail.com';

        // お問い合わせ種別の日本語変換
        const contactTypeMap = {
            'demo': '無料相談・デモ依頼',
            'pricing': '料金プランについて',
            'technical': '技術的な質問',
            'partnership': '業務提携について',
            'other': 'その他'
        };
        const contactTypeLabel = contactTypeMap[contact_type] || contact_type;

        // Resend APIでメール送信
        const data = await resend.emails.send({
            from: 'LUMINA STUDIO <onboarding@resend.dev>', // 本番環境では独自ドメインに変更
            to: [toEmail],
            subject: `【LUMINA STUDIO】お問い合わせ: ${contactTypeLabel}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #9F7AEA 0%, #D97706 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: 600;
              color: #666;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .value {
              background: white;
              padding: 12px;
              border-radius: 4px;
              border: 1px solid #e0e0e0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #999;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">LUMINA STUDIO</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">新しいお問い合わせが届きました</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">お問い合わせ種別</div>
              <div class="value">${contactTypeLabel}</div>
            </div>
            <div class="field">
              <div class="label">会社名</div>
              <div class="value">${company}</div>
            </div>
            <div class="field">
              <div class="label">ご担当者名</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">メールアドレス</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">ご相談内容</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>このメールはLUMINA STUDIO LPのお問い合わせフォームから自動送信されました。</p>
            <p>送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
          </div>
        </body>
        </html>
      `,
        });

        console.log('Email sent successfully:', data);

        // 成功レスポンス
        return res.status(200).json({
            ok: true,
            message: 'お問い合わせを受け付けました。'
        });

    } catch (error) {
        console.error('Error sending email:', error);

        // エラーレスポンス
        return res.status(500).json({
            ok: false,
            error: 'メール送信に失敗しました。しばらくしてから再度お試しください。',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
