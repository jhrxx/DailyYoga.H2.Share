<!DOCTYPE html>
<html><!-- InstanceBegin template="/Templates/index.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<title>微信模板页</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="320">
<meta http-equiv="cleartype" content="on">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<link rel="shortcut icon" href="favicon.ico">
<script>
//平台检测，判断浏览器、操作系统环境
var os=detectOS();
function detectOS() {
	var	userAgent=navigator.userAgent;
	console.log(userAgent);
	var os = {}; 
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.androidICS = os.android && userAgent.match(/(Android)\s4/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp=userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	if(os.ios) os.iosVer=parseInt(userAgent.match(/OS \d_/)[0].match(/\d/)[0]);
	else os.iosVer=0;
	return os;
}//end func
//判断是否处于微信内置浏览器
var isWeixin=detectWeixin();
function detectWeixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") return true;
	else return false;
}//end func
</script>
<link rel="stylesheet" type="text/css" href="css/iphone.css" />
<!--head可编辑区域开始 -->
<!-- InstanceBeginEditable name="head" -->
<!-- InstanceEndEditable -->
<!--head可编辑区域结束 -->
</head>
<body>
<?php
	$id  = $_GET['id'] ? (int)$_GET['id'] : 0;
	if($id) {
		    function request_curl($url) {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_TIMEOUT, 25);
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
				curl_setopt($ch, CURLOPT_URL, $url);
				$response = curl_exec($ch);
				//log记录每次请求的url ，参数，以及返回值
				$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
				curl_close($ch);
				if ($http_code == 200) {
					return $response;
				} else {
					return false;
				}
			}
			
			$url = 'http://192.168.200.168/yoga/yogacircle/getPostDetail?type=2&postId='.$id.'&debug=1';
			$data  = request_curl($url);
			if($data) {
				$result = json_decode($data, true);
				$result  = $result['result'] ? $result['result'] : '';
				if($result) {
					$title = $result['title'] ? $result['title'] : '';
					$content = $result['content'] ? $result['content'] : '';
					$figure = $result['figure'] ? $result['figure'] : array();
				}
				else {
					echo '抱歉，您访问的页面不存在!';
					exit;
				}
			}
			else {
				echo '抱歉，您访问的页面不存在!';
				exit;
			}
		?>
			<!--------------------------------------------------------------html区域-------------------------------------------------------------------------------------->
			<div id="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
			<!--html可编辑区域开始 -->
			<!-- InstanceBeginEditable name="html" -->
			<!--借助HTML5的新增标签，使得页面结构层次更加语义化 -->
			<div class="index">
				<h3><?php echo $title;?></h3>
				<p><?php echo $content;?></p>
				<?php
					if($figure) {
						foreach($figure as $value) {
							?>
								<p><img src="<?php echo $value['url'];?>" style="width:100%"></p>
							<?php
						}
					}
				?>
			</div>
			<div style="height:50px;"></div>
			<div class="bar">
				<ul>
					<li class="l1 fl">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
						  <tr>
							<td><img src="images/index/icon.png" class="icon"></td>
							<td><p class="txt">每日瑜伽<br>让健康触手可及！</p></td>
						  </tr>
						</table>
					</li>
					<li class="l2 fr">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
						  <tr>
							<td><a href="" id ="app_download_url" class="btn" id="btnDownload" target="_blank" ><img src="images/index/download_3.png" id="download_image" ></a></td>
						  </tr>
						</table>
					</li>
				</ul>
			</div>

			<!-- InstanceEndEditable -->
			<!--html可编辑区域结束 -->
			<div id="alertBox"><p class="text"></p><p class="btn"><a class="close">确认</a></p></div>
			<div id="turnBox"><span></span></div>
		<?php
	}
	else {
		echo '抱歉，您访问的页面不存在!';
		exit;
	}
?>


<!--------------------------------------------------------------javascript区域-------------------------------------------------------------------------------------->
<script type="text/javascript" src="js/base/jquery.js"></script><!--jquery 2-->
<script type="text/javascript" src="js/base/framwork.js"></script><!--JS框架，内含transit,PxLoader等必要库，gasp库已经剥离到timeline.js，加载滚屏框架page.js的时候必须先加载js/base/timeline.js-->
<script type="text/javascript" src="js/widget/iphone.pop.js"></script><!--弹窗用法：$('dom选择器').popOn();-->
<script type="text/javascript" src="js/widget/iphone.scrbar.js"></script><!--自定义滚动条用法：$('dom选择器').scrbar()-->
<script type="text/javascript" src="js/common.js"></script><!--公用JS -->
<!--javascript可编辑区域开始 -->
<!-- InstanceBeginEditable name="script" -->
<script>
$(document).ready(function(e) {
	
	//代替alert命令
	//alertFunc('测试测试');
	
	//var cir=getCircle(12,3);
	var ostype=detectOS();
	if(ostype.android || ostype.androidICS) {
		$('#app_download_url').attr('href', 'http://192.168.200.168/prince/index/appurl?type=1&debug=1');
		//$('#download_image').attr('src', 'images/index/download_1.png');
	}
	else {
		$('#app_download_url').attr('href', 'http://192.168.200.168/prince/index/appurl?type=0&debug=1');
		//$('#download_image').attr('src', 'images/index/download_2.png');
	}

	init();
	
	function init(){
		addEvent();//添加事件
		addMonitor();//按钮添加百度统计监测
	}//end init
	
	function addEvent(){
	}//end func
	
	function addMonitor(){//按钮添加百度统计监测
		//百度统计添加代码示例：
		//monitorAdd({obj:$('按钮选择器'),category:'页面名称',label:'按钮名称'});
		//monitorAdd({obj:$('#btnTest'),category:'首页',label:'测试按钮'});
	}//end func
	
});
</script>
<!-- InstanceEndEditable -->
<!--javascript可编辑区域结束 -->
<!--PM提供的百度统计代码贴在这里-->
</body>
<!-- InstanceEnd --></html>