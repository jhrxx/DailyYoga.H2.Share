//2015.1.5
(function($) {	
	jQuery.fn.extend({
		gifOn: function(option){
			var _this=$(this);
			var _parent=_this.parent();
			var _path,_type='jpg',_now=1,_start=1,_end=1,_delay=100,_repeat=true,_timer,_callback;
			if(option){
				_path=option.path;
				_type=option.type!=null?option.type:'jpg';
				_start=option.start!=null?option.start:1;
				_end=option.end!=null?option.end:1;
				_delay=option.delay!=null?option.delay:100;
				_repeat=option.repeat!=null?option.repeat:true;
				_callback=option.callback;
			}//end func
			if(_path) loadFunc();
			
			function loadFunc(){
				//载入图
				var loadBox=$('#loadBox');
				var loader = new PxLoader();
				var loadPer=_load.children();
				for(var i=1; i<=_num; i++) loader.addImage(_path+i+'.'+_type);	
				loader.addProgressListener(function(e) { 
					//loadPer.html(Math.round(e.completedCount/e.totalCount*100)); 
				}); 			
				loader.addCompletionListener(function() {
					if(window.console) console.log('all gif load completed');
					loader=null;
					loadBox.fadeOut(500,function(){
						loadBox.remove();
						init();
					});
				});			
				loader.start();	
			}//end func
			
			function init(){
				_this.one('off',_this_off);
				_now=_start-1;
				play();
			}//end init
			
			function _this_off(e){
				clearTimeout(_timer);
				_now=_start;
				var src=_path+_now+'.'+_type;
				_this.attr({src:src});
			}//end if
			
			function play(){
				_now++;
				if(_now>_end){
					if(_callback) _callback();
					if(_repeat){
						 _now=_start;
						 chg();
					}//end if
				}//end if
				else chg();
			}//end func
			
			function chg(){
				//console.log('_now:'+_now);
				var src=_path+_now+'.'+_type;
				//console.log('src:'+src);
				_this.attr({src:src});
				setTimeout(play,_delay);
			}//end func

		},//end fn
		gifOff: function() {
			$(this).trigger('off');
		}//end fn			
	});//end extend
})(jQuery);//闭包