import { generate } from "gas-entry-generator";

async function buildForGAS() {
  const result = await Bun.build({
    entrypoints: [
      "src/setFigmaImageUrl.ts",
      "src/insertFigmaImage.ts",
      "src/genFigma2HTML.ts",
      "src/insertFigma2HTML.ts",
      "src/genFigmaQA.ts",
    ],
    outdir: "dist",
  });

  for (const artifact of result.outputs) {
    const code = await Bun.file(artifact.path).text();
    const output = generate(code);

    await Bun.write(
      artifact.path,
      `var global=this;\n${output.entryPointFunctions}\n(() => {\n${code}\n})();`
    );
  }
}

buildForGAS();
