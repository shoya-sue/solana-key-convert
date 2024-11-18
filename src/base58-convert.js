const fs = require('fs');
const bs58 = require('bs58').default || require('bs58');

// ファイルパスを指定
const filePath = 'private-key.json';

// ファイルを読み込む
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('ファイルの読み込みに失敗しました:', err);
        return;
    }

    try {
        // JSONファイルのデータをパース
        const keyArray = JSON.parse(data);

        if (!Array.isArray(keyArray)) {
            throw new Error('ファイルの内容が配列ではありません。配列形式の秘密鍵を提供してください。');
        }

        // 配列からBase58形式に変換
        const keyBuffer = Buffer.from(keyArray);
        const base58Key = bs58.encode(keyBuffer);

        // CLI上に表示
        console.log('Base58形式の秘密鍵:', base58Key);
    } catch (parseError) {
        console.error('JSONデータのパースに失敗しました:', parseError);
    }
});
