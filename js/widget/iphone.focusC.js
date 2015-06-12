//2015.1.27
(function($) {
	$.fn.extend({
		focusC: function(option) {
			var _this=$(this);	
			var boxCont,boxThis,boxBtnL,boxBtnR,boxWd,boxMax,boxesWd,boxDis,boxUnit,boxTar,boxTimer,boxNow,boxBtnThis,boxDir,boxShowNum,boxJump;
			var _auto=false,_sp=1000,_delay=5000;
			var _posXSt,_posYSt,_posXLast,_posYLast;
			var _callback;
			if(option){
				_delay=option.delay!=null?option.delay:5000;
				_sp=option.speed!=null?option.speed:1000;
				_auto=option.auto!=null?option.auto:false;
				_start=option.start;
				_callback=option.callback;
			}//end if
			init();	
			function init(){
				boxCont=_this.children('.boxCont');
				boxThis=boxCont.children().css({width:_this.width(),height:_this.height()}).each(function(i) {$(this).data({id:i});});
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnR=_this.children("a.boxBtnR");
				boxWd=_this.width();
				boxTar=0;
				boxNow=0;
				boxDir=-1;
				boxShowNum=1;
				boxJump=false;
				boxMax=boxThis.length;
				boxesWd=boxMax*boxWd;//总长度
				boxCont.width(boxesWd);
				boxDis=boxesWd-boxWd;
				boxUnit=boxWd;	
				_this.on("off",_this_off).on("prev",prevFunc).on("next",nextFunc).on("stop",stopFunc).on("play",playFunc);
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(boxBtnL.length>0) boxBtnL.on('touchend',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('touchend',boxBtnR_click);
				timerFunc();
			}//end func

			//---------自定义事件
			
			function _this_off(e){
				_this.off("off",_this_off).off("prev",prevFunc).off("next",nextFunc).off("stop",stopFunc).off("play",playFunc);
				_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
				if(boxBtn.length>0) boxBtnThis.off();
				if(boxBtnL.length>0) boxBtnL.off();
				if(boxBtnR.length>0) boxBtnR.off();
				if(boxBtn.length>0) boxBtnThis.off();
				if(_auto) clearInterval(boxTimer);
			}//end func
			
			function stopFunc(e){
				clearInterval(boxTimer);
			}//end func
			function playFunc(e){
				timerFunc();
			}//end func
			function prevFunc(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function nextFunc(e){
				boxDir=-1;
				boxRollFunc();
			}//end func
			
			//---------------touch swipe 事件
			function swipeleft_handler(e){
				if(window.console) console.log('focus swipe left');
				e.preventDefault();
				boxBtnR_click();
			}//end func
			function swiperight_handler(e){
				if(window.console) console.log('focus swipe right');
				e.preventDefault();
				boxBtnL_click();
			}//end func
			
			//----------鼠标事件
			function boxBtnL_click(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function boxBtnR_click(e){
				boxDir=-1;
				boxRollFunc();
			}//end func			
			function timerFunc(){
				if(_auto){
					clearInterval(boxTimer);
					boxTimer=setInterval(boxRollFunc,_delay);
				}//end if
			}//end func			
			function boxRollFunc(){
				if(!boxCont.hasClass("moving") && boxDis>0){
					boxMotion();
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func	
			function boxMotion(){
				boxCont.addClass('moving');
				_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
				boxThis=boxCont.children();				
				if(boxDir==-1) boxCont.transition({x:-boxWd }, boxJump?0:_sp, function(){
					boxThis.last().after(boxThis.first());
					boxCont.css({x:0});
					boxNow=parseInt(boxCont.children().first().data('id'));
					boxMotionComplete();
				});
				else {
					boxThis.first().before(boxThis.last());
					boxThis=boxCont.children();
					boxCont.css({x:-boxWd});
					boxCont.transition({x:0}, boxJump?0:_sp,function(){
						boxNow=parseInt(boxCont.children().first().data('id'));
						boxMotionComplete();
					});
				}//end else if
			}//end func		
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(_callback) _callback(boxNow);	
			}//end if
		},//end fn
		focusPrev: function() {
			$(this).trigger('prev');
		},//end fn
		focusNext: function() {
			$(this).trigger('next');
		},//end fn
		focusStop: function() {
			$(this).trigger('stop');
		},//end fn
		focusPlay: function() {
			$(this).trigger('play');
		},//end fn
		focusOff: function() {
			$(this).trigger('off');
		}//end fn	
	});//end extend	
})(jQuery);//闭包