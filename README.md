# gas-figma2sheet

This is a Google Apps Script project to import Figma data into Google Sheets.

## Status

[![Release (latest by date)](https://img.shields.io/github/v/release/Kazuki-tam/gas-figma2sheet)](https://github.com/Kazuki-tam/gas-figma2sheet/releases/tag/v0.0.1)
[![Issues](https://img.shields.io/github/issues/Kazuki-tam/gas-figma2sheet)](https://github.com/Kazuki-tam/gas-figma2sheet/issues)
![Maintenance](https://img.shields.io/maintenance/yes/2024)
![Release date](https://img.shields.io/github/release-date/Kazuki-tam/gas-figma2sheet)

## Features
- Import Figma data into Google Sheets
- Ask questions based on the design data
- Generate HTML, CSS, and JavaScript from design data
- Deploy the project code without development
- Develop, test, and bundle TypeScript with Bun
- Format and lint with Biome

## Main dependencies

- [Figma](https://www.figma.com/)
- [Google Apps Script](https://workspace.google.com/products/apps-script/)
- [Clasp](https://github.com/google/clasp)
- [Biome](https://biomejs.dev/)

### Available LLMs
- [Google Gemini](https://gemini.google.com/)
- [OpenAI](https://openai.com/)

## Prerequisites

- [Google Sheets](https://workspace.google.com/products/sheets/)
- [Figma API](https://www.figma.com/developers/api)
- [Bun](https://bun.sh/)

### Optional
To use AI features, you need to use the following APIs.
- [Gemini API](https://ai.google.dev/gemini-api/docs)
- [OpenAI API](https://openai.com/index/openai-api/)

## How to use

Clone this repository and install dependencies.

```bash
bun install
```

## Project setup
Please refer to [SETTING.md](/docs/SETTING.md) for the setup.

### Login to Google account

```shell
bun run login
```

## Connect to your existing project

Create a `.clasp.json` at the root, and then add these settings. Open the App Script from your spreadsheet and check out the script ID on the settings page. If you don't have a project, create a new spreadsheet.

```json
{
  "scriptId": "<SCRIPT_ID>",
  "rootDir": "./dist"
}
```

Deploy your code to the existing project.

```shell
bun run deploy
```

### Open Apps Script editor
You can open the Apps Script editor with the following command. Add the script properties in the editor.

```shell
bun run open
```

## License
MIT
