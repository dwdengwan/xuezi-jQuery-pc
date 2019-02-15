$(function(){
  function loadPage(pno=0){
    var kwords=decodeURI(
      location.search.split("=")[1]);
    $.ajax({
      url:"http://localhost:3000/products",
      type:"get",
      data:{kwords,pno},
      dataType:"json",
      success:function(output){
        var {products,pageCount}=output;
        var html="";
        for(var p of products){
          var {lid,md,price,title}=p;
          //复制23~41行到此
          html+=`<div class="col-md-4 p-1">
            <div class="card mb-4 box-shadow pr-2 pl-2">
              <a href="product_details.html?lid=${lid}">
                <img class="card-img-top" src="${md}">
              </a>
              <div class="card-body p-0">
                <h5 class="text-primary">￥${price.toFixed(2)}</h5>
                <p class="card-text">
                  <a href="product_details.html?lid=${lid}" class="text-muted small">${title}</a>
                </p>
                <div class="d-flex justify-content-between align-items-center p-2 pt-0">
                  <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                  <input type="text" class="form-control p-1" value="10">
                  <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                  <a class="btn btn-primary float-right ml-1 pl-1 pr-1" href="cart.html">加入购物车</a>
                </div>
              </div>
            </div>
          </div>`;
        }
        $("#plist").html(html);

        html=`<li class="page-item"><a class="page-link bg-transparent" href="#">上一页</a></li>`;
        for(var i=0;i<pageCount;i++){
          html+=i!=pno?`<li class="page-item"><a class="page-link bg-transparent" href="#">${i+1}</a></li>`:`<li class="page-item active"><a class="page-link border" href="#">${i+1}</a></li>`;
        }
        html+=`<li class="page-item"><a class="page-link bg-transparent" href="#">下一页</a></li>`;
        $("#plist+h6 ul").html(html);
        var $firstLi=$("#plist+h6 ul>li:first");
        if(pno==0)//如果pno=0
          //第一个禁用
          $firstLi.addClass("disabled");
        //否则 第一个启用
        var $lastLi=$("#plist+h6 ul>li:last");
        //如果pno=pageCount-1
        if(pno==pageCount-1)
          //最后一个禁用
          $lastLi.addClass("disabled")
        //否则 最后一个启用
      }
    })//live server运行details.html，
      //手动添加?kwords=i5
  }
  loadPage();
  $("#plist+h6 ul")
  .on("click","a",function(e){
    e.preventDefault();
    var pno;
    if($(this).html()=="上一页"){
      pno=?;
    }else if($(this).html()=="下一页"){
      pno=?;
    }else
      pno=$(this).html()-1;
    loadPage(pno);
  })
})


//	  uphone=15574886598&upwd=789654&uname=hxy