/**
 * Created by Lang on 2017/12/24.
 */
var camera, scene, renderer;
var controls;

var objects = [];
var targets = { grid: [] };

var imgUrl = [
    'Image/HeadPhoto/1.jpg',
    'Image/HeadPhoto/2.jpg',
    'Image/HeadPhoto/3.jpg',
    'Image/HeadPhoto/4.jpg',
    'Image/HeadPhoto/5.jpg',
    'Image/HeadPhoto/6.jpg',
    'Image/HeadPhoto/7.jpg',
    'Image/HeadPhoto/8.jpg',
    'Image/HeadPhoto/9.jpg',
    'Image/HeadPhoto/10.jpg',
    'Image/HeadPhoto/11.jpg',
    'Image/HeadPhoto/12.jpg',
    'Image/HeadPhoto/13.jpg',
    'Image/HeadPhoto/14.jpg',
    'Image/HeadPhoto/15.jpg',
    'Image/HeadPhoto/16.jpg',
    'Image/HeadPhoto/17.jpg',
    'Image/HeadPhoto/18.jpg',
    'Image/HeadPhoto/19.jpg',
    'Image/HeadPhoto/20.jpg',
    'Image/HeadPhoto/21.jpg',
    'Image/HeadPhoto/22.jpg',
    'Image/HeadPhoto/23.jpg',
    'Image/HeadPhoto/24.jpg',
    'Image/HeadPhoto/25.jpg',
    'Image/HeadPhoto/26.jpg',
    'Image/HeadPhoto/27.jpg',
    'Image/HeadPhoto/28.jpg',
    'Image/HeadPhoto/29.jpg',
    'Image/HeadPhoto/30.jpg',
    'Image/HeadPhoto/31.jpg',
    'Image/HeadPhoto/32.jpg',
    'Image/HeadPhoto/33.jpg',
    'Image/HeadPhoto/34.jpg',
    'Image/HeadPhoto/35.jpg',
    'Image/HeadPhoto/36.jpg',
    'Image/HeadPhoto/37.jpg',
    'Image/HeadPhoto/38.jpg',
    'Image/HeadPhoto/39.jpg',
    'Image/HeadPhoto/40.jpg',
    'Image/HeadPhoto/41.jpg',
    'Image/HeadPhoto/42.jpg',
    'Image/HeadPhoto/43.jpg',
    'Image/HeadPhoto/44.jpg',
    'Image/HeadPhoto/45.jpg',
    'Image/HeadPhoto/46.jpg',
    'Image/HeadPhoto/47.jpg',
    'Image/HeadPhoto/48.jpg',
    'Image/HeadPhoto/49.jpg',
    'Image/HeadPhoto/50.jpg',
]
var circle_time = 200;
init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 ); // 角度 宽高比 近裁剪面  远裁剪面
    camera.position.z = 1400;

    scene = new THREE.Scene(); // 这里是创建一个场景

    // 这里随机创建初始信息
    createMatrixRandom(2000);
    createMatrixRandom(1000);
    createMatrixRandom(0);
    createMatrixRandom(-1000);
    createMatrixRandom(-2000);
    createMatrixRandom(-3000);
    createMatrixRandom(-4000);

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    document.getElementById( '3d-wall-container' ).appendChild( renderer.domElement );

    //

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', render );

    // 变换至grid布局

    for ( var i = 0; i < targets.grid.length; i ++ ) {
        targets.grid[i].position.x = targets.grid[i].position.x;
        targets.grid[i].position.y = targets.grid[i].position.y;
        targets.grid[i].position.z = targets.grid[i].position.z;
    }

    transform( targets.grid, 2000 );

    var timer = null;
    var prize_timer = null;
    // 点击开始按钮开始抽奖
    document.getElementById('start').addEventListener('click', function (event) {
        clearInterval(timer);
        clearInterval(prize_timer);
        timer = setInterval(function () {

            for ( var i = 0; i < targets.grid.length; i ++ ) {
                targets.grid[i].position.x = targets.grid[i].position.x;
                targets.grid[i].position.y = targets.grid[i].position.y;
                targets.grid[i].position.z = targets.grid[i].position.z;
            }
            transformStaticTime( targets.grid, circle_time );

            createMatrix(-5000);
            for(var i = 0 ; i < 25; i++){
                scene.remove(objects[0]);
                targets.grid.pop(objects[0]);
                objects.splice(0 ,1);
            }
        }, circle_time)

        $(this).addClass('dhidden');
        $('#price-img').removeClass('dhidden');
        $('#stop').removeClass('vhidden');

        prize_timer = setInterval(function () {
            $('#price-img').attr("src", imgUrl[parseInt(Math.random()*50)]);
        }, 100);

    }, false)

    document.getElementById('stop').addEventListener('click', function (event) {
        clearInterval(timer);
        clearInterval(prize_timer);
        $(this).addClass('vhidden');
        $('#start').removeClass("dhidden")
        $('#price-img').addClass('dhidden');
        $('#stop').addClass('vhidden');

    }, false)

    // 监听浏览器窗口大小变化

    window.addEventListener( 'resize', onWindowResize, false );

}


