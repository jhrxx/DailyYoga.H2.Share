	//--------------------------------摇一摇函数
	function shakeOn(option){
		var _delay=50,_hold=100,_max=3,_now=0,_callback;
		var _lastTime=0,_lastX,_lastY,_lastZ;
		if(option){
			_callback=option.callback;
			_hold=option.hold!=null?option.hold:100;
			_max=option.max!=null?option.max:3;
			_delay=option.delay!=null?option.delay:50;
		}//end option
		if(_callback) init();
		function init(){
			_now=0;
			_lastTime=0;
			shakeOff();
			if(window.DeviceMotionEvent) window.addEventListener('devicemotion',deviceMotionHandler,false);
		}//end func
		function deviceMotionHandler(event) {
			var curTime = new Date().getTime();
			if ((curTime-_lastTime)>_delay) {
				var diffTime = curTime -_lastTime;
				_lastTime = curTime;
				// 获取含重力的加速度
				var acceleration = event.accelerationIncludingGravity; 
				var speed = Math.abs(acceleration.x+acceleration.y+acceleration.z-_lastX-_lastY-_lastZ)/diffTime*10000;
				if (speed >= _hold){
					_now++;
					if(_now>=_max){
						_now=0;
						_callback();
					}//end if
				}//end if
				else{
					_now--;
					_now=_now<0?0:_now;
				}//end else 
				_lastX=acceleration.x;
				_lastY=acceleration.y;
				_lastZ=acceleration.z;
			}//end if
		}//end event
	}//end func
	
	function shakeOff(){
		if (window.DeviceMotionEvent) window.removeEventListener('devicemotion');
	}//end func