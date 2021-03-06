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

function returnResult($sql) {
    $result = find($sql);
    if(count($result) === 1) {
        echoJSON(0, $result[0]);
    }else if(count($result) === 0) {
        echoJSON(-1, '暂无数据');
    }else {
        echoJSON(0, $result);
    }

}

//作者：Linsw
//链接：https://www.jianshu.com/p/423246ba8ebc
//來源：简书
//著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。




$posts = json_decode(file_get_contents('php://input', true), true);
if (@$posts['menu']) {
    $sql = 'select * from menu';
    returnResult($sql);
}elseif(@$posts['novels']) {
    $sql1 = "select * from book WHERE `mId` = " . $posts['novels'];
    $result1 = find($sql1)[0];
    $sql2 = "select * from indexes WHERE `bNo` =" . $result1['bNo'];
    $result2 = find($sql2);
    $result1['indexes'] = $result2;
    echoJSON(0, $result1);
}elseif(@$posts['index']) {
    $sql = "select * from content WHERE `iNo` = " . $posts['index'];
    returnResult($sql);
}elseif(@$posts['signInData']) {
    $name = $posts['signInData']['userName'] ;
    $pwd = md5($posts['signInData']['passWord']) ;

    $sql1 = "select * from users WHERE  `Loginid` = '$name'";
    $result1 = find($sql1);

    if(count($result1) === 0) {
        echoJSON(-1, '账号不存在');
    }else {
        $pwdSql = strrev($result1[0]['Pwd']);
        if ($pwd === $pwdSql) {
            echoJSON(0, $result1[0]);
        } else {
            echoJSON(1, '错误');
        }
    }
}elseif(@$posts['signUpData']) {
    $name = $posts['signUpData']['userName'];
    $pwd = $posts['signUpData']['passWord'];

    $sql1 = "select count(*) from users WHERE  `Loginid` = '$name'";
    $result1 = find($sql1, 2);

    if ($result1[0][0] == 0) {
        $pwd = strrev(md5($pwd));
        $sql2 = "insert into users(Loginid, Pwd) VALUES('$name', '$pwd') ";
        $result2 = update($sql2);

    } else {
        echoJSON(1, '已被注册');
    }
}elseif(@$posts['menuData']) {
    $name = $posts['menuData']['mName'];
    $url = $posts['menuData']['mUrl'];
    $id = $posts['menuData']['mId'];
    $type = $posts['menuData']['mType'];
    if ($id !== 0) {
        $sql = "update menu set `mName` = '$name' ,`mUrl` = '$url '  WHERE `mId` = $id";
    }else {
        $sql = "insert into menu(mId, mName, mType, mUrl) VALUES (NULL, '$name', $type,'$url')";
    }
    update($sql);
}elseif(@$posts['menuId']) {
    $id = @$posts['menuId'];
    $sql = "delete from menu where `mId` = $id";
    update($sql);
}elseif (@$posts['bookId']) {
    $mId = @$posts['bookId'];
    $sql = "select * from book where `mId` = " . $mId;
    returnResult($sql);
}elseif (@$posts['novelInfo']) {
    $bNo = $posts['novelInfo']['bNo'];
    $Theme = $posts['novelInfo']['Theme'];
    $bDescribe = $posts['novelInfo']['bDescribe'];
    $bookImg = $posts['novelInfo']['bookImg'];
    $isEnd = $posts['novelInfo']['isEnd'];
    $mId = $posts['novelInfo']['mId'];
    if($bNo !== 0) {
        $sql = "update book set `Theme` = '$Theme', `bDescribe` = '$bDescribe', `bookImg` = '$bookImg', `isEnd` = '$isEnd' WHERE  `bNo` = $bNo";
    }else {
        $sql = "insert into book(bNo, Theme, bDescribe, bookImg, isEnd, mId) values(null, '$Theme', '$bDescribe', '$bookImg', '$isEnd', $mId)";
    }
    update($sql);
} elseif (@$posts['bNo']) {
    $bNo = @$posts['bNo'];
    $sql = "select * from indexes where `bNo` = " . $bNo;
    returnResult($sql);
}elseif (@$posts['indexData']) {
    $iNo = $posts['indexData']['iNo'];
    $iName = $posts['indexData']['iName'];
    $bNo = $posts['indexData']['bNo'];

    if($iNo !== 0) {
        $sql = "update indexes set `iName` = '$iName' WHERE  `iNo` = $iNo";
    }else {
        $sql = "insert into indexes(iNo, iName, bNo) values(null, '$iName', $bNo)";
    }
    update($sql);
} elseif(@$posts['indexId']) {
    $id = @$posts['indexId'];
    $sql = "delete from indexes where `iNo` = $id";
    update($sql);
}elseif (@$posts['iNo']) {
    $iNo = @$posts['iNo'];
    $sql = "select * from content where `iNo` = " . $iNo;
    returnResult($sql);
}elseif (@$posts['contentData']) {
    $cNo = $posts['contentData']['cNo'];
    $content = $posts['contentData']['content'];
    $iNo = $posts['contentData']['iNo'];

    if($cNo !== 0) {
        $sql = "update content set `content` = '$content' WHERE  `cNo` = $cNo";
    }else {
        $sql = "insert into content(cNo, content, iNo) values(null, '$content', $iNo)";
    }
    update($sql);
}
else {
    $file = @$_FILES['file'];//得到传输的数据
    $name = $file['name'];//文件名
    $ex = strtolower(substr($name,strrpos($name,'.'))); //扩展名
    $upload_path = "./uploads/"; //上传文件的存放路径
    $new_name = rand().rand().$ex;
//开始移动文件到相应的文件夹
    if(move_uploaded_file($file['tmp_name'],$upload_path.$new_name)){
        echoJSON( 0,$new_name);
    }else{
        echoJSON( -1,"failed!");
    }

}

/**
 * 查询数据
 * @param $sql
 * @param int $type
 * @return array|bool|mysqli_result
 */
function find($sql, $type = 1)
{
    include_once('./mysql/MysqliHelper.php');
    $mysql = new MysqliHelper();
    $result = $mysql->Execute($sql, $type);
    return $result;
}

/**
 * 修改数据
 * @param $sql
 * @param int $type
 */
function update($sql, $type = 1)
{
    include_once('./mysql/MysqliHelper.php');
    $mysql = new MysqliHelper();
    $result = $mysql->Execute($sql, $type);

    if ($result) {
        echoJSON(0, 'success');
    } else {
        echoJSON(-1, 'failed');
    };
}