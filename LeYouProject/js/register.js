$(function(){
	
	var flag1=false;
	var flag2=false;
	var flag3=false;
	var flag4=false;
	var flag5=false;
	
	$("#main03 input").eq(0).change(function(){
    var reg=/^1((3[0-9])|(4(5|7))|(5([0-3]|[5-9]))|(7(7|8))|(8[0-9]))\d{8}$/;
	var str=$("#main03 input").eq(0).val();
		if(reg.test(str)){
			flag1=true;
		}else{
			$("#main03 .tips").eq(0).css("display","inline-block");
			flag1=false;
		}
	})
	
	$("#main03 input").eq(0).keydown(function(){
		$("#main03 .tips").eq(0).css("display","none");
	});

	var verifyCode = new GVerify("v_container");
	
	$("#verify").click(function(){
		var res = verifyCode.validate($("#main03 input").eq(1).val());
		if(res){
			flag2=true;
		}
		else{
			alert("验证码错误");
			flag2=false;			
		}
	})
	
	$("#yzm").click(function(){
		$(this).html(parseInt(1000+Math.random()*9000));
	})
	
	$("#main03 input").eq(2).change(function(){
		if($(this).val()==$("#yzm").html()){
			flag3=true;
		}else{

			alert("手机验证码不正确");
			flag3=false;
		}
	})
	
	$("#main03 input").eq(3).change(function(){
		var reg=/^[a-zA-Z0-9_]{8,16}$/;
		var str=$("#main03 input").eq(3).val();
		if(reg.test(str)){
			flag4=true;
		}else{
			$("#main03 button").eq(2).css("display","inline-block");
			flag4=false;
		}
	})
	
	$("#main03 input").eq(3).keydown(function(){
		$("#main03 button").eq(2).css("display","none");
	})
	
	$("#main03 input").eq(4).change(function(){
		var str1=$("#main03 input").eq(3).val();
		var str2=$("#main03 input").eq(4).val();
		if(str1==str2){
			flag5=true;
		}else{
			$("#main03 button").eq(3).css("display","inline-block");
			flag5=false;
		}
	})
	
	$("#main03 input").eq(4).keydown(function(){
		$("#main03 button").eq(3).css("display","none");
	})
	
	$("#main03 input").eq(6).click(function(){
		if(flag1 && flag2 && flag3 && flag4 && flag5){

			var xhr = new XMLHttpRequest();
			xhr.open("post", "http://localhost/LeYouProject/register.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("phoneNumber="+$("#main03 input").eq(0).val() + "&password="+$("#main03 input").eq(3).val());
			xhr.onreadystatechange = function(){
				if (xhr.readyState==4 && xhr.status==200) {
					var arr = JSON.parse(xhr.responseText);
					var obj=arr;
					if(obj.status == 0){
						alert("该手机号已注册， 请重新输入手机号!")
					}
					if(obj.status == 1){
						location.href = "login.html";
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
                alert("手机验证码不正确");
            }
            if(!flag4){
                alert("密码必须有8-16位数字、字母和_组成");
            }
            else if (!flag5) {
                alert("两次输入密码不一致");
            }
        }
		
		

	})


	
})