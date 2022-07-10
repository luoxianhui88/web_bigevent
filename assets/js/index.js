$(function(){
    getUserInfo();
    // 退出功能 跳转到登录页面
    $('#btnLogout').on('click',function(e){
        // e.prenvertDefault();
        layui.layer.confirm('确认要退出登录吗？', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储中的token
            localStorage.removeItem('token');
            // 从新跳转到登录页
            location.href = '../home/login.html'  ;  

            // 关闭confirm弹出层
            layer.close(index);
          });
           
          
    })


})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // 请求头
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 获取信息成功，渲染头像
            renderAvatar(res.data);
        },
        // 无论是成功还是失败，都会回调这个函数
        // complete:function(res){
        //     console.log(res)
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页面
        //         location.href = '../home/login.html';
        //     }
        // }
    });
}

// 渲染用户头像
function renderAvatar(user){
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();        
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
       

    }
}