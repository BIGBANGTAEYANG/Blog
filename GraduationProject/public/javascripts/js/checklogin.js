$(function(){
     $.ajax({
           type:'POST',
           url:'/admin/checklogin',
           data:"",
           dataType:'JSON',
           success:function(data){
               if(data.code==1){
                   alert("登录成功");
               }else{
                    alert("访问失败,原因："+data.msg);
                    location.href="/login";
               } 

           }
        });
});

