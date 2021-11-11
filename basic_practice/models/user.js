const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10; // salt가 몇글자인지? -> 10글자의 salt를 만들어서 암호화한다
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

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

// save()함수가 불리면 저장하기전에
userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    // 비밀번호를 암호화시킨후 pre()를 종료한다.
    // Salt를 이용해서 암호화할것이라서 1. generateSalt
    bcrypt.genSalt(saltRounds, (err, salt) => {
      // 여기서 salt : genSalt를 통해 얻어진 salt
      if (err) return next(err);
      // 2. 해쉬화하는과정
      // user.password : 유저가 입력한 비밀번호
      // user.password + salt -> hash
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

module.exports = mongoose.model("User", userSchema);
