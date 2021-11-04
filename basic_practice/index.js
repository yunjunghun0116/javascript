//시작점
const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://junghun:junghun@basicapppractice.tymmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", function (req, res) {
  res.send("Got a POST request");
});
app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});
app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
