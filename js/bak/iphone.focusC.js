//2015.1.21
(function($) {
	$.fn.extend({
		focusC: function(option) {
			var _this=$(this);	
			var boxCont,boxThis,boxBtnL,boxBtnR,boxTot,boxWd,boxMax,boxesWd,boxDis,boxUnit,boxTar,boxTimer,boxNow,boxBtnThis,boxRollDir,boxShowNum,boxJump;
			var _auto=false,_sp=1000,_delay=5000;
			var _posXSt,_posYSt,_posXLast,_posYLast;
			var _start,_complete;
			if(option){
				_delay=option.delay!=null?option.delay:5000;
				_sp=option.speed!=null?option.speed:1000;
				_auto=option.auto!=null?option.auto:false;
				_start=option.start;
				_complete=option.complete;
			}//end if
			init();	
			function init(){
				boxCont=_this.children('.boxCont');
				boxThis=boxCont.children();
				boxTot=boxThis.length;//实际有几张图
				boxBtn=_this.children("a.boxBtn");
				boxBtnL=_this.children("a.boxBtnL");
				boxBtnR=_this.children("a.boxBtnR");
				boxWd=_this.width();
				boxTar=0;
				boxNow=1;
				boxRollDir=-1;
				boxShowNum=1;
				boxJump=false;
				boxCont.append(boxThis.first().clone());
				boxThis=boxCont.children().css({width:_this.width(),height:_this.height()});
				boxMax=boxThis.length;
				boxesWd=boxMax*boxWd;//总长度
				boxCont.width(boxesWd);
				boxDis=boxesWd-boxWd;boxUnit=boxWd;	
				for(var i=1; i<boxMax;i++) boxBtn.append('<span></span>');
				_this.on("off",_this_off).on("reset",resetFunc).on("goto",gotoFunc).on("prev",prevFunc).on("next",nextFunc).on("stop",stopFunc).on("play",playFunc);
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
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
			
			function _this_off(e){
				_this.off("off",_this_off).off("reset",resetFunc).off("goto",gotoFunc).off("prev",prevFunc).off("next",nextFunc).off("stop",stopFunc).off("play",playFunc);
				_this.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
				if(boxBtn.length>0) boxBtnThis.off();
				if(boxBtnL.length>0) boxBtnL.off();
				if(boxBtnR.length>0) boxBtnR.off();
				if(boxBtn.length>0) boxBtnThis.off();
				if(_auto) clearInterval(boxTimer);
			}//end func
			
			function stopFunc(event){
				clearInterval(boxTimer);
			}//end func
			function playFunc(event){
				timerFunc();
			}//end func
			function prevFunc(event){
				boxRollDir=1;
				boxRollFunc();
			}//end func
			function nextFunc(event){
				boxRollDir=-1;
				boxRollFunc();
			}//end func
			function resetFunc(event){
				if(window.console) console.log('focus reset');
				boxNow=1;
				boxJump=true;
				boxMotion();
				if(boxBtn.length>0) boxBtnChange();
			}//end func
			function gotoFunc(event,value1,value2){
				console.log('value1:'+value1);
				if(boxDis>0){
					boxNow=value1;
					boxJump=true;
					boxTar=-boxWd*(boxNow-1);
					boxMotion();
					if(boxBtn.length>0) boxBtnChange();
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
					boxNow=_id+1;    
					boxTar=-boxWd*(boxNow-1);
					boxMotion();
					if(boxBtn.length>0) boxBtnChange();
				}//end if
			}//end func
			function boxBtnL_click(e){
				boxRollDir=1;
				boxRollFunc();
			}//end func
			function boxBtnR_click(e){
				boxRollDir=-1;
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
						boxTar+=boxUnit*boxRollDir;	
						if(boxRollDir==-1 && boxTar<-boxDis){
							boxCont.css({x:0});
							boxTar=-boxUnit;
						}//end if(boxRollDir==-1) 
						else if(boxRollDir==1 && boxTar>0){	
							boxTar=-boxesWd+boxShowNum*boxUnit;
							boxCont.css({x:boxTar});
							boxTar+=boxUnit;
						}//end else (boxRollDir==-1)							   
					if(boxRollDir==-1){
					  boxNow++;
					  boxNow=boxNow>boxTot?1:boxNow;
					}//end if
					else{
					  boxNow--;
					  boxNow=boxNow<1?boxTot:boxNow; 
					}//end else
					boxMotion();		
					if(boxBtn.length>0) boxBtnChange();
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func	
			function boxMotion(){
				if(boxJump){
					boxJump=false;
					boxCont.css({x:boxNow==1?0:boxTar});
				}//end if
				else{
					boxCont.addClass('moving');
					_this.off('swipeleft swiperight');	
					boxCont.transition({ x:boxTar }, _sp, function(){
						if(boxNow==1) boxCont.css({x:0});
						boxMotionComplete();
					});
				}//end else
				if(_start) _start(boxNow-1);
			}//end func		
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				_this.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
				if(_complete) _complete(boxNow-1);	
			}//end if
			function boxBtnChange(){
				if(boxBtn.length>0) boxBtnThis.removeClass().eq(boxNow-1).addClass("active");
			}//end func
		},//end fn		
		focusReset: function() {
			$(this).trigger('reset');
		},//end fn	
		focusGoto: function(value1,value2) {
			value1=value1!=null?value1:0;
			value2=value2!=null?value2:true;
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