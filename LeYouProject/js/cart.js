$(function(){
	
	refresh();
				function refresh() {
					
					//获取cookie的数据
					var arr = $.cookie("cart");
					if (arr) {
						
						arr = JSON.parse(arr);
						
						
						//清空所有子节点
						$("#list").empty();
						
						//总价
						var totalPrice = 0;
						
						if (arr.length > 0) {
							
							//添加新节点
							//遍历数组arr， 显示购物车商品
							for (var i=0; i<arr.length; i++) {
								var obj = arr[i];
								
								//li
								var li = $("<li></li>").appendTo("#list");
								
								//勾选状态
								if (obj.ischecked == true) {
									$("<input class='check' type='checkbox' checked='checked' />").appendTo(li);
								}
								else  {
									$("<input class='check' type='checkbox' />").appendTo(li);
								}
								
								$("<img src="+ obj.img1 +" >").appendTo(li);
								$("<span class='name'>"+ obj.name +"</span>").appendTo(li);
								$("<span class='price'>"+ obj.unit+obj.price +"</span>").appendTo(li);
								$("<input class='reduce' type='button' value='-' >").appendTo(li);
								$("<input class='num' type='text' value="+ obj.num +" >").appendTo(li);
								$("<input class='add' type='button' value='+' >").appendTo(li);
								$("<a class='delete' href='javascript:;'>删除</a>").appendTo(li);
								
								//计算每个商品的总价并添加到totalPrice
								if (obj.ischecked == true) {
									totalPrice += obj.price * obj.num;
								}
								
							}
							
							//显示总价
							$("#total").html(totalPrice);
						}
						else  {
							//显示总价
							$("#total").html(0);
							alert("您的购物车没有商品");
						}
						
						
					}
					else {
						alert("您的购物车空空如也");
					}
				}
				
				
				//+
				$("#list").on("click", ".add", function(){
					var index = $(this).index("#list .add");
					//console.log(index);
					
					//修改cookie
					var arr = JSON.parse($.cookie("cart"));
					arr[index].num++;
					$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					refresh();
				})
				
				//-
				$("#list").on("click", ".reduce", function(){
					var index = $(this).index("#list .reduce");
					
					//修改cookie
					var arr = JSON.parse($.cookie("cart"));
					arr[index].num--;
					if (arr[index].num < 1) {
						arr[index].num = 1;
					}
					$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					refresh();
				})
				
				//删除
				$("#list").on("click", ".delete", function(){
					var index = $(this).index("#list .delete");
					
					//修改cookie
					var arr = JSON.parse($.cookie("cart"));
					arr.splice(index, 1);
					$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					isCheckAll();
					refresh();
				})
				
				//勾选
				$("#list").on("click", ".check", function(){
					var index = $(this).index("#list .check");
					
					//修改cookie
					var arr = JSON.parse($.cookie("cart"));
					arr[index].ischecked = !arr[index].ischecked;
					$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					isCheckAll();
					refresh();
				})
				
				
				//全选
				$("#selectAll").click(function(){
					
					var arr = JSON.parse($.cookie("cart"));
					
					for (var i=0; i<arr.length; i++) {
						if ($(this).prop("checked")) { //全选
							arr[i].ischecked = true;
						}
						else  { //全不选
							arr[i].ischecked = false;
						}
					}
					$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
					
					refresh();
				})
				
				
				//判断是否全部选中
				isCheckAll();
				function isCheckAll(){
					//防止cookie中的'cart'值为undefined
					if (!$.cookie("cart")) {
						return;
					}
					
					var arr = JSON.parse($.cookie("cart"));
					
					var sum = 0;
					for (var i=0; i<arr.length; i++) {
						sum += arr[i].ischecked;
					}
					
					if (sum != 0 && sum == arr.length) { //全选
						$("#selectAll").prop("checked", true);
					}
					else  { //不全选
						$("#selectAll").prop("checked", false);
					}
				}
				
				
				//删除选中
				$("#deleteSelect").click(function(){
					
					var arr = JSON.parse($.cookie("cart"));
					
					var arr2 = [];
					for (var i=0; i<arr.length; i++) {
						if (!arr[i].ischecked) {
							arr2.push(arr[i]);
						}
					}
					
					$.cookie("cart", JSON.stringify(arr2), {expires:30, path:"/"});
					
					isCheckAll();
					refresh();
				})
				
	
	
	
	
})