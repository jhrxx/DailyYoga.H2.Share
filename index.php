<!DOCTYPE html>
<html><!-- InstanceBegin template="/Templates/index.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<title>每日瑜伽分享</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.3, user-scalable=no">
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
<link rel="stylesheet" type="text/css" href="css/iphone.css?<?php echo time();?>" />
<!--head可编辑区域开始 -->
<!-- InstanceBeginEditable name="head" -->
<!-- InstanceEndEditable -->
<!--head可编辑区域结束 -->
<style type="text/css">
.imgtest{margin:-5px 5px;
overflow:hidden; float:left;
}
.list_ul figcaption p{
font-size:12px;
color:#aaa;
}
.imgtest figure div{
display:inline-block;
margin:5px auto;
width:40px;
height:40px;
border-radius:100px;
border:2px solid #fff;
overflow:hidden;
-webkit-box-shadow:0 0 3px #ccc;
box-shadow:0 0 3px #ccc;
}
.imgtest img{width:100%;
min-height:100%; text-align:center;}
</style>
</head>
<body>
<? php/*
	$id  = isset($_GET['id']) ? (int)$_GET['id'] : 0;
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

			$url = 'http://192.168.200.168/yoga/yogacircle/getPostDetail?type=2&postId='.$id.'&debug=1&reply=1';
			//echo $url;
			$data  = request_curl($url);
			//var_dump($data);
			if($data) {
				$result = json_decode($data, true);
				$result  = $result['result'] ? $result['result'] : '';
				if($result) {
					$userId  = (int)$result['userId'];
					$title = $result['title'] ? $result['title'] : '';
					$content = $result['content'] ? $result['content'] : '';
					$figure = $result['figure'] ? $result['figure'] : array();
					$replylist = $result['replyList']['list'] ? $result['replyList']['list'] : array();
				}
				else {
					echo '抱歉，您访问的页面不存在!';
					exit;
				}
			}
			else {
				echo '抱歉，您访问的页面不存在!';
				exit;
			}*/
		?>
			<!--------------------------------------------------------------html区域-------------------------------------------------------------------------------------->
			<div id="loadBox"><span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
			<!--html可编辑区域开始 -->
			<!-- InstanceBeginEditable name="html" -->
			<!--借助HTML5的新增标签，使得页面结构层次更加语义化 -->
			<div class="box hide">
				<section class="index">
				<!-- 用户头像、昵称、及其他信息 -->
					<div class="user">
						<div class="imgtest">
							<figure>
							<div>
								<a><img src="<?php echo $result['logo'];?>" /></a>
							</div>
							</figure>
						</div>
						<ul>
							<li>
								<b><?php echo $result['username'];?></b>
								<?php
									if($result['isVip'] ==1) {
										?>
											<span>
												<img src="images/index/pro2.png" style="margin-bottom:0.5%;width:2.0em;" />
											</span>
										<?php
									}
								?>
								<span>
									<img src="images/index/louzhu2.png" style="margin-bottom:0.5%;width:2.0em;" />
								</span>
							</li>
							<li><?php echo $result['createTime'];?></li>
						 </ul>
					</div>
					<div>
					<h3><?php echo $result['title'];?></h3>
					<p>
					<?php
						if($result['tag']==1) {
							?>
								<img src="images/index/jp.png"  style="margin-right:3.5%;" />
							<?php
						}
					?>
					<?php echo nl2br($result['content']);?></p>
					<?php
						if(count($result['figure'])>0) {
							foreach($result['figure'] as $value) {
								?>
									<p><img src="<?php echo $value['thumb'];?>" style="width:100%"></p>
								<?php
							}
						}
					?>
					<p class="f"><img src="images/index/like.png" style="width:1em;">&nbsp;&nbsp;<span><?php echo $result['liked'];?></span><img src="images/index/hf.png" style="width:1em;">&nbsp;&nbsp;<span><?php echo $result['reply'];?></span></p>
					</div>
				</section>
				<?php
					if(count($replylist)>0) {
						?>
							<section class="replys">
								<?php
									foreach($replylist as $key=>$value) {
										?>
											<div class="re">
												<div class="user">
												<div class="imgtest">
													<figure>
													<div style="width:35px;height:35px;">
														<a><img src="<?php echo $value['logo']?>" /></a>
													</div>
													</figure>
												</div>
													<ul>
														<li>
															<b><?php echo $value['username']?></b>
															<?php
																if($value['isVip']==1) {
																	?>
																		<span>
																			<img src="images/index/pro2.png" style="width:1.5em;" />
																		</span>
																	<?php
																}
															?>
															<?php
																if($value['userId'] == $userId) {
																	?>
																		<span>
																			<img src="images/index/louzhu2.png" style="width:1.8em;margin-bottom:0.5%;" />
																		</span>
																	<?php
																}
															?>

															<span style="float:right;margin-"><?php echo $key+1;?>楼</span>
														</li>
														<li><?php echo $value['createTime']?></li>
													 </ul>
												</div>
												<p>
													<?php
														echo $value['content'];
													?>
												</p>
											</div>
										<?php
									}
								?>
							</section>
						<?php
					}

				?>
				<section class="replys" style="height:80px;background:#f8f8f8;;border:0px solid #f8f8f8;">
				</section>
			</div>
			<header class="bar">
                <div class="header">
                    <a id="app_download_url" class="download-btn" href="#">App下载</a>
