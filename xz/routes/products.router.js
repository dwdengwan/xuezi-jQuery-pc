const express=require("express");
const router=express.Router();
const pool=require("../pool");
//http://localhost:3000/products
router.get("/",(req,res)=>{
  var kwords=req.query.kwords;
  var pno=req.query.pno;
  if(pno===undefined) pno=0;
  //macbook i5 128g
  kwords=kwords.split(" ");
  //[macbook,i5,128g]
  var arr=kwords.map(function(){
    return " title like ? ";
  })
  //[title like ? , title like ? , title like ?]
  var titles=arr.join(" and ");
  //title like ? and title like ? and title like ?
  var sql="select * ,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop where "+titles;
  kwords.forEach(function(val,i,arr){
    kwords[i]=`%${val}%`;
  })
  //[%macbook%,%i5%,%128g%]
  pool.query(sql,kwords,(err,result)=>{
    if(err) console.log(err);
    var count=result.length;
    var pageCount=Math.ceil(count/9)
    var products=result.slice(pno*9,pno*9+9)
                              //0
                              //9
                              //18
    var output={pno,count,pageCount,products}
    res.send(output);
  })
})

module.exports=router;