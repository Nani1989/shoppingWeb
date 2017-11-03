
$(function(){
	
	$("#PhoneStore").hover(function(){
		$("#appImg").animate({"height": 251},500);
		$("#PhoneStore a").css("color", "#000");
	},
	function(){
		$("#appImg").animate({"height": 0},500);
		$("#PhoneStore a").css("color", "#666");
	})
	
	$(".ali, #login, #store").hover(function(){
		$(this).find("a").css("color", "#000").siblings().css("color", "#666");
	},
	function(){
		$(this).find("a").css("color", "#666").siblings().css("color", "#000");
	})
	
	$("#servicesMenu, #servicesUL").hover(function(){
		$("#servicesUL").css("display","block");
		$("#servicesMenu").css("color","#eb010d");
		$(" #servicesArrow").css("border-color","#eb010d transparent");
	},
	function(){
		$("#servicesUL").css("display","none");
		$("#servicesMenu").css("color","#666666");
		$(" #servicesArrow").css("border-color","#9bbaf9 transparent");
	})
	
	$("#servicesUL li").mouseenter( function(){
		$(this).find("a").css("color","#eb010d").parent().siblings().find("a").css("color","#666666");
	})

	$("#search input").on({click:function(){
		$(this).val("");
	},
	blur:function(){
		$(this).val("歌瑞家童装").css("color","#666666");
	}})
	
	$("#search").find("a").eq(2).css("color","#ff0000");
	$("#search").find("a").eq(6).css("color","#ff0000");
	
	$("#myLeyou").hover(function(){
		$("#myLeyouLoad").show();
	},
	function(){
		$("#myLeyouLoad").hide();
	})
	
	$("#inviteFriends").hover(function(){
		$("#point, #invite").show();
	},
	function(){
		$("#point, #invite").hide();
	})
	
})