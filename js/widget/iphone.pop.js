//2015.1.9
(function($) {	
	$.fn.extend({
		popOn: function(option) {	
			var _this=$(this);
			var _y,_text,_url,_callback,_parent,_fade=0;
			var _close=_this.find("a.close");
			if(option){
				_text=option.text;
				_url=option.url!=null?option.url:false;
				_callback=option.callback;
				_y=option.y;
				_fade=option.fade!=null?option.fade:250;
			}//end if
			init();
			
			function init(){
				if(!_this.parent().hasClass("popBox")) _this.wrap("<div class='popBox'></div>");
				_parent=_this.parent().show();
				_this.show();
				if(_fade>0){
					_parent.css({opacity:0}).transition({opacity:1},_fade);
					_this.css({opacity:0}).transition({opacity:1},_fade);
				}//end if
				if(_text) _this.find('.text').html(_text);
				resizeFunc();
				$(window).on('resize',resizeFunc);
				$(document).on('touchmove',noScroll);
				_this.one('off',_this_off);
				if(_close.length>0) _close.one('click',_this_off);
			}//end func
			function _this_off(e){
				_this.off('close',_this_off);
				if(_close.length>0) _close.off();
				if(_fade>0){
					_parent.transition({opacity:0},Math.round(_fade/2));
					_this.transition({opacity:0},Math.round(_fade/2),closeFunc);
				}//end if
				else closeFunc();
			}//end func
			
			function closeFunc(){
				_this.unwrap().hide();
				$(window).off('resize',resizeFunc);
				$(document).off('touchmove',noScroll);
				if(_callback) _callback();
				if(_url) window.location.href = _url;
			}//edn func
			
			function resizeFunc(e){
				if(_y) _this.css({x:$(window).width()/2-_this.outerWidth()/2,y:_y});
				else _this.css({x:$(window).width()/2-_this.outerWidth()/2,y:$(window).height()/2-_this.outerHeight()/2});
			}//end func
			
			function noScroll(e){
				e.preventDefault();
			}//end func
			
		},//end fn
		popOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend	
})(jQuery);//闭包