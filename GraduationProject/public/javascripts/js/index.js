$(function(){
     $.ajax({
           type:'POST',
           url:'/getindexinfo',
           data:"",
           dataType:'JSON',
           success:function(data){
               if(data.code==1){
                  var bloginfo = data.obj;
                  for (var i = 0; i < bloginfo.length; i++) {
                    var str = '<section"><header class="major"><h2>';
                    str+=bloginfo[i].title;
                    str+="</h2></header><p>";
                    str+=bloginfo[i].description;
                    str+='</p><ul class="actions"><li><a href="/allbloginfo?id='+bloginfo[i]._id+'"class="button">学习更多</a></li></ul></section>';                    
                    $("#main").append(str);
                  }
                  var str2 = '<section><h4>如有问题，请发送邮件与我联系</h4><form method="post" action="/saveEmail"><div class="row uniform 50%"><div class="6u 12u$(3)"><input type="text" name="emailuser" id="demo-name" value="" placeholder="Name" /></div><div class="6u$ 12u$(3)"><input type="email" name="emailAddress" id="demo-email" value="" placeholder="Email" /></div><div class="12u$"><textarea name="emailmessage" id="demo-message" placeholder="Enter your message" rows="6"></textarea></div><div class="12u$"><ul class="actions"><li><input type="submit" value="Send Message" class="special" /></li><li><input type="reset" value="Reset" /></li></ul></div></div></form></section>';
                  $("#main").append(str2);
                  alert(data.msg);                  
               }else{
                    location.href="/";
               } 

           }
        });
    });
