// 注意，每次调用$.get()/$.post(),$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，会拿到给ajax提供的配置对象
$.ajaxPrefilter(function (opthions) {
    console.log(opthions.url)
    // 在发起正真的ajax之前，统一拼接ajax的url
    opthions.url = 'http://www.liulongbin.top:3007' + opthions.url
    // 为有权限的接口配置heaers
    if (opthions.url.indexOf('/my/') !== -1) {
        opthions.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete函数
    opthions.complete = function(res){
        console.log(res)
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                // 强制清空token
                localStorage.removeItem('token');
                // 强制跳转到登录页面
                location.href = '../home/login.html';
            }

    }

})  