$(function(){

	var flag1=false;
	var flag2=false;
	var flag3=false;

	$(".inputbox").eq(0).change(function(){
		var reg=/^1((3[0-9])|(4(5|7))|(5([0-3]|[5-9]))|(7(7|8))|(8[0-9]))\d{8}$/;
		var str=$(".inputbox").eq(0).val();
		if(reg.test(str)){
			flag1=true;
		}else{
			$("#loginBox em").eq(0).html("手机号码输入不正确");
			flag1=false;
		}
	})

	$(".inputbox").eq(1).change(function(){
		var reg=/^[a-zA-Z0-9_]{8,16}$/;
		var str=$(".inputbox").eq(1).val();
		if(reg.test(str)){
			flag2=true;
		}else{
			$("#loginBox em").eq(1).html("密码必须有8-16位数字、字母和_组成");
			flag2=false;
		}
	})

	var verifyCode = new GVerify("v_container");

	$("#verify").click(function(){
		var res = verifyCode.validate($("#loginBox input").eq(2).val());
		if(res){
			flag3=true;
		}
		else{
			$("#loginBox em").eq(2).html("验证码不正确");
			flag3=false;
		}
	})

	$("#loginBox button").click(function () {

		if(flag1 && flag2 && flag3){

			var xhr = new XMLHttpRequest();
			xhr.open("post", "http://localhost/LeYouProject/login.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("phoneNumber="+$(".inputbox").eq(0).val() + "&password="+$(".inputbox").eq(1).val());
			xhr.onreadystatechange = function(){
				if (xhr.readyState==4 && xhr.status==200) {
					var arr = JSON.parse(xhr.responseText);
					var obj=arr;
					console.log(obj);
					if(obj.status == 0){
						alert("登录失败! 用户名或密码错误")
					}else{
						location.href = "homePage.html";
					}
				}
			}
		}
		else{
			if(!flag1){
				alert("!手机号码格式不正确");
			}
			else if (!flag2) {
				alert("验证码错误");
			}
			else if (!flag3) {
				alert("密码必须有8-16位数字、字母和_组成");
			}
		}


	})





})