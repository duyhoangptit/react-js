var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false });

var arrayList = [
    "Nguyen Van A",
    "Nguyen Van B",
    "Nguyen Van C",
    "Nguyen Van D",];

// Chung ta noi voi app muon doc cac file tinh thi doc o folder nao
// Moi request tu server se vao public de tim
app.use(express.static("public"));
// Thong bao cho node biet view minh dung engine ejs
app.set("view engine", "ejs");
// Chua cac trang giao dien
app.set("views", "./views");

app.get("/", function (req, res) {
    res.render("dardboard");
});

app.get("/todo-list", function (req, res) {
    res.render("home-page");
});

app.get("/mock-todo-list", function (req, res) {
    res.send(arrayList);
});

app.post("/add", parser, function (req, res) {
    var note = req.body.note;

    arrayList.push(note);

    res.send(arrayList);
});

app.post("/update", parser, function (req, res) {
    var id = req.body.id;
    arrayList[id] = req.body.note;

    res.send(arrayList);
});

app.post('/delete', parser, function (req, res) {
    var id = req.body.id;

    arrayList.splice(id, 1);

    res.send(arrayList);
});

// app se lang nghe port nao
app.listen(3000);