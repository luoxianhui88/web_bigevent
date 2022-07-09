(function () {
    // 点击"去注册账号"的连接
    $('#link-reg').on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();

    });

    // 点击"去登陆"的连接
    $('#link-login').on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();

    });

    // 从layui中获取form对象
    var form = layui.form
    // 从layui中获取layer对象
    var layer = layui.layer
    // 自定义校验规则     
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //   //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            //   if(value === 'xxx'){
            //     alert('用户名不能为敏感词');
            //     return true;
            //   }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 两次密码校验一致的规则
        repass: function (value) {
            // 获取密码框中的值
            var pass = $('.reg-box [name=password]').val();
            if (pass != value) {
                return '两次密码不一致';
            }
        }
    });

    // 监听注册表单的提交
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.post('/api/reguser',
        {username: $('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
            if(res.status != 0){            
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            // 切换到登录页面 模拟人的点击行为
            $('#link-login').click();
        });
    });
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                console.log(res);                            
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                // token 用于有权限接口的身份认证
                // 将登录成功后得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token);
                // 跳转页面到index
                location.href = './index.html';   

            }
        });
    });

    
})();