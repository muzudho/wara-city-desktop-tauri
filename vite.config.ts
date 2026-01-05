import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// // @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    root: process.cwd(),    // プロジェクトのルートディレクトリを現在の作業ディレクトリに設定。NASパスにされるのを回避。
    plugins: [vue()],
    resolve: {
        alias: {
            // [2025-07-29_Tue] import 文で、.vue ファイルへのパスに @ エイリアスを使えるようにするための設定。
            // 設定前： import Tile from '../components/Tile.vue';  // @のエイリアスが使えない
            // 設定後： import Tile from '@/components/Tile.vue';   // @のエイリアスが使える
            '@': '/src',  // ここで@をsrcディレクトリにマッピング
        },
    },

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
        ? {
            protocol: "ws",
            host,
            port: 1421,
        }
        : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
