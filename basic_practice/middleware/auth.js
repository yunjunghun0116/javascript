const User = require("../models/user");

let auth = (req, res, next) => {
  // 이곳에서 인증처리를 함
  // 1. 클라이언트의 쿠키에서 토큰을 가져온다.
  // 2. 토큰의 value(user._id)로 유저를 찾고 있으면 인증 success,없으면 인증 fail
  let token = req.cookies.x_auth;
  User.findByToken(token, (err, userInfo) => {
    if (err) return res.json({ isAuth: false, msg: err });
    if (!userInfo)
      return res.json({ isAuth: false, msg: "해당 유저가 존재하지않음" });
    // userInfo에서는 해당 token을 갖고있는 유저를 리턴받음

    //여기에서 req.token과 req.user에 각각 정보를 넣어주는 이유는
    //app.js에서 app.get(/auth)에서 req.user,req.token을 사용하기위함이다
    req.token = token;
    req.user = userInfo;
    next();
  });
};

module.exports = { auth };
