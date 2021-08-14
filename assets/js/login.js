$(function() {
    $("#link-reg").on('click', function() {
        $(".login-box").hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }


    })

    //监听注册表单事件
    $('#form_reg').submit(function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
            repassword: $('#form_reg [name=repassword]').val(),
        }

        $.post('/api/reg', data, function(res) {
            if (res.code !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            console.log('注册成功，请登录！');
            layer.msg('注册成功，请登录！')

            $('#link-login').click()

        })

    })

    //监听登录表单事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg(res.message)
                }

                location.href = "index.html"
            }


        })
    })









})