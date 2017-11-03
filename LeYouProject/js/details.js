

$(function(){
	
	var myArr = [];
	
	//获取当前商品的id
	var params = location.search.substring(1);
	//console.log(params); ?id=103;
	var myId = getParam(params, "id");
	//console.log(id); //102
	var myIndex = getParam(params, "index");
			
	//获取和当前id相同的商品数据
	$.get("json/goods.json", function(arr){
		myArr = arr;
		for (var i=0; i<arr.length; i++){
			if (arr[i].id == myId) {
				
				//当前id的商品数据
				var obj = arr[i];
				fn(obj);

				break;
			}
		}
	})
	
	//显示当前商品的数据
	function fn(obj){
		$(".imgchange").attr("src", obj.img1);
		$(".goodsname").html("【乐海淘】"+obj.name+"【保税区直发】");
		$(".goodsPrice").html(obj.unit+obj.price);
		$(".jifen").html("送积分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+obj.price);
		


		var li1 = $("<li></li>").appendTo("#goodsImgUL");
		$("<img id='tupian1' src="+ obj.img1 +" >").appendTo(li1);
		var li2 = $("<li></li>").appendTo("#goodsImgUL");
		$("<img id='tupian2' src="+ obj.img2 +" >").appendTo(li2);
		var li3 = $("<li></li>").appendTo("#goodsImgUL");
		$("<img id='tupian3' src="+ obj.img3 +" >").appendTo(li3);
		var li4 = $("<li></li>").appendTo("#goodsImgUL");
		$("<img id='tupian4' src="+ obj.img4 +" >").appendTo(li4);

		$("#goodsImgUL").on("mouseenter","#tupian1",function () {
			$(".imgchange").attr("src", obj.img1);
		})
		
		$("#goodsImgUL").on("mouseenter","#tupian2",function () {
			$(".imgchange").attr("src", obj.img2);
		})

		$("#goodsImgUL").on("mouseenter","#tupian3",function () {
			$(".imgchange").attr("src", obj.img3);
		})
			
		$("#goodsImgUL").on("mouseenter","#tupian4",function () {
			$(".imgchange").attr("src", obj.img4);
		})		

	}
	
	
	//获取对应参数的值： id=102&s=123&p=aa
	function getParam(params, key){
		var arr = params.split("&");
		for (var i=0; i<arr.length; i++) {
			var str = arr[i]; //id=102
			var arr2 = str.split("=");
			if (arr2[0] == key) {
				return arr2[1];
			}
		}
		return "";
	}


	//等比公式
	//小图width/大图width == 小区域width/大区域width
	$("#smallArea").width( $("#smallImgs").width() * $("#bigArea").width() / $("#bigImg").width() );
	$("#smallArea").height( $("#smallImgs").height() * $("#bigArea").height() / $("#bigImg").height() );
	
	//放大系数
	var scale = $("#bigImg").width() / $("#smallImgs").width();
	
	//在小图中移动
	$("#smallImgs").mousemove(function(e){
		$("#smallArea").show(); //显示小区域
		$("#bigArea").show(); //显示大区域
		
		
		var x = e.pageX - $("#smallImgs").offset().left - $("#smallArea").width()/2;
		var y = e.pageY - $("#smallImgs").offset().top - $("#smallArea").height()/2;
		
		//控制不超出左右边界
		if (x < 0){
			x = 0;
		}
		else if (x > $("#smallImgs").width()-$("#smallArea").width()){
			x = $("#smallImgs").width()-$("#smallArea").width();
		}
		//控制不超出上下边界
		if (y < 0){
			y = 0
		}
		else if (y > $("#smallImgs").height()-$("#smallArea").height()) {
			y = $("#smallImgs").height()-$("#smallArea").height();
		}
		
		//小区域移动
		$("#smallArea").css({left:x, top:y});
		
		//大图移动
		$("#bigImg").css({left: -scale*x,top: -scale*y});
	})
	
	//移除小图
	$("#smallImgs").mouseleave(function(){
		$("#smallArea").hide(); //隐藏小区域
		$("#bigArea").hide(); //隐藏大区域
	})
	
/*	$("#count").on("click",".reduce",function(){
		
		var index = $(this).index("#count .reduce");
					
			var arr = JSON.parse($.cookie("cart"));
			arr[index].num--;
			if (arr[index].num < 1) {
				arr[index].num = 1;
			}
			$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
			$("#count .num").val() = arr[index].num;
	})
	
	$("#count").on("click",".add",function(){
		var index = $(this).index("#count .add");

			var arr = JSON.parse($.cookie("cart"));
			arr[index].num++;
			$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
			$("#count .num").val() = arr[index].num;
	})
*/	
	//加入购物车
	$("#addtoCart a").click(function(){
		
		var obj = myArr[myIndex];
		
		//加入购物车
		var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
			
		for (var i=0; i<arr.length; i++) {
			if (arr[i].id == obj.id) {
				arr[i].num++; 

				break;
			}
		}
		
		//如果不存在相同的商品，则加入到数组arr中
		if (i == arr.length){
			obj.num = 1;
			obj.ischecked = true; //选中状态， 默认选中
			arr.push(obj);
		}
		
		//$.cookie()
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"} );
		console.log( $.cookie("cart") );
		
		alert("加入购物车成功！");
				
	})
	
	$("#gotoCart a").click(function(){
		location.href = "cart.html";
	})
	
})