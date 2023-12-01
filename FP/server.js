    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const cors = require("cors");
    const ObjectId = mongoose.Types.ObjectId;

    app.use(cors());
    app.use(express.json());

    // 連接至 MongoDB
    mongoose.connect("mongodb+srv://41171112h:tahrd115@cluster0.etdqrs3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (error) => {
    console.error("MongoDB 連接錯誤:", error);
    });

    db.once("open", () => {
    console.log("已成功連接至 MongoDB");
    });
    // Express 路由處理添加問題
    app.post('/addQuestion', express.json(), (req, res) => {
        const { questionText, answerText } = req.body;

        if (!questionText || !answerText) {
            return res.status(400).json({ error: '需要提供問題和答案。' });
        }

        // 將問題和答案插入資料庫
        db.collection('questions').insertOne({ questionText, answerText }, (err, result) => {
            if (err) {
                console.error('插入文件時出錯：', err);
                return res.status(500).json({ error: '內部伺服器錯誤' });
            }

            res.status(201).json({ message: '成功添加問題' });
        });
    });

// 啟動伺服器
app.listen(3001, () => {
    console.log(`伺服器正在運行，地址：http://localhost:3001`);
});
