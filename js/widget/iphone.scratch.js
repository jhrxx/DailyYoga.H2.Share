//2014.12.8
(function($) {
	$.fn.extend({
		scratchOn: function(option) {	
			var _this=$(this);
			var _mask='images/mask.png',_shell=$('body'),_callback;
			var _canvas,_wd,_ht,_left=0.36,_avb,_line=40;
			if(option){
				_left=option.left!=null?option.left:0.36;
				_line=option.line!=null?option.line:40;
				_mask = option.mask!=null?option.mask:'images/mask.png';
				_shell = option.shell!=null?option.shell:$('body');
				_callback=option.callback;
			}//end if
			_line=$(window).width()/320*_line;
			imageLoad(_mask,init);
			
			function init(){
				_canvas=$('<canvas></canvas>').attr({width:_this.outerWidth(),height:_this.outerHeight()}).css({position:'fixed',left:_this.offset().left,top:_this.offset().top}).appendTo(_shell);
				_this.css({visibility:'visible'});
				_wd = _canvas.width();
				_ht = _canvas.height();
				_avb=_wd*_ht*_left;//剩余多少有效像素后触发刮刮卡中奖信息
				var ctx=_canvas[0].getContext('2d');
				//必须使用加载图片作为蒙版，而不是填充颜色，图片顶边必须留有一像素高的的透明区域，否则会在三星S4里无法正确刷新渲染
				var img = new Image();
				img.src = _mask;
				ctx.drawImage(img, 0, 0, _wd, _ht);
				ctx.globalCompositeOperation = 'destination-out';
				ctx.fillStyle = "rgba(255,255,255,1)";
				ctx.strokeStyle = "rgba(255, 255, 255, 1)";
				ctx.lineJoin = "round";
				ctx.lineCap = "round";
				ctx.lineWidth = _line; 
				_canvas.on('touchstart',ios_touchstart).on('touchmove',ios_touchmove).on('touchend',ios_touchend);
			}//end func
					
			//----------------刮刮卡功能
					
			function ios_touchstart(e){
				e.preventDefault();
				var x = event.touches[0].pageX - $(this).offset().left,
				y = event.touches[0].pageY - $(this).offset().top;
				var ctx=this.getContext('2d');
				ctx.beginPath();
				ctx.arc(x, y, _line/2, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
				ctx.beginPath();
				ctx.moveTo(x, y);
				//解决三星等安卓机型由于图形驱动问题无法渲染canvas的bug，不断切换去除opacity属性和opacity=0.999之间让浏览器能过刷新渲染canvas
				if(os.android) this.style.opacity = this.style.opacity ? "" : "0.999";
			}//end func
			
						
			function ios_touchmove(e){
				e.preventDefault();	                    
				var x = event.touches[0].pageX - $(this).offset().left,
				y = event.touches[0].pageY - $(this).offset().top;
				var ctx=this.getContext('2d');
				ctx.lineTo(x,y);
				ctx.stroke();
				//解决三星等安卓机型由于图形驱动问题无法渲染canvas的bug，不断切换去除opacity属性和opacity=0.999之间让浏览器能过刷新渲染canvas
				if(os.android) this.style.opacity = this.style.opacity ? "" : "0.999";
			}//end func    
					
			function ios_touchend(e){
				e.preventDefault();
				var ctx=this.getContext('2d');
				ctx.closePath();
				// 得到中奖图片的像素数据（像素计算非常耗费CPU和内存，可能会导致浏览器崩溃）。
				var data = ctx.getImageData(0, 0, _wd, _ht).data;
				// 通过计算每一个像素，alpha不为0的为有效像素，得知还有多少有效像素,低于设定值则算作挂卡结束。
				var j=0;
				for (var i = 0; i < data.length; i+=4) if (data[i + 3]) j++;
				console.log(j);
				// 低于设定值则算作挂卡结束，弹出中奖信息，同时撤掉遮挡区域。
				if (j <= _avb) {
					ctx.clearRect(0, 0, _wd, _ht);
					$(this).off().remove();
					if(_callback) _callback();
				}//end if
			}//end func
		}//end fn
	});//end extend
})(jQuery);//闭包