(function () {
    var loginBtn = document.getElementById("login-btn");
    var timer = null;
    loginBtn.onclick = function (ev) {
        clearTimeout(timer);
        iziToast.show({
            message: "登录请求已发送，正在处理...",
            color: 'blue',
            position: 'topLeft',
        });
        timer = setTimeout(function () {
            iziToast.show({
                message: "登录成功，正在跳转...",
                color: 'green',
                title: '√',
                position: 'topLeft',
            })
        }, 2000)
    }
})();