//2015.1.26
(function($) {
	$.fn.extend({
		scrR: function(option) {
			var _this=$(this);
			var boxMask,boxCont,boxThis,boxBtnL,boxBtnR,boxWd,boxHt,boxMaskWd,boxMaskHt,boxMax,boxesWd,boxesHt,boxDis,boxUnit,boxTar,boxTimer,boxDir;
			var boxRow=1,boxAuto=false,boxSpeed=1000,boxDelay=5000;
			var _start,_complete;
			if(option){
				boxRow=option.row!=null?option.row:1;
				boxDelay=option.delay!=null?option.delay:5000;
				boxSpeed=option.speed!=null?option.speed:1000;
				boxAuto=option.auto!=null?option.auto:false;
			}//end if
			init();
			function init(){	
				boxMask=_this.children(".boxMask");
				boxCont=boxMask.children();
				boxThis=boxCont.children();
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnL.css({top:_this.outerHeight()/2-boxBtnL.height()/2});
				boxBtnR=_this.children("a.boxBtnR");
				boxBtnR.css({top:_this.outerHeight()/2-boxBtnR.height()/2});
				boxWd=boxThis.first().outerWidth(true);
				boxHt=boxThis.first().outerHeight(true);
				boxMaskWd=boxRow*boxWd;//蒙板宽度，应该是boxWd的整数倍
				boxMaskHt=boxRow*boxHt;//蒙板高度，应该是boxWd的整倍
				boxMax=boxThis.length;//一共有几张图
				boxesWd=boxMax*boxWd;//总长度
				boxesHt=boxMax*boxHt;//总高度
				boxMask.width(boxMaskWd);
				boxMask.height(boxHt);
				boxDis=boxesWd-boxMaskWd;
				boxCont.width(boxesWd);
				boxUnit=boxWd;
				boxTar=0;
				boxDir=-1;
				_this.on("prev",prevFunc).on("next",nextFunc).on("stop",stopFunc).on("play",playFunc);
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(boxBtnL.length>0) boxBtnL.on('touchend',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('touchend',boxBtnR_click);
				boxBtnChange();	
				timerFunc();	
			}//end func
			
			//---------------touch swipe 事件
			function swipeleft_handler(e){
				e.preventDefault();
				boxBtnR_click();
			}//end func
			function swiperight_handler(e){
				e.preventDefault();
				boxBtnL_click();
			}//end func
			
			//----------------自定义事件
			function stopFunc(e){
				clearInterval(boxTimer);
			}//end func
			function playFunc(e){
				timerFunc();
			}//end func
			function prevFunc(e){
				if(boxTar<0){
					boxDir=1;
					boxRollFunc();
				}//end if
			}//end func
			function nextFunc(e){
				if(boxTar>-boxDis){
					boxDir=-1;
					boxRollFunc();
				}//end if
			}//end func
			function boxBtnL_click(e){
				if(boxTar<0){
					boxDir=1;
					boxRollFunc();
				}//end if
			}//end func
			function boxBtnR_click(e){
				if(boxTar>-boxDis){
					boxDir=-1;
					boxRollFunc();
				}//end if	
			}//end func	
			function timerFunc(){
				if(boxAuto){
					clearInterval(boxTimer);
					boxTimer=setInterval(boxRollFunc,boxDelay);
				}//end if
			}//end func	
			function boxRollFunc(){
				if(!boxCont.hasClass("moving") && boxDis>0){
					boxCont.addClass('moving');	
					_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
					boxTar+=boxUnit*boxDir;
					if(boxTar==-boxDis || boxTar==0) boxDir=-boxDir;
					boxCont.transition({x:boxTar}, boxSpeed, boxMotionComplete);
				   	boxBtnChange();
					if(_start) _start();
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(_complete) _complete();	
			}//end if
			function boxBtnChange(){
				if(boxTar==0){
					boxBtnL.removeClass("active");
					boxBtnR.addClass("active");
				}else if(boxTar==-boxDis){
					boxBtnL.addClass("active");
					boxBtnR.removeClass("active");
				}else{
					boxBtnL.addClass("active");
					boxBtnR.addClass("active");
				}//end if
			}//end func
		},//end fn
		scrPrev: function() {
			$(this).trigger('prev');
		},//end fn
		scrNext: function() {
			$(this).trigger('next');
		},//end fn
		scrStop: function() {
			$(this).trigger('stop');
		},//end fn
		scrPlay: function() {
			$(this).trigger('play');
		}//end fn
	});//end extend
})(jQuery);//闭包