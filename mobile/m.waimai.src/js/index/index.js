/**
 * Created by Administrator on 2017/9/7.
 */

//主页面间的跳转
$(".part").on("click",".product-btn",function(){
    window.location.href = "./solution.html"
}).on("click",".solution-btn",function(){
    window.location.href = "./plans.html"
}).on("click",".case-btn",function(){
    //window.location.href = "./case.html"
}).on("click",".agent-btn",function(){
    window.location.href = "./agency.html"
}).on("click",".win-btn",function(){
    window.location.href = "./product.html"
}).on("click",".contact-btn",function(){
    $(".mask-tel").fadeIn()
});

//点击其他部分  二维码消失
//$(".mask-erwei").click(function(e){
//    var $img = e.target.nodeName;
//    if($img != "IMG"){
//        $(".mask-erwei").fadeOut()
//    }
//});
//点击其他部分  拨号弹出框消失
$(".mask-tel").click(function(e){
    var $a = e.target.nodeName;
    var $c = e.target.classList[1];
    if($c == "mask-tel" || $c == "remove"){
        $(".mask-tel").fadeOut()
    }
});