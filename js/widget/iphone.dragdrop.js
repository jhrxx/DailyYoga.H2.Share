//2014.12.17
(function($) {	
	$.fn.extend({
		dragdropOn: function(option) {
			var _this=$(this);	
			var _target,_complete,_hitted,_miss,_move=false,_speed=300,_org=[];
			var _parent=_this.parent();
			if(option){
				_target=option.target;
				_complete=option.complete;
				_miss=option.miss;
				_hitted=option.hitted;
				_move=option.move!=null?option.move:false;
				_speed=option.speed!=null?option.speed:300;
			}//end if
			if(_target){
				_org=[_this.position().left,_this.position().top];
				 init();
			}//end if
			function init(){
				_this.on("off",_this_off).on("reset",_this_reset);
				_this_reset();
			}//end func
			
			//关闭功能
			function _this_off(e){
				_this.off('touchstart',_this_touchstart).off('touchmove',_this_touchmove).off('touchend',_this_touchend);
			}//end func
			
			//重置
			function _this_reset(e){
				_this.on('touchstart',_this_touchstart).on('touchmove',_this_touchmove).on('touchend',_this_touchend);
			}//end func
			
			function _this_touchstart(e){
				e.preventDefault();
			}//end func
	
			function _this_touchmove(e){
				e.preventDefault();
				if(!_this.hasClass('locked') && !_this.hasClass('hitted') && !_this.hasClass('missed')){
					$(this).css({left:event.touches[0].pageX-_parent.offset().left-$(this).width()*0.5,top:event.touches[0].pageY-_parent.offset().top-$(this).height()*0.5});
					if(_move && hitTest($(this),_target)) _this_hitted();
				}//end if
			}//end func
			
			function _this_touchend(e){
				e.preventDefault();
				if(!_this.hasClass('locked') && !_this.hasClass('hitted') && !_this.hasClass('missed')){
					if(hitTest($(this),_target)) _this_hitted();
					else{
						_this.addClass('missed');
						$(this).transition({ left:_org[0],top:_org[1] }, 250, function(){
							_this.removeClass('missed');
							if(_miss) _miss(_this);
						});
					}//end else
				}//end if
			}//end func
			
			function _this_hitted(){
				console.log('hitted');
				_this.addClass('hitted');
				_target.addClass('hitted');
				if(_hitted) _hitted(_this);
				_this.transition({ left:_target.position().left+_target.width()*0.5-_this.width()*0.5,top:_target.position().top+_target.height()*0.5-_this.height()*0.5,scale:0 }, _speed, function(){
					_this.removeClass('hitted');
					_target.removeClass('hitted');
					if(_complete) _complete(_this);
				});
			}//end func
			
			function hitTest(obj1,obj2){
				var pos1=[obj1.offset().left+obj1.width()/2,obj1.offset().top+obj1.height()/2];
				var pos2=[obj2.offset().left+obj2.width()/2,obj2.offset().top+obj2.height()/2];
				var disX=Math.abs(pos2[0]-pos1[0]);
				var disY=Math.abs(pos2[1]-pos1[1]);
				if(disX<=obj1.width()/2+obj2.width()/2 && disY<=obj1.height()/2+obj2.height()/2) return true;
				else return false;
			}//end func 碰撞函数，测试2个DOM对象是否
			
		},//end fn
		dragdropReset: function() {
			$(this).trigger('reset');
		},//end fn
		dragdropOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend
})(jQuery);//闭包