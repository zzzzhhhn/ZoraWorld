<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/17
 * Time: 18:15
 */
function echoJSON($withStatus, $andData, $andMessage = ''){
    $data = array('code' => $withStatus, 'data' => $andData, 'msg' => $andMessage);
    $jsonstring = json_encode($data);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    echo $jsonstring;
}

function returnResult($code, $sql) {
    $result = find($sql);
    if(count($result) === 1) {
        $result = $result[0];
    }
    echoJSON($code, $result);
}

//作者：Linsw
//链接：https://www.jianshu.com/p/423246ba8ebc
//來源：简书
//著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

$posts = json_decode(file_get_contents('php://input', true), true);
if(@$posts['menu']) {
    $sql = 'select * from menu';
    returnResult(0, $sql);
}else if(@$posts['novels']) {
    $sql = "select * from book WHERE `mId` = ". $posts['novels'];
    returnResult(0, $sql);
}

/**
 * @param $sql
 */
function find($sql)
{
    include_once('./mysql/MysqliHelper.php');
    $mysql = new MysqliHelper();
    $result = $mysql->Execute($sql);
    return $result;
}