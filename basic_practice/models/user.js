const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10; // salt가 몇글자인지? -> 10글자의 salt를 만들어서 암호화한다
const jwt = require("jsonwebtoken");

/*
Schema : 해당 컬렉션의 문서에 어떤 !타입!의 값이 들어가는지 정의
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
  image: String,
  token: String,
  tokenExp: Number,
  // token의 유효기간(Auth인증의 유효기간)
});

// save()함수가 불리면 저장하기전에
userSchema.pre("save", function (next) {
  let user = this;
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
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (inputPassword, callbackFunc) {
  bcrypt.compare(inputPassword, this.password, function (err, isMatch) {
    //입력된 password와 userSchema의 password가 동일할경우 isMatch가 true로 리턴되고 만약 err가 있을경우 err를 리턴한다.
    //사실상 err는 잘 출력안되고 isMatch가 boolean으로서 true/false로 리턴된다.
    if (err) return callbackFunc(err);
    callbackFunc(null, isMatch);
  });
};

//JWT JsonWebToken 생성하는방식 - jsonwebtoken library 사용
userSchema.methods.generateToken = function (callbackFunc) {
  // jsonwebtoken을 이용해서 token생성하기
  let user = this;
  //user._id를 할경우 mongodb에서 plainObject를 기대했지만 Object(~~)와 같은 객체가 반환되었기때문에
  //이를 plainObject(ex string,int 등과같은) 값으로 형변환해주어야한다
  const token = jwt.sign(user._id.toHexString(), "userJsonWebToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return callbackFunc(err);
    else {
      callbackFunc(null, user);
    }
  });
};

/*
userSchema.methods vs userSchema.statics
methods vs statics 는 차이점이 this가 가리키는 값이다.
methods : this가 호출하는값이 자기자신 즉
abc.methods -> this가 abc를 가리킨다.
하지만 statics : this가 UserSchema 즉 model자체를 가리킨다.
findByToken에서 methods가 아닌 static를 하는 이유는
함수안에있는 findOne이 mongoose모델 안에서 작동하는 함수이기때문이다.
*/

//인증처리할때 auth에서 token을 이용해 유저 찾기
userSchema.statics.findByToken = function (token, callbackFunc) {
  const user = this;
  //토큰을 복호화하는 과정 ( token : user._id와 userJsonWebToken이라는 string이 합쳐진 것이기때문에 user._id만 빼내기 위한 과정)
  jwt.verify(token, "userJsonWebToken", function (err, decodedToken) {
    user.findOne({ _id: decodedToken, token: token }, function (err, userInfo) {
      if (err) return callbackFunc(err);
      else {
        callbackFunc(null, userInfo);
      }
    });
  });
};

module.exports = mongoose.model("User", userSchema);
