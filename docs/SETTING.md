# Setting up the project
This is a Google Apps Script project that retrieves data from Figma and imports image data into Google Sheets via the API. Follow the steps below to set it up.

1. Obtain an access token to use the [Figma API](https://www.figma.com/developers/api).
2. Set script properties in your Google Apps Script project.
3. Run the script.

## Create a personal access token
Create your personal access token on the Figma account settings page. This token is used to access the Figma API.

Access tokens are sensitive information. Do not expose them in your code or in untrusted environments.

[📖 Figma Learn - Manage personal access tokens](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens)

It is recommended to set an expiration date for access tokens and update them periodically.

## Set Script Properties
We will use the Properties Service to handle information such as access tokens. Open the App Script from the target Google Sheet and set the script properties.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zyhrsgkxi34qgkw8rpxo.png)

Set the following script properties in the App Script project.

- `FIGMA_API_TOKEN`: Your Figma personal access token
- `FIGMA_FILE_KEY`: The key of the Figma file you want to import
- `OPENAI_API_KEY`: OpenAI API key (optional / required for AI generation processing)
- `OPENAI_MODEL`: OpenAI model (optional)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgg8v3fazw9pk7jyzqly.png)

The `FIGMA_FILE_KEY` is the last part of the Figma file URL. For example, if the URL is `https://www.figma.com/design/xxxxxxxxxxxx/`, the key is `xxxxxxxxxxxx`.

The file key can be parsed from any Figma file URL:
`https://www.figma.com/:file_type/:file_key/:file_name.`

## Run the script
This project provides two methods: using it as a custom function in Google Sheets and using it as a custom menu.

### Custom Function
You can import Figma data into Google Sheets using custom functions. Specify the node ID as the first argument to output it as an image. The node ID can be obtained from the Figma URL. The part of the URL `node-id=x-x` is the node ID.

`https://www.figma.com/design/[file_key]/[file_name]?node-id=x-x`

The node ID is specified in a format like `0:1`.

#### `FIGMA_IMAGE_URL` Function
Specify the Figma node ID to get the image URL.

```
=FIGMA_IMAGE_URL("node-id")
```

By combining this with the [IMAGE](https://support.google.com/docs/answer/3093333) function, you can display the image.

```
=IMAGE(FIGMA_IMAGE_URL("node-id"))
```

#### `FIGMA_HTML` Function
Specify the Figma node ID to generate HTML, CSS, and JavaScript from the design data.

```
=FIGMA_HTML("node-id")
```

You can specify `prompt` as the second argument to add additional instructions.

```
=FIGMA_HTML("node-id", "prompt")
```

#### `FIGMA_QA` Function
Specify the Figma node ID to ask questions based on the design data.

```
=FIGMA_QA("node-id", "prompt")
```

### Custom menu
You can also run the script from the custom menu. Run the `Figma2Sheet` from the custom menu to insert the image into the active cell.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aq3yjozs802nevlgqiok.png)
