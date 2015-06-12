//2015.1.21
(function($) {	
	jQuery.fn.extend({
		focusR: function(option) {	
			var _this=$(this);
			var boxCont,boxThis,boxBtn,boxBtnL,boxBtnR,boxWd,boxHt,boxMax,boxesWd,boxesHt,boxDis,boxTar,boxTimer,boxNow,boxBtnThis,boxDir,boxJump;
			var _auto=false,_sp=1000,_delay=5000;
			var _posXSt,_posYSt,_posXLast,_posYLast;
			var _callback;
			if(option){
				_delay=option.delay!=null?option.delay:5000;
				_sp=option.speed!=null?option.speed:1000;
				_auto=option.auto!=null?option.auto:false;
				_callback=option.callback;
			}//end if	
			init();
			function init(){
				boxWd=_this.width();
				boxHt=_this.height();
				boxCont=_this.children('.boxCont');
				boxThis=boxCont.children().css({width:_this.width(),height:_this.height()});
				boxBtn=_this.children("a.boxBtn");
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnR=_this.children("a.boxBtnR");
				boxMax=boxThis.length;//一共有几张图
				boxesWd=boxMax*boxWd;//总长度
				boxesHt=boxMax*boxHt;//总高度
				boxTar=0;
				boxNow=1;
				boxDir=-1;
				boxJump=false;
				boxCont.width(boxesWd);
				boxDis=boxesWd-boxWd;		
				for(var i=0; i<boxMax; i++) boxBtn.append('<span></span>');
				_this.on("off",_this_off).on("reset",resetFunc).on("goto",gotoFunc).on("prev",prevFunc).on("next",boxNext).on("stop",stopFunc).on("play",playFunc);
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(boxMax<=1){
					boxBtnL.hide();
					boxBtnR.hide();
					boxBtn.hide();
				}//end if
				if(boxBtnL.length>0) boxBtnL.on('touchend',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('touchend',boxBtnR_click);
				if(boxBtn.length>0){
					boxBtnThis=boxBtn.children();
					boxBtnThis.on('touchend',boxBtnThis_click);
				}//end if
				boxBtnChange();
				timerFunc();
			}//end func
						
			
			//---------自定义事件	
			
			//关闭功能
			function _this_off(e){
				_this.off("off",_this_off).on("reset",resetFunc).off("goto",gotoFunc).off("prev",prevFunc).off("next",boxNext).ooffn("stop",stopFunc).off("play",playFunc);
				_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
				if(boxBtn.length>0) boxBtnThis.off();
				if(boxBtnL.length>0) boxBtnL.off();
				if(boxBtnR.length>0) boxBtnR.off();
				if(boxBtn.length>0) boxBtnThis.off();
				if(_auto) clearInterval(boxTimer);
			}//end func
					
			function stopFunc(e){
				console.log('focus stop');
				clearInterval(boxTimer);
			}//end func
			function playFunc(e){
				console.log('focus play');
				clearInterval(boxTimer);
				boxTimer=setInterval(boxRollFunc,_delay);
			}//end func
			function prevFunc(e){
				if(!boxCont.hasClass("moving") && boxDis>0 && boxNow > 1){	
					boxNow--;
					boxDir=-1;
					boxMotion();
					boxBtnChange();
				}//end if
			}//end func
			function boxNext(e){
				if(!boxCont.hasClass("moving") && boxDis>0 && boxNow < boxMax){
					boxNow++;
					boxDir=1;
					boxMotion();
					boxBtnChange();
				}//end if
			}//end func
			function resetFunc(e){
				if(window.console) console.log('focus reset');
				boxNow=1;
				boxDir=-1;
				boxJump=true;
				boxMotion();
				boxBtnChange();
				timerFunc();
			}//end func
			function gotoFunc(e,value1,value2){
				if(boxDis>0 && boxNow!=value1){
					boxNow=value1;
					boxJump=value2;
					boxMotion();
					boxBtnChange();
					timerFunc();
				}//end if
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
			function boxBtnThis_click(e){
				var _obj=$(e.target);
				var _id=_obj.index();
				if(!boxCont.hasClass("moving") && boxDis>0){
					var last=boxNow;
					boxNow=_id+1;
					boxDir=boxNow>last?1:boxDir;
					boxDir=boxNow<last?-1:boxDir;
					boxMotion();
					boxBtnChange();
				}//end if
			}//end func
			function boxBtnL_click(e){
				if(!boxCont.hasClass("moving") && boxDis>0 && boxNow > 1){	
					boxNow--;
					boxDir=-1;
					boxMotion();
					boxBtnChange();
				}//end if
			}//end func
			function boxBtnR_click(e){
				if(!boxCont.hasClass("moving") && boxDis>0 && boxNow < boxMax){	
					boxNow++;
					boxDir=1;
					boxMotion();
					boxBtnChange();
				}//end if
			}//end func			
			function timerFunc(){
				if(_auto){
					clearInterval(boxTimer);
					boxTimer=setInterval(boxRollFunc,_delay);
				}//end if
			}//end func			
			function boxRollFunc(){
				if(!boxCont.hasClass("moving") && boxDis>0){	
					if(boxNow==1 || boxNow==boxMax)boxDir=-boxDir;
					if(boxDir==-1){ boxNow--;}else{boxNow++;}
					boxMotion();
					boxBtnChange();
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func			
			function boxMotion(){
				if(boxJump){
					boxJump=false;
					boxCont.css({x:-(boxNow-1) * boxWd,y:0});
				}//end if
				else{	
					boxCont.addClass('moving');
					_this.off('swipeleft swiperight');
					boxCont.transition({ x:-(boxNow-1) * boxWd ,y:0}, _sp, boxMotionComplete);
				}//end else		
			}//end func
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(_callback) _callback(boxNow-1);	
			}//end if		
			function boxBtnChange(){
				if(boxBtnL.length>0 && boxBtnR.length>0){
					if(boxNow==1){
						boxBtnL.removeClass("active");
						boxBtnR.addClass("active");
					}else if(boxNow==boxMax){
						boxBtnL.addClass("active");
						boxBtnR.removeClass("active");
					}else{
						boxBtnL.addClass("active");
						boxBtnR.addClass("active");
					}//end if
				}//end if
				if(boxBtn.length>0) boxBtnThis.removeClass().eq(boxNow-1).addClass("active");				
			}//end func
		},//end fn	
		focusReset: function() {
			$(this).trigger('reset');
		},//end fn	
		focusGoto: function(value1,value2) {
			value1=value1!=null?value1:1;
			value2=value2!=null?value2:false;
			$(this).trigger('goto', [value1,value2]);
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
