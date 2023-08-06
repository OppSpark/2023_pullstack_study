#!/usr/bin/node
const express = require('express');
const mysql = require('mysql');

const static = require('serve-static')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { resourceUsage } = require('process');



app.use(express.static(path.join(__dirname,'views')));

express.applic


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'./', 'views', 'MAIN.html'));
});


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'./','views', 'REGISTER.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'views','LOGIN.html'));
});
app.get('/new_post', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'views','NEW_POST.html'));
});


 



//디비 정보 불러오는 내용
const dbConfig = {
	host: 'localhost', 
	user: 'OppSpark',
	port: 3306,
	password: '1515', 
	database: '23_S', 
  };
  
  // MySQL 데이터베이스 연결 설정
  const connection = mysql.createConnection(dbConfig);
  
  // 데이터베이스 연결 확인
  connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to database: ', err);
	  return;
	}
	console.log('Connected to database!');
  });






  //회원 가입 구현

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
	console.log('reg page');
	const {re_email, re_name, re_pw } = req.body;
  
	// MySQL에 회원 정보 삽입
	const sql = 'INSERT INTO user_info (user_id, user_name, user_pw) VALUES (?, ?, ?)';
	connection.query(sql, [re_email, re_name, re_pw], (err, result) => {
	  if (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to register' });
	  } else {
		res.json({ message: 'Successfully registered' });
	  }
	});
  });
  


  // NEW POST 구현 방법
// mysql 문법 INSERT INTO post_data (post_title, post_content, data_time) VALUES ('제목이 무엇인가요?', '여기는 내용입니다.', NOW());

app.post('/new_post', (req, res) => {

	if (!'new_ti' || !'new_con') {
		console.log('제목과 타이틀 중 값이 null 임');
		return;
	  }


	const {new_ti, new_con } = req.body;

	const inst = 'INSERT INTO post_data (post_title, post_content, data_time) VALUES (?, ?, NOW())';
	connection.query(inst, [new_ti, new_con], (err, result)=> {
	if (err) {
		 console.log('알 수 없는 오류가 발생했습니다.');
		 return;
	}
	else{
		console.log('성공!');
		return c;
	}
});
});




  

  //로그인 구현

 app.post('/login', (req, res) => {
	console.log('로그인');
	const {lo_id, lo_pw } = req.body;
	const sql = 'SELECT * FROM 23_S.user_info WHERE user_id = ? AND user_pw = ?';
	connection.query(sql, [lo_id, lo_pw], (err, result) =>{
		
            if (!result[0]) {
                // 해당 id로 등록된 유저 정보가 없을 경우
				console.log('login fail');
                res.redirect('/login');
            }else{
				// DB에 해당 ID가 있을 경우
				console.log('pass');
			}
			
	
		
	})
});
 

app.use(
	cors({
		origin: 'http://hometex.or1.shop',
		credentials:true,
	})
);

app.use(
	cors({
		origin: 'http://175.112.124.90:3000',
		credentials:true,
	})
);



app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
