//2014.12.17

$(document).ready(function(e) {
	
	//index
	var sceneRadio=1.5;
	var bgBox=$('#bgBox');
	var fgBox=$('#fgBox');
	
	// 电子罗盘
	var angOrg,angLast,angMax=90;
	var posOrg=0,posNow=0,posOffset=0;
	var compassLast;
	
	//电子罗盘数据面板
	var compassPanel=$('<div id="compassPanel"><h3>电子罗盘</h3><p>alpha：<span class="alpha"></span></p><p>beta：<span class="beta"></span></p><p>gamma：<span class="gamma"></span></p><p>heading：<span class="heading"></span></p> <p>指南针初始值：<span class="heading_org"></span></p><p>指南针当前值：<span class="heading_now"></span></p></div>').appendTo(htmlBox);
	var compassAlpha=compassPanel.find('.alpha');
	var compassBeta=compassPanel.find('.beta');
	var compassGamma=compassPanel.find('.gamma');
	var compassHeading=compassPanel.find('.heading');
	var compassOrg=compassPanel.find('.heading_org');
	var compassNow=compassPanel.find('.heading_now');	
	
	loadFunc();
	
	function loadFunc(){
		//载入图
		loadBox.show();
		var loader = new PxLoader();
		loader.addImage('images/common/loading.gif');
		loader.addCompletionListener(function() {
			if(window.console) console.log('load complete');
			loadBox.hide();
			init();
			loader=null;
		});			
		loader.start();	
	}//end func	
	
	function init(){
		window_resize();
		$(window).on('resize',window_resize);
		$(window).on('deviceorientation',deviceorientationHandler);
	}//end init

	//-------------------屏幕自适应-------------------
	function window_resize(e){
		
	}//end func
	
	//---------------电子罗盘	
	function deviceorientationHandler(e){
		
		compassAlpha.html(getRound(event.alpha));//右手竖直向上拿手机,绕y轴360度自旋，范围0-360
		compassBeta.html(getRound(event.beta));//右手竖直向上拿手机,绕x轴自旋，范围-90-90,竖直向上为90度，水平为0度，竖直向下为-90度
		compassGamma.html(getRound(event.gamma));//右手竖直向上拿手机,左右摇摆，范围-90-90，竖直向上且向左摇摆，为0--90度，竖直向上且向右摇摆，为
		compassHeading.html(getRound(event.webkitCompassHeading));//指南针
		
		//横向移动根据指北针角度
		var compass =Math.round(event.alpha);
		
		if(!angOrg){
			compassLast=angOrg=angLast=compass;
			var ang=0;
		}//end if
		else{
			if(compass!=compassLast){
				if(os.ios){
					var ang=compass;
					compassLast=compass;
				}//end if
				else if(Math.abs(compass-compassLast)>=3){
					var ang=compass;
					compassLast=compass;
				}//end if
				else var ang=compassLast;
				ang=ang<angOrg?360-angOrg+ang:ang-angOrg;//获得相对于角度初始值的当前角度值（0-360）
				if(ang<=15 && angLast>=345){//顺时针进入下个360度
					dir=1;
				}//end if
				else if(ang>=345 && angLast<=15){//逆时针进入下个360度
					dir=-1;
				}//end if
				else{
					dir=ang>=angLast?1:-1;
				}//end else
				angLast=ang;
				//ang+=dir*1;
				ang=ang>180?ang-360:ang;
				if(ang<-angMax){
					ang=-angMax;
					angOrg=compass+angMax;
				}//end if
				else if(ang>angMax){
					ang=angMax;
					angOrg=compass-angMax;
				}//end if
				posOffset=-ang/angMax*(bgBox.width()/2-$(window).width()/2);
				setBgPos();
			}//end if
		}//end else
		compassOrg.html(angOrg);
		compassNow.html(ang);
	}//end func

	function setBgPos(){
		posNow=posOrg+posOffset;
		bgBox.css({x:posNow});
		fgBox.css({x:-posOffset});
		console.log('posOrg:'+posOrg);
		console.log('posOffset:'+posOffset);
		console.log('posNow:'+posNow);
	}//end func
	
});