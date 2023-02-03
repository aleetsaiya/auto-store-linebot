# auto store linebot

## 功能
讓使用者能夠在傳送 Line 訊息的同時更新資料庫，並在前端頁面上顯示資料庫的內容。

## 安裝
```bash
git clone git@github.com:aleetsaiya/auto-store-linebot.git

cd auto-store-linebot

## 安裝前端套件
npm install

## 移動到後端資料夾
cd functions

## 安裝後端套件
npm install
```

## 使用者流程
![app structure](./pictures/drawIO.jpg)

## 資料夾
+ src - 前端程式碼放置處
+ public - 前端程式碼的 production，`firebase deploy` 會將 public 資料夾內的檔案部署到 Firebase 上
+ functions - 後端程式碼的放置處
+ pictures - `README.md` 文件使用到的圖片位置

## 使用技術
+ Node.js
+ Express
+ React
+ Material UI

## 第三方服務
+ Firebase Hoisting, Functions, Authentication, Realtime database
+ Line Message API