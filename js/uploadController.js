"use strict";function formCode(){layui.use(["form","upload","element"],function(){var o=layui.form;console.log(o),o.on("submit(submitForm)",function(o){return layer.msg(JSON.stringify(o.field)),!1}),uploadCode()})}function uploadCode(){layui.upload.render({elem:"#upload",url:"",auto:!1,accept:"file",done:function(o){layer.msg("上传成功"),console.log(o)},choose:function(o){console.log(o);o.pushFile()}})}$(document).ready(function(){formCode()});