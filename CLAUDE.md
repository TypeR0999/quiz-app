# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 応答ルール

- 返答は必ず日本語で行うこと。

## プロジェクト概要

- プロジェクト名：quiz-app
- 内容：一般常識クイズアプリ
- 技術スタック：HTML / CSS / JavaScript（フレームワーク・ビルドツールなし）

## 実行方法

- ビルド工程はない。`index.html` をブラウザで直接開いて動作確認する。
- npm パッケージは使わない前提。導入が必要になった場合は、先にユーザーへ確認すること。

## 秘密情報のルール

- API キーは `.env` ファイルで管理し、コードに直接書かない。
- `.env` は絶対に GitHub にアップロードしない。`.gitignore` に `.env` を入れてあるので、この行を消さないこと。コミットの前に `.env` が含まれていないか確認する。
- このアプリはブラウザだけで動くため、ブラウザの JavaScript から `.env` は読めない。また、ブラウザに渡した API キーは誰でも見られる。API キーが必要な機能を作るときは、実装の前にユーザーへ方針（サーバー側で扱う構成にするなど）を相談すること。

## 構成

- `index.html`：クイズ画面（`#quiz-screen`）と結果画面（`#result-screen`）の2つを持ち、`hidden` 属性で切り替える。
- `script.js`：先頭の `quizzes` 配列が問題データ。各問題は `question`・`choices`（4つ）・`answer`（正解の位置、0 から数える）を持つ。問題の追加・変更はこの配列だけを編集すればよく、問題数は配列の長さから自動で決まる。
- `style.css`：`[hidden] { display: none !important; }` を入れているため、`display` を指定した要素も `hidden` で隠せる。正解・不正解の色は `.correct`／`.wrong` クラスで付ける。
