<?php
header("Content-type: text/json; charset=utf-8");  
//非json格式，用dataType返回json格式会报错,要用json_encode解码
//定义文章数组
$articles = array(
	"三级菜单111"=> array(
		"三级菜单111文章1"=>"三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情",
		"三级菜单111文章2"=>"三级菜单111文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单111文章2"=>"三级菜单111文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单111文章3"=>"三级菜单111文章3三级菜单111文章3三级菜单111文章3三级菜单111文章3",
		"三级菜单111文章4"=>"三级菜单111文章4三级菜单111文章4三级菜单111文章4三级菜单111文章4",
		"三级菜单111文章5"=>"三级菜单111文章5三级菜单111文章5三级菜单111文章5三级菜单111文章5",
		"三级菜单111文章6"=>"三级菜单111文章6三级菜单111文章6三级菜单111文章6",
		"三级菜单111文章7"=>"三级菜单111文章7三级菜单111文章7三级菜单111文章7",
		"三级菜单111文章8"=>"三级菜单111文章8三级菜单111文章8三级菜单111文章8三级菜单111文章8",
		"三级菜单111文章9"=>"三级菜单111文章9三级菜单111文章9三级菜单111文章9三级菜单111文章9",
		"三级菜单111文章10"=>"三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10",
		"三级菜单111文章11"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章12三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章12"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章12三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章13"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章14"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章15"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章16"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章17"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章18"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章19"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章20"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单111文章21"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11"
	), 
	"三级菜单112"=> array(
		"三级菜单112文章1"=>"三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情",
		"三级菜单112文章2"=>"三级菜单111文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单112文章2"=>"三级菜单111文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单112文章3"=>"三级菜单111文章3三级菜单111文章3三级菜单111文章3三级菜单111文章3",
		"三级菜单112文章4"=>"三级菜单111文章4三级菜单111文章4三级菜单111文章4三级菜单111文章4",
		"三级菜单112文章5"=>"三级菜单111文章5三级菜单111文章5三级菜单111文章5三级菜单111文章5",
		"三级菜单112文章6"=>"三级菜单111文章6三级菜单111文章6三级菜单111文章6",
		"三级菜单112文章7"=>"三级菜单111文章7三级菜单111文章7三级菜单111文章7",
		"三级菜单112文章8"=>"三级菜单111文章8三级菜单111文章8三级菜单111文章8三级菜单111文章8",
		"三级菜单112文章9"=>"三级菜单111文章9三级菜单111文章9三级菜单111文章9三级菜单111文章9",
		"三级菜单112文章10"=>"三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10",
		"三级菜单112文章11"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章12三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章12"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章12三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章13"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章14"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章15"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章16"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章17"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章18"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章19"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章20"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11",
		"三级菜单112文章21"=>"三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11三级菜单111文章11"
	),
	"三级菜单113"=> array(
		"三级菜单113文章1"=>"三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情",
		"三级菜单113文章2"=>"三级菜单113文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单114文章2"=>"三级菜单113文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单113文章3"=>"三级菜单111文章3三级菜单111文章3三级菜单111文章3三级菜单111文章3"
	),
	"三级菜单211" => array(
		"三级菜单221文章1"=>"三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情三级菜单111文章1详情",
		"三级菜单221文章2"=>"三级菜单111文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单221文章2"=>"三级菜单111文章2三级菜单111文章2三级菜单111文章2三级菜单111文章2",
		"三级菜单221文章3"=>"三级菜单111文章3三级菜单111文章3三级菜单111文章3三级菜单111文章3",
		"三级菜单221文章4"=>"三级菜单111文章4三级菜单111文章4三级菜单111文章4三级菜单111文章4",
		"三级菜单221文章5"=>"三级菜单111文章5三级菜单111文章5三级菜单111文章5三级菜单111文章5",
		"三级菜单221文章6"=>"三级菜单111文章6三级菜单111文章6三级菜单111文章6",
		"三级菜单221文章7"=>"三级菜单111文章7三级菜单111文章7三级菜单111文章7",
		"三级菜单221文章8"=>"三级菜单111文章8三级菜单111文章8三级菜单111文章8三级菜单111文章8",
		"三级菜单221文章9"=>"三级菜单111文章9三级菜单111文章9三级菜单111文章9三级菜单111文章9",
		"三级菜单221文章10"=>"11文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10三级菜单111文章10"
	)
);

// 根据菜单和页数获取数据
$menuItem=$_GET['menuItem'];
$page=$_GET['page'];
// $page=20;
$perNum=10;
$itemDes=$_GET['itemDes'];

$num=count($articles[$menuItem]);
if($page<=1){
	$page=1;
}else if($page>=ceil($num/$perNum)) {
	$page=ceil($num/$perNum);
}
if(is_array($articles[$menuItem])&& $itemDes==""){
	// echo ($page-1)*$perNum;
	echo json_encode(array_slice($articles[$menuItem],($page-1)*$perNum,$perNum, true));
}
if($itemDes){
	echo $articles[$menuItem][$itemDes];
}
// echo var_dump(array_slice($articles["三级菜单111"],10,10, true));
/*	}
}
*/

?>