<!--                    <img src="images/index/logo-36x36.png">-->
                    <div class="logo"></div>
                    <span class="title"></span>
                    <span class="sub-title">让健康触手可及！</span>
                </div>
                <span class="hairline"></span>
			</header>
            <article>
                <section id="main_content">
                    <header>
                        <figure class="user">
                            <img class="avatar" src="<?php //echo $result['logo'];?>" />
                            <figurecaption>
                            	<p>
                            		<spna>纸笔画素颜<?php //echo $result['username'];?></spna>
	                                <?php// if($result['isVip'] == 1) { ?>
	                                    <span class="vip-icon"></span>
	                                <?php// } ?>
	                                <span class="author-label">楼主</span>
	                            </p>
	                            <p>
	                            	<span>6-10<?php //echo $result['createTime'];?></span>
	                            </p>
                            </figurecaption>
                        </figure>
                    </header>
                    <section class="content">
						<h1>眼部瑜伽按摩手法 解除疲劳放松眼睛<?php //echo $result['title'];?></h1>

						<?php //if($result['tag']==1) { ?>
						<img src="images/index/jp.png"  style="margin-right:3.5%;" />
						<?php //}	?>

						<p>
							<?php //echo nl2br($result['content']);?>
							我们都在繁忙劳累中穿梭，工作压抑、疲劳不堪
							的时候，想找一种健康的方式去宣泄，去放松，
							去休憩。下面的眼部瑜伽按摩手法练习将帮助您
							迅速有效的放松身体和精神的紧张，平复局促安
							的情绪。做这些练习时，要像做身体练习时一样，
							保持小心、细致。最重要的是把动作，呼吸和意
							念集中结合成一个统一体。
						</p>

					<?php// if(count($result['figure'])>0) {
						foreach($result['figure'] as $value) { ?>
							<p><img src="<?php //echo $value['thumb'];?>" style="width:100%"></p>
					<?php// }	} ?>
                    </section>
                    <footer>
						<img src="images/index/like.png" style="width:1em;">&nbsp;&nbsp;
						<span>2048<?php //echo $result['liked'];?></span>
						<img src="images/index/hf.png" style="width:1em;">&nbsp;&nbsp;
						<span>6789<?php //echo $result['reply'];?></span>
                    </footer>
                </section>
                <span class="hairline"></span>
            </article>
			<!-- InstanceEndEditable -->
			<!--html可编辑区域结束 -->
			<div id="alertBox"><p class="text"></p><p class="btn"><a class="close">确认</a></p></div>
			<div id="turnBox"><span></span></div>
		<?php/*
	}
	else {
		echo '抱歉，您访问的页面不存在!';
		exit;
	}*/
?>



<!-- InstanceEndEditable -->
<!--javascript可编辑区域结束 -->
<!--PM提供的百度统计代码贴在这里-->
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
		$('#app_download_url').attr('href', 'http://192.168.200.168/yoga/index/appurl?type=1&debug=1');
	}
	else {
		$('#app_download_url').attr('href', 'http://192.168.200.168/yoga/index/appurl?type=0&debug=1');
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
</body>
<!-- InstanceEnd --></html>
