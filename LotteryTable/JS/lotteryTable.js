/**
 * Created by Lang on 2017/12/27.
 */
var images = "", count = 119;
var timerArr = [];
var opacityArr= [0, 0.5, 1];
var classSelect = ["even", "odd"];
var dataDemo = {
    turn: 1,
    getPrize: {
        len: 11,
        group: [
            { imgUrl: 'Image/HeadPhoto/10.jpg', name: '秦后平' },
            { imgUrl: 'Image/HeadPhoto/21.jpg', name: '吕成成' },
            { imgUrl: 'Image/HeadPhoto/14.jpg', name: '蔡传江' },
            { imgUrl: 'Image/HeadPhoto/18.jpg', name: '汪洋' },
            { imgUrl: 'Image/HeadPhoto/6.jpg', name: '陈晨' },
            { imgUrl: 'Image/HeadPhoto/20.jpg', name: '吴冬冬' },
            { imgUrl: 'Image/HeadPhoto/22.jpg', name: '腾庆勇' },
            { imgUrl: 'Image/HeadPhoto/43.jpg', name: '付山' },
            { imgUrl: 'Image/HeadPhoto/12.jpg', name: '方汉' },
            { imgUrl: 'Image/HeadPhoto/3.jpg', name: '王瑞' },
            { imgUrl: 'Image/HeadPhoto/0.jpg', name: '徐浪' },
        ]
    }
}

for(var i = 0; i <= count; i++)
    images +=
        '<div class="img-wrapper">' +
            '<div class="img-layer ' + classSelect[i%2] + '"></div>' +
            '<img class="grid-image ' + classSelect[i%2] + '" src="Image/HeadPhoto/' + parseInt(Math.random()*50) + '.jpg" />' +
        '</div>';

$(".grid").append(images);

var d = 0; // 延迟时间
var ry, tz, s; // 变换参数

// 窗体加载时加载的动画
$(window).on("load", function(){
    storm();
    setTimeout(function () {
        $('#start').removeClass('dhidden');
    }, 3000)
});

// 点击开始按钮开始动画
$('#start').on('click', function () {
    $(this).addClass('dhidden').prev().removeClass('dhidden');
    mouseChangePos();
    for(var i=0; i<timerArr.length; i++){
        clearInterval(timerArr[i]);
    }
    $("div.img-layer").each(function () {
        var that = this;
        timerArr.push(setInterval(function () {
            $(that).css("opacity", opacityArr[parseInt(Math.random()*opacityArr.length)]);
            if($(that).css("opacity") == 1){
                $(that).next().attr("src", "Image/HeadPhoto/" + parseInt(Math.random()*50) + ".jpg");
            }
        }, 300 ));
    })
});

// 点击停止按钮
$('#stop').on('click', function () {
    $(this).addClass('dhidden').next().removeClass('dhidden').next().removeClass('dhidden');
    for(var i=0; i<timerArr.length; i++){
        clearInterval(timerArr[i]);
    };
    setPrizeGroup(dataDemo);
})

// 拉回图片
function storm()
{
    $("div.img-wrapper").each(function(){
        d = Math.random()*1000;
        $(this).delay(d).animate({opacity: 1}, {
            step: function(n) {
                // 在Y轴上旋转images从360度到0度
                ry = (1-n)*360;
                tz = (1-n)*200;
                $(this).css("transform", "rotateY("+ ry +"deg) translateZ("+ tz +"px)");
            },
            duration: 3000,
            easing: 'easeOutQuint',
        })
    })
}

// 鼠标滑动
function mouseChangePos(){
    var hWidth = $(window).width();
    var hHeight = $(window).height();
    var rate = (hWidth/2)/((2400-hWidth)/2);  // 限定比例
    $('#container').mousemove(function (e) {
        var mx = e.pageX;
        var my = e.pageY;
        $('#grid').css("transform", "translateX("+ -(mx-hWidth/2)/rate +"px) translateY(-50%)");
    })
}


// 设置中奖信息
function setPrizeGroup(data) {
    $('#grid').children().each(function () {
        $(this).children('.img-layer').css('opacity', '1');
    });
    for(var i= (36 - Math.floor(data.getPrize.len/2)),j=0 ; i < (36 + Math.ceil(data.getPrize.len/2)); i++, j++){
        $('#grid').children().eq(i).children('.img-layer').css('opacity', '0');
        $('#grid').children().eq(i).children('.grid-image').attr("src", data.getPrize.group[j].imgUrl);
    }
}
