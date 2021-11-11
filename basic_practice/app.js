//시작점
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// bodyParser기능과 동일
app.use(express.urlencoded({ extended: true }));
// json타입으로 된것을 분석해준다.
app.use(express.json());

const config = require("./config/key");

const User = require("./models/user");

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
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err)
      return res.json({
        success: false,
        msg: err,
      });
    return res.status(200).json({
      success: true,
    });
  });
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
