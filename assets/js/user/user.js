$(function () {
    var form = layui.form;
    // 验证规则
    form.verify({
        nickname: function (value) {
            console.log("value");
            if (value.length > 6) {
                // console.log("value");
                return layui.layer.msg('昵称长度必须在1-6个字符之间');
            }
        }
    })

    initUserInfo();

    // 初始化用户信息
    function initUserInfo(){
        // 获取用户的信息
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                // console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                // 调用layui.form.val()快速为表单赋值                
                layui.form.val('formUserInfo',res.data);

            }
        });
    }

    // 重置功能
    $('#reset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    });

    // 修改功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:function(res){
                // console.log(res)
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                    
                }
                layui.layer.msg('更新用户信息成功');
                // 在子页面中调用父页面的方法，重新渲染
                console.log(window.parent);
                window.parent.getUserInfo();
            }
            
        });
    })
    // 修改用户信息
    function modifyUserInfo(){
        // $.ajax({
        //     method:'post',
        //     url:'/my/userinfo',
        //     data:$('.layui-form').serialize(),
        //     success:function(res){
        //         // console.log(res)
        //         if (res.status != 0) {
        //             return layui.layer.msg(res.message);
                    
        //         }
        //         layui.layer.msg('更新用户信息成功');
        //         // 在子页面中调用父页面的方法，重新渲染
        //         console.log(window.parent);
        //         window.getUserInfo();
        //     }
            
        // });
    }
})