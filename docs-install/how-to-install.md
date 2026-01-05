# インストール方法

Type Scrpt/Java Script 等のモジュールをまだインストールしていなければ、以下のコマンドを打鍵してください：  

（パワーシェルではなく）コマンドプロンプトを使う。  

* `node_modules` フォルダーを削除。
* `src-tauri/target` フォルダーを削除。
* `pnpm-lock.yaml` ファイルを削除。

```shell
# 通常はこれだけ
pnpm install

# それでダメならこれ
#pnpm install --shamefully-hoist
```


## 通常じゃなければ

NAS は UNCパスを使うのが難点で、 vite や esbuild など様々なものが UNCパスに対応してない。  
実質、NAS は開発用ディレクトリーには使うことができない。  

```shell
pnpm add -D vite @vitejs/plugin-vue
pnpm add -D @tauri-apps/cli

# VSCode に TypeScript の型定義を教える
pnpm add -D @types/node

# Tauri の NPM/Rust 両方のバージョンの統一
pnpm add -D @tauri-apps/cli@latest @tauri-apps/api@latest @tauri-apps/plugin-opener@latest @tauri-apps/plugin-dialog@latest @tauri-apps/plugin-fs@latest

pnpm install --shamefully-hoist
```

👆 コケた！  

`node_modules/esbuild` は、 NAS の UNCパスに対応してないらしい。  
手動インストールするか？  

```shell
# PowerShell
cd node_modules/esbuild
#node install.js
pnpm add -D esbuild@latest --force
```


