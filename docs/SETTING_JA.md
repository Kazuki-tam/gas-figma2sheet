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
- `OPENAI_API_KEY`: OpenAI APIキー（オプション / AIによる生成処理では必須）
- `OPENAI_MODEL`: OpenAIモデル（オプション）

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgg8v3fazw9pk7jyzqly.png)

`FIGMA_FILE_KEY`はFigmaファイルURLから取得できます。たとえば、URLが`https://www.figma.com/design/xxxxxxxxxxxx/`の場合、キーは`xxxxxxxxxxxx`です。

FigmaファイルURLの全体構成：
`https://www.figma.com/:file_type/:file_key/:file_name.`

## スクリプトを実行する
2通りの方法でスクリプトを実行できます。

- Google Sheetsでカスタム関数として使用する方法
- カスタムメニューとして使用する方法

### カスタム関数
カスタム関数を使用して、FigmaデータをGoogle Sheetsにインポートできます。最初の引数としてノードIDを指定して画像として出力します。ノードIDはFigma URLから取得できます。URLの`node-id=x-x`の部分がノードIDです。

`https://www.figma.com/design/[file_key]/[file_name]?node-id=x-x`

ノードIDは`0:1`のような形式で指定します。

#### `FIGMA_IMAGE_URL`関数
FigmaノードIDを指定して、画像URLを取得します。

```
=FIGMA_IMAGE_URL("node-id")
```

これを[IMAGE](https://support.google.com/docs/answer/3093333)関数と組み合わせることで、画像を表示できます。

```
=IMAGE(FIGMA_IMAGE_URL("node-id"))
```

#### `FIGMA_HTML`関数
FigmaノードIDを指定して、デザインデータからHTML、CSS、JavaScriptを生成します。

```
=FIGMA_HTML("node-id")
```

第2引数に`prompt`を指定することで、追加指示を入れることができます。

```
=FIGMA_HTML("node-id", "prompt")
```

#### `FIGMA_QA`関数
FigmaノードIDを指定して、デザインデータをベースに質問が行えます。

```
=FIGMA_QA("node-id", "prompt")
```


### カスタムメニュー
カスタムメニューからスクリプトを実行することもできます。カスタムメニューから`Figma2Sheet`を実行して、アクティブセルに画像を挿入します。

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aq3yjozs802nevlgqiok.png)
