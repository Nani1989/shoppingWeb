$(function(){
	
	var myArr = [];
	
	$.get("json/goods.json", function(arr){
		myArr = arr;
		
		for (var i=0; i<arr.length; i++) {
			var obj = arr[i];
			
			var li = $("<li></li>").appendTo("#HTlist");
			$("<img src="+ obj.country +" >").appendTo(li);
			$("<img src="+ obj.img1 +" >").appendTo(li);
			$("<span>"+ obj.unit + obj.price +"</span>").appendTo(li);
			$("<a>"+ obj.name +"</a>").appendTo(li);
			
		}
		
	})
	
	
	//点击商品进入商品详情
	$("#HTlist").on("click", "li", function(){
		
		//下标
		var index = $(this).index();
		
		//当前点击的商品对象
		var obj = myArr[index];
		//console.log(obj.id);
		
		//进入商品详情
		location.href = "details.html?id=" + obj.id+"&index="+index;
	})
	
	$("#HTlist").on("mouseenter","li",function(){
	$(this).css("box-shadow","5px 5px 5px #ccc")
	});
	
	$("#HTlist").on("mouseleave","li",function(){
	$(this).css("box-shadow"," none");
	});

})