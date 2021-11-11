const mongoose = require("mongoose");
/*
Schema : 해당 컬렉션의 문서에 어떤 타입의 값이 들어가는지 정의
Model : 스키마를 통해 만드는 인스턴스
이 model을 통해 데이터베이스에 실제 작업을 할 수 있도록 한다.
*/

//new가 있어야함
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: Number,
    // 0 : 일반유저, 1 : Admin유저, 2 : Master유저
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    // token의 유효기간(Auth인증의 유효기간)
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
