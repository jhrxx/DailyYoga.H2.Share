<?php
/*
 * Created on 2015��4��2��
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 //http://115.29.187.128/yogacn/test.php?type=0
phpinfo();
echo time();exit;
 $type  = $_GET['type'] ? $_GET['type'] : 0;
 if($type ==1) {
 	$url = 'https://itunes.apple.com/cn/app/mei-ri-yu-jia-hu-nin-jian/id540679302?mt=8';
 }
 else {
 	$url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.dailyyoga.cn';
 }
 echo "<script>top.location.href='".$url."';</script>";
 exit;
 ?>
 <script language="JavaScript">
if (window != top) {
	top.location.href = <?php echo $url;?>;
}
else {
	<?php
		echo "<script>top.location.href='".$url."';</script>";
	?>
}
</script>
 <?php
 //echo $url;exit;
 //echo '<script>window.open("'.$url.'", "_blank")</script>';
 //echo '<script>window.open("'.$url.'", "_blank")</script>';
 //top.location.href =
 exit;
?>
