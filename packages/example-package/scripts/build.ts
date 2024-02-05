import fs from 'fs-extra'
import { build } from 'tsup'

async function updateAndCopyPackageJson() {
  const pkg = await fs.readJSON('package.json')

  pkg.exports = {
    '.': {
      import: {
        types: './index.d.ts',
        default: './index.js',
      },
      require: {
        types: './index.d.cts',
        default: './index.cjs',
      },
      types: './index.d.ts',
      default: './index.js',
    },
  }

  await fs.writeJSON('dist/package.json', pkg, { spaces: 2 })
}

await fs.remove('dist')

await build({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  dts: true,
  treeshake: true,
})

await updateAndCopyPackageJson()
