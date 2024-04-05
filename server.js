const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 루트 경로에 대한 GET 요청 처리
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
