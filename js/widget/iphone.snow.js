//2015.1.13
(function($) {	
	$.fn.extend({
		snowOn: function(option) {	
			var _this=$(this);
			var _x=-1,_y=-1,_num=50,_speed=5000,_ratio=5,_roll=false,_skew=false,_type=1,_style='style',_offset=0;
			if(option){
				_num = option.number!=null?option.number:50;
				_speed = option.speed!=null?option.speed:5000;
				_ratio = option.ratio!=null?option.ratio:5;
				_roll = option.roll!=null?option.roll:false;
				_skew = option.skew!=null?option.skew:false;
				_type = option.type!=null?option.type:1;
				_style = option.style!=null?option.style:'style';
				_x=option.x!=null?option.x:-1;
				_y=option.y!=null?option.y:-1;
				_offset=option.offset!=null?option.offset:0;
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
				for(var i=0; i<_num; i++){
					var box=$('<i></i>').appendTo(_this);
					box_set(box,true);
				}//end for
			}//end func
			
			function box_set(box,start){
				start=start||false;
				if(_type>1) box.removeClass().addClass(_style+randomRange(1,_type));
				var ratio=randomRange(1,_ratio);//远近比例参数,5 LEVEL
				if(_ratio>1) var scale=0.1+ratio*0.18;
				else var scale=1;
				var x_tar=randomRange(-Math.abs(_offset),_this.width()+Math.abs(_offset));
				if(_x!=-1) var x=_x;
				else var x=x_tar-_offset;
				if(_y!=-1) var y=_y;
				else{
					if(start) y=randomRange(0,_this.height());
					else var y=-box.height();
				}//end else
				var y_tar=_this.height();
				var speed=_speed+(_ratio-ratio)*randomRange(_speed,_speed*2);
				if(start){
					speed=Math.round((y_tar-y)/y_tar*speed);
					x=x_tar-(y_tar-y)/y_tar*_offset;
				}//end if
				var rotate=getDeg([x,y],[x_tar,y_tar])-90;
				var css={x:x,y:y,scale:scale,rotate:rotate};
				var trans={x:x_tar,y:y_tar,rotate:rotate};
				if(_roll){
					css.perspective=400;
					css.rotateX=randomRange(-45,45);
					css.rotateY=randomRange(-45,45);
					trans.rotateX=360+randomRange(0,360);
				}//end else
				if(_skew){
					css.skewX=randomRange(-45,45);
					css.skewY=randomRange(-45,45);
				}//end else
				box.css(css).transition(trans,speed,'linear', function(){
					box_set($(this));
				});
			}//end func
			
		},//end fn
		snowOff: function() {
			$(this).trigger('off');
		}//end fn
	});//end extend	
})(jQuery);//闭包