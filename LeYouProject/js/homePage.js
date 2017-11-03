$(function(){	

$.get("json/banner.json", function(data){

	var arr = data;
	
	
	for(var i=0;i<arr.length;i++){
		
		var obj = arr[i];
		$("<li><img src="+obj.img+"></li>").appendTo("#list1");
		var li = $("<li></li>").appendTo("#list2");
		
		if(i==0){
			li.addClass("active");
			$("#outBanner").css("background","#abd7e0");
		}
	}
	
	lunbo();
})

function lunbo(){
	var list1 = $("#list1");
	var list2 = $("#list2");
	var li1 = $("#list1 li");
	var li2 = $("#list2 li");
	
	li1.eq(0).show().siblings().hide();
	
	var size = $("#list1 li").size();
	
	//自动轮播
	var i = 0; //记录图片下标
	var timer = setInterval(function(){
		i++;
		
		if(i==1){
			$("#outBanner").css("background","#dff6fc");
		}
		else if(i==2){
			$("#outBanner").css("background","#fde5b5");
		}
		else if(i==3){
			$("#outBanner").css("background","#cee6fe");
		}
		else if(i==4){
			$("#outBanner").css("background","#ebf6b2");
		}
		else if(i==5){
			$("#outBanner").css("background","#e5e7c0");
		}
		else if(i==6){
			$("#outBanner").css("background","#abd7e0");
		}
		
		move(); 
	}, 2000);
	
	//移动的函数
	function move(){
		
		//如果i超出了图片总数量
		if (i == size) {
			i = 0; //即将移动到2张图
		}
		
		//透明度切换到第i张图
		li1.eq(i).stop().fadeIn().siblings().stop().fadeOut();
		
		//改变ul2的按钮状态
		li2.eq(i).removeClass().addClass("active").siblings().removeClass("active"); 
		
	}

	li2.mouseenter(function(){
		i = $(this).index();
		move();
	})
	
	$("#bannerImg").hover(function(){
		clearInterval(timer);
	}, 
	function(){
		timer = setInterval(function(){
			i++;
			move();
		}, 2000);
	})
	
}

	var list3 = $("#warmtips1UL");
	var li3 = $("#warmtips1UL li");
	
	li3.first().clone(true).appendTo(list3);			

	var size1 = $("#warmtips1UL li").size();
				
	var liHeight = li3.height();
	$("#warmtips1UL").height(liHeight*size1);
				
	var index = 0; //即将显示的li的下标
	setInterval(function(){
		index++;
		move1();
	}, 2000);
				
	function move1(){
		
		if (index >= size1) {
			list3.css("top", "0px");
			index = 1; 
		}

		list3.animate({top:-index*liHeight}, 500);
	}


$("#bannerNewsTitle li").hover(function(){
	$(this).addClass("active").siblings().removeClass("active");
},
function(){
	$(this).removeClass("active").siblings().removeClass("active");
})

$("#bannerNewsTitle li").eq(0).mouseenter(function(){
	$("#LeyouNews").show();
	$("#rightNews").hide();
})
$("#bannerNewsTitle li").eq(1).mouseenter(function(){
	$("#rightNews").show();
	$("#LeyouNews").hide();
})

$("#LeyouNews li").mouseenter(function(){
	$(this).stop(true).animate({height:82},200)
	.siblings().stop(true).animate({height:30},200);
})

$("#ImgUL .ImgLi").eq(0).show().siblings().hide();
$("#TitleUL li").mouseenter(function(){
	$(this).addClass("change").siblings().removeClass("change");
	var index = $(this).index();
	$("#ImgUL .ImgLi").eq(index).show().siblings().hide();
})

$.get("json/smallBanner.json", function(data){
	
	var arr = data;
	
	for(var i=0;i<arr.length;i++){
		
		var obj = arr[i];
		$("<li>"+"<img src="+obj.img+">"+"<br/>"+"<br/>"+"<br/>"+obj.name+"<br/>"+obj.title+"</li>").appendTo("#smallList1");
		var Li = $("<li>"+(i+1)+"</li>").appendTo("#smallList2");
		if(i==0){
			Li.addClass("active1");
		}	
	}
	
	lunbo1();
})

function lunbo1(){
	var _list1 = $("#smallList1");
	var _list2 = $("#smallList2");
	var _li1 = $("#smallList1 li");
	var _li2 = $("#smallList2 li");
	
	_li1.first().clone(true).appendTo(_list1);
	
	var size = $("#smallList1 li").size();
	_list1.width(188*size);
	
	var i = 0;
	var timer = setInterval(function(){
		i++;
		move();
	}, 2000);
	
	function move(){
		
		if (i >= size){
			_list1.css("left", 0);
			i = 1;
		}
		
		_list1.stop().animate({left:-i*188}, 500);
		
		_li2.eq(i).addClass("active1").siblings().removeClass("active1");
		if (i == size-1) {
			_li2.eq(0).addClass("active1").siblings().removeClass("active1");
		}
	}

	_li2.mouseenter(function(){
		i = $(this).index();
		move();
	})
	
	$("#smallBanner").hover(function(){
		clearInterval(timer);
	}, 
	function(){
		timer = setInterval(function(){
			i++;
			move();
		}, 2000);
	})
}

$("#reviewUL li").mouseenter(function(){
	$(this).addClass("hoverRed").siblings().removeClass("hoverRed");
})

$("#F1MiddleTopUL li").mouseenter(function(){
	$(this).addClass("hoverOrange").siblings().removeClass("hoverOrange");
})

$("#F1MiddleBottomUL .firstLI").eq(0).show().siblings().hide();

$("#F1MiddleTopUL li").mouseenter(function(){
	var index = $(this).index();
	$("#F1MiddleBottomUL .firstLI").eq(index).show().siblings().hide();
})

$("#fixTop img").click(function(){					
	$("html,body").animate({scrollTop:0}, 500);					
})


$("#fixNav li").click(function(){
	$(this).find("span").addClass("Active")
	.parent().siblings().find("span").removeClass("Active");
	
	var index = $(this).index();
	
	var top = $(".floor").eq(index).offset().top;  
	
	//动画移动
	$(window).off("scroll");
	$("html,body").animate({scrollTop:top}, 500, function(){
		$(window).scroll(fn);
	});
	
})
				
//页面滚动时，让对应楼层的按钮选中
$(window).scroll(fn);
function fn(){
	var scrollTop = $(window).scrollTop();
	//console.log(scrollTop);
	
	var index = 0;
	$(".floor").each(function(){
		var top = $(this).offset().top;
		var winH = $(window).height();
		
		if (scrollTop + winH/2 >= top) {
			index = $(this).index();
		}
	})
	//console.log(index);
					
	$("#fixNav li").eq(index).find("span").addClass("Active")
		.parent().siblings().find("span").removeClass("Active");
		
}



})