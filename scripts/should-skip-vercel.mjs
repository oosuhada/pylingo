const branch = process.env.VERCEL_GIT_COMMIT_REF ?? '';
const message = process.env.VERCEL_GIT_COMMIT_MESSAGE ?? '';

const metadataBranches = new Set(['repo-order']);
const skip = metadataBranches.has(branch) || /\[skip ci\]/i.test(message);

if (skip) {
  console.log(`Skipping Vercel preview for metadata-only branch: ${branch || '<unknown>'}`);
  process.exit(0);
}

console.log(`Running Vercel build for branch: ${branch || '<unknown>'}`);
process.exit(1);
