import { copyFile, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'dist');
const requiredFiles = [
  'index.html',
  'python-styles.css',
  'python-data2.js',
  'python-app-core.js',
  'python-app-practice.js',
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const file of requiredFiles) {
  const source = path.join(root, file);
  const info = await stat(source).catch(() => null);
  if (!info?.isFile()) {
    throw new Error(`Missing static asset required for Vercel output: ${file}`);
  }
  await copyFile(source, path.join(outDir, file));
}

console.log(JSON.stringify({ site: 'pylingo', outputDirectory: 'dist', files: requiredFiles.length }));
