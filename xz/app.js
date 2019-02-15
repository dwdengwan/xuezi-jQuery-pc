//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
/*引入路由模块*/
const index=require("./routes/index.router")
const details=require("./routes/details.router")
const products=require("./routes/products.router")
var app = express();
var server = app.listen(3000);
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(cors({
  origin:"http://127.0.0.1:5500"
}))
/*使用路由器来管理路由*/
app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
//http://localhost:3000/products/?kwords=i5&pno=0

