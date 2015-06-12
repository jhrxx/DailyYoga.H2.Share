//2015.1.31

//移动端播放音频总结：在safri on ios里面明确指出等待用户的交互动作后才能播放media，也就是说如果你没有得到用户的交互动作就播放的话就会被safri拦截。移动版Safari不能自动播放音频文件,音频文件只能从用户触发的触摸事件加载。如果在 HTML 标记中使用了 autoplay 属性，那么移动版 Safari 将会忽略这个属性，并且不会在加载页面时播放此文件。使用了 preload 属性，移动版 Safari 仍会忽视此属性，并且不会加载此文件，除非通过用户触摸事件触发。


//创建背景音乐示例
/*	
var mySound=audioOn({src:'sound/bg.mp3',loop:true});//mySound会被赋予一个audio对象，接下可直接用原生AUDIO API方法对mySound进行操作
$(document).one('touchstart',function(e){soundBg.play();});//只有手指按过过屏幕任意位置后才会触发背景音乐播放，一般应该设计一个“开始”按钮用以连带触发背景音乐播放。
*/
//停止播放音乐：
//soundBg.pause();
//继续播放音乐：
//soundBg.play();
//通过事件创建随机音效并立即播放
//var mySound=audioOn({src:'sound/sound' + randomRange(1, 5) + '.mp3'});
//mySound.play();

$(document).ready(function(e) {
	
	//背景音乐
	var audioBtn=$('a.btnAudio,#btnAudio');
	var audioBg;
	
	init();
	
	function init(){
		//背景音乐播放按钮
		if(audioBtn.length>0) audioBtn.on('click',audioBtn_click);
	}//end func
	
	function audioBtn_click(e){
		var _this=$(this);
		if(!_this.hasClass('loaded') && !_this.hasClass('loading')){
			_this.addClass('loading')
			audioBg=audioOn({src:_this.data('src'),loop:true,loaded:audioBg_loaded,play:audioBg_play,pause:audioBg_pause});
		}//end if
		else{
			if(_this.hasClass('mute')){
				_this.removeClass('mute');
				audioBg.play();
			}//end if
			else{
				_this.addClass('mute');
				audioBg.pause();
			}//end else
		}//end else
		
		function audioBg_loaded(){
			_this.removeClass('loading');
			_this.addClass('loaded');
		}//end func
		
		function audioBg_play(){
			//_this.html('正在播放')
		}//end func
		
		function audioBg_pause(){
			//_this.html('暂停播放');
		}//end func
		
	}//end func
	
	function audioMute_click(e){
		audioMute(audioBg);
	}//end func
	
});//end docuemnt ready

	function audioOn(option){
		if(option && option.src && option.src!=""){
			var audio=new Audio();
			audio.src=option.src;
			audio.loop=option.loop!=null?option.loop:false;//如果loop设置成true就无法正确获得ended事件
			audio.volume=option.volume!=null?option.volume:1;
			var autoplay=option.autoplay!=null?option.autoplay:true;
			var loadstart=option.loadstart;
			var loaded=option.loaded;
			var ended=option.ended;
			var play=option.play;
			var pause=option.pause;
			audio.load();
			audio.addEventListener('loadstart',audio_loadstart,false);
			audio.addEventListener('loadeddata',audio_onloadeddata,false);
			audio.addEventListener('ended',audio_ended,false);
			audio.addEventListener('timeupdate',audio_timeupdate,false);
			audio.addEventListener('play',audio_play,false);
			audio.addEventListener('pause',audio_pause,false);
			return audio;
		}//end if
		
		function audio_loadstart(event){
			var src=get_src(this.src);
			console.log(src+' error');
			if(loadstart) loadstart(this);
		}//end func
		
		function audio_onloadeddata(event){
			var src=get_src(this.src);
			console.log(src+' canplaythrough');
			console.log(src+' duration:'+this.duration);
			if(autoplay) this.play();
			if(loaded) loaded(this);
		}//end func
		
		function audio_ended(event){
			var src=get_src(this.src);
			console.log(src+' ended');
			if(ended) ended(this);
		}//end func
		
		function audio_timeupdate(event){
			//console.log('audio currentTime:'+this.currentTime);
		}//end func
		
		function audio_play(event){
			var src=get_src(this.src);
			console.log(src+' play');
			if(play) play(this);
		}//end func
		
		function audio_pause(event){
			var src=get_src(this.src);
			console.log(src+' pause');
			if(pause) pause(this);
		}//end func
		
		function get_src(str){
			var ary=str.split('/');
			return ary[ary.length-1];
		}//end func
		
	}//end func
	
	function audioPlay(audio,volume){
		if(audio){
			volume=volume!=null?volume:1;
			console.log('volume:'+volume);
			audio.volume=volume;
			audio.play();
		}//end if
	}//end func
	
	function audioStop(audio){
		if(audio){
			audio.currentTime=0;
			audio.pause();
		}//end if		
	}//end func
	
	function audioMute(audio){
		if(audio) audio.muted=audio.muted?false:true;		
	}//end func