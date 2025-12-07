import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 3000,
        open: true
    },

    build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
     rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images';
                    } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
                        extType = 'fonts';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js'
            }
        }
  },
    css: {
    preprocessorOptions: {
      scss: {
        api: 'modern', // используем modern API
        // additionalData: `
        //   @use "sass:meta";
        //   @use "./scss/variables" as *;
        // `
      }
    }
  }
});