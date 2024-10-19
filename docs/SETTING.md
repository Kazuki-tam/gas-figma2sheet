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

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgg8v3fazw9pk7jyzqly.png)

## Set Script Properties

Set the following script properties in the App Script project.

- `FIGMA_API_TOKEN`: Your Figma personal access token
- `FIGMA_FILE_KEY`: The key of the Figma file you want to import

The `FIGMA_FILE_KEY` is the last part of the Figma file URL. For example, if the URL is `https://www.figma.com/design/xxxxxxxxxxxx/`, the key is `xxxxxxxxxxxx`.

The file key can be parsed from any Figma file URL:
`https://www.figma.com/:file_type/:file_key/:file_name.`

## Run the script
This project provides two methods: using it as a custom function in Google Sheets and using it as a custom menu.

### Custom function
You can use the `FIGMA_IMAGE_URL` custom function to import Figma data into Google Sheets. Specify the Node ID as the first argument to output it as an image. The Node ID can be obtained from the Figma URL. The part `node-id=x-x` in the URL is the Node ID.

`https://www.figma.com/design/[file_key]/[file_name]?node-id=x-x`

The Node ID should be specified in a format like `0:1`.

```
=FIGMA_IMAGE_URL("node-id")
```

By combining it with the [IMAGE](https://support.google.com/docs/answer/3093333) function, you can display the image.

```
=IMAGE(FIGMA_IMAGE_URL("node-id"))
```

### Custom menu
You can also run the script from the custom menu. Run the `Figma2Sheet` from the custom menu to insert the image into the active cell.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aq3yjozs802nevlgqiok.png)
