//2015.1.6
(function($) {	
	$.fn.extend({
		shineOn: function(option) {	
			var _this=$(this);
			var _x=-1,_y=-1,_num=50,_speed=1000,_ratio=5,_roll=false,_skew=false,_type=1,_style='style';
			if(option){
				_num = option.number!=null?option.number:50;
				_ratio = option.ratio!=null?option.ratio:5;
				_roll = option.roll!=null?option.roll:false;
				_skew = option.skew!=null?option.skew:false;
				_type = option.type!=null?option.type:1;
				_style = option.style!=null?option.style:'style';
				_x=option.x!=null?option.x:-1;
				_y=option.y!=null?option.y:-1;
			}//end if
			init();
			
			function init(){
				_this.on('off',_this_off);
				box_creat();
			}//end func	
			
			function _this_off(e){
				_this.off('off',_this_off);
				_this.empty();
			}//end func
			
			function box_creat() {
				_this.empty();
				for(var i=0; i<_num; i++){
					var box=$('<i></i>').appendTo(_this);
					box_set(box);
				}//end for
			}//end func
			
			function box_set(box){
				if(_type>1) box.removeClass().addClass(_style+randomRange(1,_type));
				var ratio=randomRange(1,_ratio);//远近比例参数,5 LEVEL
				var scale=0.1+ratio*0.18;
				var x=randomRange(0,_this.width());
				var y=randomRange(0,_this.height());
				var opacity_tar=randomRange(30,70)*0.01;
				var css={left:x,top:y,scale:scale,opacity:0};
				var speed=randomRange(500,1000);
				box.css(css);
				box.transition({opacity:opacity_tar},speed, function(){
					box.transition({opacity:0},speed, function(){
						box_set($(this));
					});
				});
			}//end func
			
		},//end fn
		shineOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend	
})(jQuery);//闭包