// 随机动画时间
function transform( targets, duration ) {

    TWEEN.removeAll();

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = objects[ i ];
        var target = targets[ i ];

        new TWEEN.Tween( object.position )
            .to( {
                x: target.position.x,
                y: target.position.y,
                z: target.position.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

    }

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}

// 固定动画时间
function transformStaticTime( targets, duration){
    TWEEN.removeAll();

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = objects[ i ];
        var target = targets[ i ];

        new TWEEN.Tween( object.position )
            .to( {
                x: target.position.x,
                y: target.position.y,
                z: target.position.z }, duration )
            .easing( TWEEN.Easing.Linear.None )
            .start();

    }

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();
}

// 创建随机位置的图片
function createMatrixRandom(zPosition) {
    for ( var i = 0; i < 25 ; i ++ ) {

        if( i == 12){
            var element = document.createElement( 'div' );
            element.className = 'element';
            element.style.backgroundColor = 'transparent';
            element.style.borderColor = 'transparent';
            element.style.boxShadow = 'none';

            var object = new THREE.CSS3DObject( element );
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 5000 - 5000;
        }else{
            var element = document.createElement( 'div' );
            element.className = 'element';
            element.style.backgroundColor = '#fff';

            var image = document.createElement( 'img' );
            image.className = 'image-wrapper';
            image.src = imgUrl[parseInt(Math.random()*50)];
            element.appendChild( image );

            var object = new THREE.CSS3DObject( element );
            object.position.x = Math.random() * 5000 - 2000;
            object.position.y = Math.random() * 5000 - 2000;
            object.position.z = Math.random() * 5000 - 5000;
        }

        scene.add( object );
        objects.push( object );
    }

    for ( var i = 0; i < 25; i ++ ) {

        var object = new THREE.Object3D();

        object.position.x = ( i % 5 ) * 400 - 800;
        object.position.y = 800 - Math.floor( i / 5 ) * 400;
        object.position.z = zPosition;

        targets.grid.push( object );

    }
}

// 创建规则位置的图片
function createMatrix(zPosition) {
    // 添加层
    for ( var i = 0; i < 25 ; i ++ ) {

        if( i == 12){
            var element = document.createElement( 'div' );
            element.className = 'element';
            element.style.backgroundColor = 'transparent';
            element.style.borderColor = 'transparent';
            element.style.boxShadow = 'none';

            var object = new THREE.CSS3DObject( element );
            object.position.x = ( i % 5 ) * 400 - 800;
            object.position.y = 800 - Math.floor( i / 5 ) * 400;
            object.position.z = zPosition;
        }else{
            var element = document.createElement( 'div' );
            element.className = 'element';
            element.style.backgroundColor = '#fff';

            var image = document.createElement( 'img' );
            image.className = 'image-wrapper';
            image.src = imgUrl[parseInt(Math.random()*50)];
            element.appendChild( image );

            var object = new THREE.CSS3DObject( element );
            object.position.x = ( i % 5 ) * 400 - 800;
            object.position.y = 800 - Math.floor( i / 5 ) * 400;
            object.position.z = zPosition;
        }

        scene.add( object );
        objects.push( object );
    }

    for ( var i = 0; i < 25; i ++ ) {

        var object = new THREE.Object3D();

        object.position.x = ( i % 5 ) * 400 - 800;
        object.position.y = 800 - Math.floor( i / 5 ) * 400;
        object.position.z = zPosition;

        targets.grid.push( object );

    }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function animate() {

    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render( scene, camera );

}