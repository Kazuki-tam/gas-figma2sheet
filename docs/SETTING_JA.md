# プロジェクトの設定
このGoogle Apps Scriptプロジェクトは、Figmaからデータを取得し、APIを介して画像データをGoogle Sheetsにインポートします。以下の手順にしたがって設定してください。

1. [Figma API](https://www.figma.com/developers/api)を使用するためのアクセストークンを取得します。
2. Google Apps Scriptプロジェクトにスクリプトプロパティを設定します。
3. スクリプトを実行します。

## 個人アクセストークンを作成する
Figmaのアカウント設定ページでパーソナルアクセストークンを作成します。このトークンはFigma APIにアクセスするために使用されます。

アクセストークンは機密情報です。コード内や信頼できない環境で直接公開しないでください。

[📖 Figma Learn - 個人アクセストークンの管理](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens)

※ アクセストークンには有効期限を設定し、定期的に更新することをオススメします。

## スクリプトプロパティを設定する
アクセストークンなどの情報を扱うためにProperties Serviceを使用します。対象のGoogle SheetからApp Scriptを開き、スクリプトプロパティを設定します。

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zyhrsgkxi34qgkw8rpxo.png)

App Scriptプロジェクトに以下のスクリプトプロパティを設定します。

- `FIGMA_API_TOKEN`: あなたのFigmaパーソナルアクセストークン
- `FIGMA_FILE_KEY`: インポートしたいFigmaファイルのキー

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgg8v3fazw9pk7jyzqly.png)

## スクリプトプロパティを設定する

App Scriptプロジェクトに以下のスクリプトプロパティを設定します。

- `FIGMA_API_TOKEN`: あなたのFigmaパーソナルアクセストークン
- `FIGMA_FILE_KEY`: インポートしたいFigmaファイルのキー

`FIGMA_FILE_KEY`はFigmaファイルURLの最後の部分です。たとえば、URLが`https://www.figma.com/design/xxxxxxxxxxxx/`の場合、キーは`xxxxxxxxxxxx`です。

FigmaファイルURLからファイルキーを解析できます：
`https://www.figma.com/:file_type/:file_key/:file_name.`

## スクリプトを実行する
このプロジェクトは、Google Sheetsでカスタム関数として使用する方法とカスタムメニューとして使用する方法の2つの方法を提供します。

### カスタム関数
`FIGMA_IMAGE_URL`カスタム関数を使用して、FigmaデータをGoogle Sheetsにインポートできます。最初の引数としてノードIDを指定して画像として出力します。ノードIDはFigma URLから取得できます。URLの`node-id=x-x`の部分がノードIDです。

`https://www.figma.com/design/[file_key]/[file_name]?node-id=x-x`

ノードIDは`0:1`のような形式で指定します。

```
=FIGMA_IMAGE_URL("node-id")
```

これを[IMAGE](https://support.google.com/docs/answer/3093333)関数と組み合わせることで、画像を表示できます。

```
=IMAGE(FIGMA_IMAGE_URL("node-id"))
```

### カスタムメニュー
カスタムメニューからスクリプトを実行することもできます。カスタムメニューから`Figma2Sheet`を実行して、アクティブセルに画像を挿入します。

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aq3yjozs802nevlgqiok.png)
