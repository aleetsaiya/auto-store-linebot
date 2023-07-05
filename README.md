# Auto Store Linebot

## Introduction
Enabling users to update Firebase database by sending a Line message.

## Getting Start
```bash
git clone git@github.com:aleetsaiya/auto-store-linebot.git

cd auto-store-linebot

## Install Firebase tools
npm install -g firebase-tools

## Install frontend dependencies
cd frontend
npm install 

## Install backend dependencies
cd ../backend
npm install
```

## Flow
![app structure](./pictures/drawIO.jpg)

## Deploy onto Firebase
+ Frontend : `firebase deploy --only hosting`
+ Backend : `firebase deploy --only functions`

## Languages & Frameworks
+ Node.js
+ Express
+ React
+ Typescript
+ Material UI

## Third Party Services
+ Firebase
+ Line Message API
