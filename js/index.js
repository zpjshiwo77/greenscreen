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
	var video = document.getElementById("cameraMedia");
	navigator.getUserMedia =  navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


	//页面初始化
	function pageInit(){
		eventInit();
		video.addEventListener("play", () => {
			drawCanvas();
		});
	}//end func

	//事件初始化
	function eventInit(){
		$("#openCameraBtn").on("click",cameraMediaInit);
		$("#videoPlay").on("click",videoPlay);
	}//end func

	//调用摄像头初始化
	function cameraMediaInit(){
		navigator.getUserMedia({
			video: {
				facingMode: "environment"
			}
		}, getMediaSuccess, getMediaFail);
	}//end func

	//获取媒体流成功
	function getMediaSuccess(stream){
		console.log(stream)
		video.srcObject = stream;

		icom.fadeIn(loadBox);

		setTimeout(function(){
			$("#videoPlay").click();
		},1000);

		video.addEventListener("play", () => {
			drawCanvas();
			icom.fadeOut(loadBox);
		});
	}

	//获取媒体流失败
	function getMediaFail(error){
		icom.alert("您的浏览器不支持打开摄像头！");
	}

	//视频播放
	function videoPlay(){
		video.play();   // 播放
		$("#openCameraBtn").hide();
		$("#tips").hide();
		$("#videoPlay").hide();
		$("#logo").hide();
		$("#imgCover").css("opacity","1");
	}//end func

	//把视频呈现在画布上
	function drawCanvas(){
		var seriously = new Seriously();
		creatCanvas();

		var chroma = seriously.effect("chroma");
		var video_reformat = seriously.transform("reformat");
		var target = seriously.target('#MediaPanel');

		video_reformat.source = video;
		video_reformat.mode = "cover";
		video_reformat.width = window.innerWidth;;
		video_reformat.height = window.innerHeight;

		chroma.weight = 1;
		chroma.balance = 0.3;
		chroma.screen = "rgb(35, 80, 35)";
		chroma.clipWhite = 1;
		chroma.clipBlack = 0;
		chroma.source = video_reformat;

		target.source = chroma;
		  
		seriously.go(); 
	}//end func

	//创建画布
	function creatCanvas(){
		$("#main").append('<canvas id="MediaPanel"></canvas>');
		$("#MediaPanel")[0].width = window.innerWidth;
		$("#MediaPanel")[0].height = window.innerHeight;
	}
});//end ready
