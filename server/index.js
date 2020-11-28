// 加载Express模块
const express = require('express');
// 加载CORS模块
const cors = require('cors');
const bodyParser=require('body-parser');
// 加载MySQL模块
const mysql = require('mysql');

// 创建MySQL连接池
const pool = mysql.createPool({
  // 数据库服务器的地址
  host:'127.0.0.1',
  // 数据库服务器的端口号
  port:3306,
  // 数据库用户的用户名
  user:'root',
  // 数据库用户的密码
  password:'',
  // 数据库名称
  database:'xzqa',
  // 编码方式
  charset:'utf8',
  // 最大连接数
  connectionLimit:20
});

// 创建WEB服务器实例
const server = express();

// 将CORS作为Server的中间件
server.use(cors({
  origin:['http://localhost:8080','http://127.0.0.1:8080']
}));
//将body-server作为Server的中间件
//将bodyParser作为Server的中间件
server.use(bodyParser.urlencoded({
  extended:false
}));


//获取所有文章分类信息的接口
server.get('/category',(req,res)=>{
  //获取文章分类表中的全部数据
  let sql = 'SELECT id,category_name FROM xzqa_category';
  //通过连接池的query()方法来执行SQL语句node
  pool.query(sql,(error,results)=>{      
      if(error) throw error;
      res.send({message:'查询成功',code:1,results:results});
  });  
});

// 获取指定分类下包含的文章数据
server.get('/articles',(req,res)=>{
  // 获取地址栏的cid参数,该参数表示的分类的ID
  let cid = req.query.cid;
  // 获取地址栏中的page参数,该参数表示页码
  let page = parseInt(req.query.page);
  //存储分页显示的记录数量
  let pagesize = 10;
  let pagecount;
  ///////////////////////////////////////
  let sql = "SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?";
  pool.query(sql,[cid],(error,results)=>{
    if(error) throw error;
    //获取总记录数
    let rowcount = results[0].count;
    //计算总页数,标准的公式 Math.ceil(总记录数/每页显示的条数)
     pagecount = Math.ceil(rowcount / pagesize);
     let offset = (page-1) * pagesize;
     // 以当前的cid为条件进行文章的查找操作
     sql = 'SELECT id,subject,description,image FROM xzqa_article  WHERE category_id=? LIMIT ?,?';
     // 执行SQL查询
     pool.query(sql,[cid,offset,pagesize],(error,results)=>{
       if(error) throw error;
       res.send({message:'查询成功',code:1,results:results,pagecount:pagecount});
     });


    console.log('总记录数有:' + results[0].count + '条' );
    console.log('总页数有' + pagecount + '页');
  });
  ///////////////////////////////////////








  // 根据page参数值并结合SELECT...LIMIT子句的标准计算公式来计算offset参数值
  
});


//获取文章详细信息
server.get('/details',(req,res)=>{
  //获取URL地址栏参数
  let id=req.query.id;
  //SQL查询
  let sql='SELECT r.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_article AS r INNER JOIN xzqa_author AS u ON author_id=u.id WHERE r.id=?'
  //执行SQL查询
  pool.query(sql,[id],(error,results)=>{
    if(error) throw error;
    //results代表的返回结果集，为数组类型；同时在该数组中包含了一个对象，该对象九十文章的详细信息，在使用时，无需返回数组可直接返回对象所以results[0]代表的就是文章详细信息的对象
    //resules此时的结果如[{id:1,subject:'AA',nickname:'淘气的松鼠'}]
    res.send({message:'查询成功',code:1,articleInfo:results[0]})
  })
})
server.post('/register',(req,res)=>{
  let username=req.body.username;
  let password=req.body.password;
  console.log(username,password);
  let sql='SELECT COUNT(id) AS count FROM xzqa_author WHERE username=?';
  pool.query(sql,[username,password],(error,results)=>{
    if(error) throw error;
    if(results[0].count==0){
      sql='INSERT INTO xzqa_author(username,password) VALUES(?,MD5(?))';
      pool.query(sql,[username,password],(error,results)=>{
        if(error) throw error;
        res.send({message:'注册成功',code:1});
      })
    }else{
      res.send({message:'用户已存在',code:0});
    }
  })
})
//用户登录的接口
server.post('/login',(req,res)=>{
  let username=req.body.username;
  let password=req.body.password;
  let sql='SELECT id,username,avatar,article_number,nickname FROM xzqa_author WHERE username=? AND password=MD5(?)';
  pool.query(sql,[username,password],(error,results)=>{
    if(error) throw error;
    if(results.length==0){
      res.send({message:'登录失败',code:0});

    }else{
      res.send({message:'登录成功',code:1,userInfo:results[0]});
    }
  })
})
server.get('/data',(req,res)=>{
  let object={
    productName:'夏普超大屏',
    salePrice:900000
  };
  res.send({message:'查询成功',code:1,results:object});
})
// 指定WEB服务器监听的端口
server.listen(3000);

