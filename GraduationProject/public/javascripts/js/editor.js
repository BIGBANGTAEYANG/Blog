$(function(){

    //使用ck编辑器提交之前，需要对编辑器内容做特殊处理，才能获取编辑器中的内容
    function CKupdate(){
      for(instance in CKEDITOR.instances){
        CKEDITOR.instances[instance].updateElement();
      }
    }

     $('#submitblogbtn').on('click',function(){
         CKupdate();
         $.ajax({
           type:'POST',
           url:'/admin/editorsubmit',
           data:$("#editorform").serialize(),
           dataType:'JSON',
           success:function(data){
               if(data.code==1){
                   alert(data.msg);
                   location.href="/admin/showblog";
               }else{
                    alert("发表文章失败,原因"+data.msg);
                    location.href="/admin/admineditor";
               } 

           }
        });
    });
});
