/**
 * Node.js에서 MariaDB 연결 설정
 */

require('dotenv').config();                       // .env 파일에 정의된 환경 변수 로드
const mariadb = require('mariadb');               // mariadb 모듈 불러와 DB와의 연결 관리

const conn = mariadb.createConnection({           // createConnection 메서드를 사용하여 DB 연결 관리
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5
});

module.exports.conn = conn;                       // conn 객체를 모듈로 내보내기