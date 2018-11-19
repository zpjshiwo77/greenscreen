~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





css3d
============

创建stage,stage是舞台,是整个场景的根.  
```js
var s = new C3D.Stage();  
```

所有的函数都可以链式调用,  
```js
s.size(window.innerWidth, window.innerHeight).material({  
    color : "#cccccc"  
}).update();  
```

以上代码也可以等同以下代码  
```js
s.width = window.innerWidth;  
s.height = window.innerHeight;  
s.material({color : "#cccccc"});  
s.update();  
```
一般在创建元素时使用update(),update中会分别执行updateS(),updateM(),updateT(),updateV(),保证元素创建完整.之后再做其他属性改变时只需要调用相关函数,不用再调用完整功能的update()了.  

最后将stage的dom元素置入所需位置,el是所有三维元素的属性,包含对应的dom元素  
```js
document.getElementById('main').appendChild(s.el);  
```


创建一个三维容器,容器没有高宽深和材质信息,只有位置,旋转,缩放等信息.  
```js
var sp = new C3D.Sprite();  
sp.position(0, 0, -500).update();  
s.addChild(sp);  
```

创建一个平面放入场景  
```js
var p = new C3D.Plane();  
p.size(100).position(0, 100, -s.fov).rotation(0, 0, 0).material({  
    color : C3D.getRandomColor()  
}).update();  
s.addChild(p);  
```

创建一个立方体放入场景  
```js
var c = new C3D.Cube();  
c.size(100).position(0, -100, -s.fov).rotation(0, 0, 0).material({  
    color : C3D.getRandomColor()  
}).update();  
s.addChild(c);  
```

如果希望单独控制立方体各面的素材可以如下方式  
```js
var c = new C3D.Cube();  
c.size(100).position(0, -100, -s.fov).rotation(0, 0, 0).material({  
    front : {color:C3D.getRandomColor()},  
    back : {color:C3D.getRandomColor()},  
    left : {color:C3D.getRandomColor()},  
    right : {color:C3D.getRandomColor()},  
    up : {color:C3D.getRandomColor()},  
    down : {color:C3D.getRandomColor()},  
}).update();  
s.addChild(c);  
```

动画部分结合jstween类库也可以方便的修改  
```js
JT.fromTo(p, 3, {rotationY: 0}, {  
    rotationY: 90, ease: JT.Quart.In, onUpdate: function () {  
        // 此处因为是rotationY变化,只需要调用updateT()就可以,如果是alpha活visible变化,需要调用updateV(),材质变化调用updateM(),尺寸变化调用updateS()  
        this.updateT();  
    },onEnd:function(){  
        sp.removeChild(this);  
    }  
});  
```
其他类库,比如tweenmax等也可以使用类似方式来处理  


其他可以参考example中的几个案例,可以下载到本地查看,在线demo地址如下:  
http://shrek.imdevsh.com/demo/css3d/space.html  
http://shrek.imdevsh.com/demo/css3d/simple.html




~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




js tween
============

简单好用的tween类，api参考tweenmax。可对一般对象或者Dom对象使用。


API
============

全局tween方法:  

JT.get(target, param);  
JT.set(target, params);  

JT.fromTo(target, duration, fromParams, toParams);  
JT.from(target, duration, fromParams);  
JT.to(target, duration, toParams);  

JT.play(target);  
JT.playAll();  

JT.pause(target);  
JT.pauseAll();  

JT.restart(target);  
JT.restartAll();  

JT.kill(target, [toEnd]);  
JT.killAll([toEnd]);  

JT.isTweening(target);  

param为字符串，  
params为数组，  

其中几个属性比较特殊:  
linear:[]折线数组  
bezier:[]贝塞尔数组  
through:[]同样是贝塞尔数组,不过是穿越数组中各点  

ease设置缓动，  
delay设置延时时间，  
repeat设置重复次数，  
repeatDelay设置每次重复的间隔延时时间，  
yoyo设置重复时反向，  
isPlaying设置是否立即播放，  
onStart设置运动开始的返回函数，  
onStartParams设置开始返回函数的参数，  
onRepeat设置运动循环中每个运动完成的返回函数，  
onRepeatParams设置运动完成返回函数的参数，  
onEnd设置运动完成的返回函数，  
onEndParams设置返回函数的参数  
onUpdate设置每帧渲染时的返回函数，  
onUpdateParams设置每帧渲染时返回函数的参数，  


tween实例方法：

tween.play(); 播放  
tween.pause(); 暂停  
tween.kill([toEnd]); 删除，参数设置是否直接去到终点并出发onEnd




全局call方法  

JT.call(delay, callback, callbackParams);

JT.playCall(callback);  
JT.playAllCalls();  

JT.pauseCall(callback);  
JT.pauseAllCalls();  

JT.killCall(callback, [toEnd]);  
JT.killAllCalls();  


call实例方法：

call.play(); 播放  
call.pause(); 暂停  
call.kill(); 删除



全局path方法:  

JT.path(obj);

包含以下属性:  
linear:[]折线数组  
bezier:[]贝塞尔数组  
through:[]同样是贝塞尔数组,不过是穿越数组中各点  

ease设置缓动，  
step设置分步的步数,  



缓动类

JT.Linear  
JT.Quad  
JT.Cubic  
JT.Quart  
JT.Quint  
JT.Sine  
JT.Expo  
JT.Circ  
JT.Elastic  
JT.Back  
JT.Bounce  

除了JT.Linear只有None一项，其他均有In,InOut,Out三项选择。  


以上方法和参数均是参考TweenLite的方式，有使用经验者会很容易上手。  




~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




js timeline
============

jstween的扩展库,类似于greensock的TimelineLite,不过功能比较简单,方便编写大量基于时间线的jstween
注:本库强依赖jstween
https://github.com/shrekshrek/jstween


API
============

全局方法:  
JTL.create();  
JTL.kill();  

实例方法:  
fromTo();  
from();  
to();  
kill();  
add();  
addLabel();  
removeLabel();  
getLabelTime();  
totalTime();  
play();  
pause();  
seek();  
clear();  



