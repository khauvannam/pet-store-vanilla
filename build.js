// build.js
import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/main.js', 'src/home.js', 'src/product.js'], // Add all your entry points
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    outdir: 'dist', // Outputs each bundled file in the `dist` folder
}).then(() => {
    console.log('Build complete.');
}).catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
});


// Build CSS
esbuild.build({
    entryPoints: ['src/style.css'], // Replace with your main CSS file or use a glob pattern
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'dist',
    loader: {
        '.css': 'text',
    },
}).then(() => {
    console.log('CSS build complete.');
}).catch((error) => {
    console.error('CSS build failed:', error);
    process.exit(1);
});