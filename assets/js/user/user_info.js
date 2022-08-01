$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称长度必须在 1~6 个字符之间'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val给表单快速赋值
                form.val('formUserInfo', res.data)
            }
        });
    }
    $('#btnReset').click(function (e) {
        // 阻止表单默认重置行为
        e.preventDefault();
        initUserInfo()

    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        });
    })
})

