$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var windowScale=window.innerWidth/750;
	
	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	
	function init(){
		requestAnimationFrame(function(){
			load_handler();
		});
	}//edn func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn_phone.png');
		
		loader.addCompletionListener(function() {
			pageInit();
			loader=null;
		});
		loader.start();	
	}//end func

	//----------------------------------------页面逻辑代码----------------------------------------
	//页面初始化
	function pageInit(){

	}//end func
	
});//end ready
