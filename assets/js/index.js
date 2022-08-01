$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogin').click(function () {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
        });
    })
})
//  获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
    });
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first)
        $('.text-avatar').show()
    }
}