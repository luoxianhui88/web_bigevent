// 注意，每次调用$.get()/$.post(),$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，会拿到给ajax提供的配置对象
$.ajaxPrefilter(function(opthions){
    console.log(opthions.url)
    // 在发起正真的ajax之前，统一拼接ajax的url
    opthions.url = 'http://www.liulongbin.top:3007'+opthions.url
})