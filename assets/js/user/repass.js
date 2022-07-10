$(function () {

  // 校验规则
  layui.form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码相同';
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '新旧密码不相同';
      }
    }

  });

  // 更改密码
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
          layui.layer.msg('修改密码成功！');
          // 重置表单
          $('.layui-form')[0].reset()
      }
    });
  })


})