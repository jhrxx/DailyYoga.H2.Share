//2014.12.17
(function($) {
	$.fn.extend({
		scrbar: function(option) {	
			var _this=$(this);
			var _cont,_panel,_bar,_tar,_can,_size,_sizeLast,_timer,_posLast=[],_static=false,_speed=1;
			if(option){
				_static = option.static!=null?option.static:false;
				_speed = option.speed!=null?option.speed:1;
			}//end if
			init();	
			function init(){
				_tar=0;
				_cont=_this.children(".cont");
				_panel=_this.children(".panel");
				_bar=_panel.children();
				_this.on("off",_this_off).on("reset",resetFunc);
				_this.on("touchstart",_this_touchstart).on("touchmove",_this_touchmove);
				_sizeLast=_size=0;
				sizeFunc();
				_timer=setInterval(sizeFunc,500);	
			}//end func		
			
			//关闭功能
			function _this_off(e){
				_this.off("off",_this_off).off("reset",resetFunc);
				_this.off("touchstart",_this_touchstart).off("touchmove",_this_touchmove);
				clearInterval(_timer);
			}//end func
			
			//重置滚动高度
			function resetFunc(e){
				_tar=0;
				scrollFunc();
			}//end func
			
			//-------------------------------高宽度侦测及初始化
			function sizeFunc(){
				_size=_cont.outerHeight();
				if(_sizeLast!=_size){
					_sizeLast=_size;//滚动内容上一次高
					if(_static) _bar.css({y:-_cont.position().top/(_cont.outerHeight()-_this.height())*(_this.height()-_bar.outerHeight())});	
					else _bar.css({height:_this.height()/_cont.outerHeight()*_panel.height(),y:-_cont.position().top/(_cont.outerHeight()-_this.height())*(_this.height()-_bar.outerHeight())});
					if(_size<=_this.height()){
						_can=false;
						_panel.hide();
					}//end if
					else{
						_can=true;
						_panel.show();
					}//end else
				}//_sizeLast!=_size					
			}//end func	
			//-----------------TOUCH事件
			function _this_touchstart(e){
				if(_can) _posLast=[event.touches[0].clientX,event.touches[0].clientY];
			}//end func
			function _this_touchmove(e){
				e.preventDefault();
				if(_can){
					_tar-=(event.changedTouches[0].clientY-_posLast[1])*_speed;
					scrollFunc();
					_posLast=[event.changedTouches[0].clientX,event.changedTouches[0].clientY];
				}//end if
			}//end func
			//-------------------------------运动计算部分	 
			function scrollFunc(){
				_tar=_tar>_this.height()-_bar.outerHeight()?_this.height()-_bar.outerHeight():_tar;
				_tar=_tar<0?0:_tar;
				_bar.css({y:_tar});	
				_cont.css({y:-_tar/(_this.height()-_bar.outerHeight())*(_size-_this.height())});		
			}//end func			
		},//end fn
		scrbarReset: function() {
			$(this).trigger('reset');
		},//end fn
		scrbarOff: function() {
			$(this).trigger('off');
		}//end fn	
	});//end extend
})(jQuery);//闭包