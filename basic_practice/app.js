//시작점
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const config = require("./config/key");
const User = require("./models/user");
const { auth } = require("./middleware/auth");
/*
userToken을 저장할수있는곳은 localStoragge,Cookie,Session 등과같은곳이있다
여기서 Cookie와 WebStorage(localStorage,SessionStorage)로 나뉜다.
-쿠키의 경우는 HTTP통신의 무상태성을 보완하기위해 나온것으로
서버에서 접근할 수 있는것이 가장큰 특성이다
http 요청시 자동으로 포함된다.
-WebStorage는 서버에서 접근할 수 없다는 특징이있다
--sessionStorage는 세션이 종료되면 모두 삭제된다(브라우저 종료시 삭제된다)
--localStorage는 반영구적으로 저장가능하지만 서버에서 접근불가한다는 공통점을 갖는다.

그렇기때문에 HttpOnly속성으로 JS를 차단할수있는 Cookie가 보안에 조금더 좋을수있다.
WebStorage는 JavaScript에서 접근이가능하기때문이다.
또한 WebStorage는 서버에서 접근할수없어서 보낼때 파싱해서 보내야한다.
*/
const cookieParser = require("cookie-parser");

// bodyParser기능과 동일
app.use(express.urlencoded({ extended: true }));
// json타입으로 된것을 분석해준다.
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});
// 중간에 있는 auth : middleware
app.get("/api/users/auth", auth, (req, res) => {
  //여기서부터 실행되는 코드는 auth를 통과했다는 의미이고, 결국 해당 유저는 제대로 로그인된 상태라는의미와 같다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 1 ? true : false,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, msg: err });
    return res.status(200).send({
      success: true,
    });
  });
});
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err)
      return res.json({
        success: false,
        msg: err,
      });
    return res.status(200).json({
      success: true,
      user: userInfo,
    });
  });
});
app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 확인
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        success: false,
        msg: "해당 이메일의 유저가 존재하지 않습니다",
      });
    } else {
      // mongoDB에 저장된 해쉬화된 비밀번호와 같은지 체크
      userInfo.checkPassword(req.body.password, (err, isMatch) => {
        // 에러처리
        if (err) return res.json({ success: false, msg: err });
        // isMatch가 false로 반환되었을경우
        if (!isMatch) {
          return res.json({ success: false, msg: "비밀번호가 틀렸습니다." });
        }
        // 올바르게 입력된경우 여기로 오고, 그때 token을 생성
        userInfo.generateToken((err, userInfo) => {
          if (err) return res.status(400).send(err);
          else {
            // 토큰을 쿠키/로컬스토리지/세션 등에 저장
            // cookie에다가 key : x_auth, value : userInfo.token 을 저장한다.
            res.cookie("x_auth", userInfo.token).status(200).json({
              success: true,
              userId: userInfo._id,
            });
          }
        });
      });
    }
  });
  //요청된 이메일이 데이터베이스에 있다면 맞는 비밀번호인지 확인
  //이메일,비밀번호가 올바르게 입력되었을경우 token생성하기
});
// app.put("/user", (req, res) => {
//   res.send("Got a PUT request at /user");
// });
// app.delete("/user", (req, res) => {
//   res.send("Got a DELETE request at /user");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
