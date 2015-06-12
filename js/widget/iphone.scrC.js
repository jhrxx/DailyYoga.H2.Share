//2015.1.26
(function($) {
	$.fn.extend({
		scrC: function(option) {
			var _this=$(this);
			var boxMask,boxCont,boxThis,boxBtnL,boxBtnR,boxMax,boxDis,boxTimer,boxDir,boxWd;
			var boxAuto=false,boxSpeed=1000,boxDelay=5000;
			var _start,_complete;
			if(option){
				boxDelay=option.delay!=null?option.delay:5000;
				boxSpeed=option.speed!=null?option.speed:1000;
				boxAuto=option.auto!=null?option.auto:false;
				_start=option.start;
				_complete=option.complete;
			}//end if	
			init();
			function init(){	
				boxMask=_this.children(".boxMask");
				boxCont=boxMask.children();
				boxThis=boxCont.children().each(function(i) {$(this).data({id:i});});
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnL.css({top:_this.outerHeight()/2-boxBtnL.height()/2});
				boxBtnR=_this.children("a.boxBtnR");
				boxBtnR.css({top:_this.outerHeight()/2-boxBtnR.height()/2});
				boxMax=boxThis.length;//一共有几张图
				boxDir=-1;	
				boxWd=boxThis.first().outerWidth(true);
				boxCont.width(boxWd*boxMax);
				boxDis=boxCont.width()-boxMask.width();
				_this.on("prev",prevFunc).on("next",nextFunc).on("stop",stopFunc).on("play",playFunc);
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(boxBtnL.length>0) boxBtnL.on('touchend',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('touchend',boxBtnR_click);
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
				boxDir=1;
				boxRollFunc();
			}//end func
			function nextFunc(e){
				boxDir=-1;
				boxRollFunc();
			}//end func
			function boxBtnL_click(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function boxBtnR_click(e){
				boxDir=-1;
				boxRollFunc();
			}//end func	
			function timerFunc(){
				if(boxAuto){
					clearInterval(boxTimer);
					boxTimer=setInterval(boxRollFunc,boxDelay);
				}//end if
			}//end func				
			function boxRollFunc(){
				if(!boxCont.hasClass("moving")){
					boxCont.addClass('moving');
					_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
					if(boxDis>0){	
						boxThis=boxCont.children();						
						if(boxDir==-1) boxCont.transition({x:-boxWd }, boxSpeed, function(){
							boxThis.last().after(boxThis.first());
							boxCont.css({x:0});
							boxMotionComplete();
						});
						else {
							boxThis.first().before(boxThis.last());
							boxThis=boxCont.children();
							boxCont.css({x:-boxWd});
							boxCont.transition({x:0}, boxSpeed, boxMotionComplete);
						}//end else if
						if(_start) _start();
					}//end if boxDis>0
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(_complete) _complete();	
			}//end if
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