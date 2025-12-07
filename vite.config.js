import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
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