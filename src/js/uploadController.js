
$(document).ready(function() {
  formCode();
});

function formCode(){
  layui.use(['form','upload','element'], function(){
    var form = layui.form;
    console.log(form)
    //监听提交
    form.on('submit(submitForm)', function(data){
      layer.msg(JSON.stringify(data.field));
      return false;
    });

    uploadCode();
  });
}

function uploadCode(){
    const  upload = layui.upload;
    //选完文件后不自动上传
    const uploadInstande = upload.render({
      elem: '#upload'
      ,url: '' //此处配置你自己的上传接口即可
      ,auto: false
      ,accept:'file'
      ,done: function(res){
        layer.msg('上传成功');
        console.log(res)
      },
      choose: function(obj){
        console.log(obj);
        //将每次选择的文件追加到文件队列
        var files = obj.pushFile();
      }
    });
}