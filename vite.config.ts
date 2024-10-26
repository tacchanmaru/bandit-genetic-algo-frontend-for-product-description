import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["assets/favicon.ico"],
      manifest: {
        name: "PWA Hoge App",
        short_name: "App Name",
        description: "test app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "assets/192_sample_img.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/512_sample_img.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg}"], // オフライン対応のためのキャッシュ対象ファイルパターン
        globIgnores: ["**/sw.js", "**/manifest.webmanifest"], // キャッシュ除外対象
        navigateFallback: "/index.html", // ナビゲーションのフォールバック設定
      },
    }),
  ],
});
