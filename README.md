# auto store linebot

## 功能
讓使用者能夠透過傳送 Line 訊息更新 Firebase 資料庫，並建立網頁顯示 Firebase 資料庫內容。

## 安裝
```bash
git clone git@github.com:aleetsaiya/auto-store-linebot.git

cd auto-store-linebot

## 安裝 Firebase tools
npm install -g firebase-tools

## 安裝前端套件
cd frontend
npm install 

## 安裝後端套件
cd ../backend
npm install
```

## 使用者流程
![app structure](./pictures/drawIO.jpg)

## 檔案介紹
+ `frontend` : 前端程式碼放置處
+ `backend` : 後端程式碼放置處
+ `pictures` : `README.md` 使用到的圖片
+ `firebase.json` : Firebase 設定檔。告訴 Firebase hosting 以及 Firebase functions 該如何對應到程式碼

## 部署至 Firebase
在根目錄執行以下程式碼 : 

+ 部署前端 : `firebase deploy --only hosting`
+ 部署後端 : `firebase deploy --only functions`

## 使用技術
+ Node.js
+ Express
+ React
+ Typescript
+ Material UI

## 第三方服務
+ Firebase
+ Line Message API