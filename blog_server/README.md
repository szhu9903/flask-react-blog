## flask api 说明

### 前置环境
1. Mysql5.6 以上数据库准备
2. Python3.6 或使用docker构建环境,使用本地python环境运行需要先安装requirements.txt 中的依赖
3. 安装redis

### 项目结构说明
.    
├── .env  环境选择配置  
├── Dockerfile  docker环境构建  
├── README.md   项目描述    
├── app  
│   ├── __init__.py  初试创建应用的主文件    
│   ├── api  接口文件夹  
│   │   ├── __init__.py  蓝图定义及中间件    
│   │   ├── blog_controller.py  文章接口  
│   │   ├── comm_controller.py  评论系统接口  
│   │   ├── sys_controller.py   系统接口    
│   │   └── user_controller.py  用户接口  
│   ├── extensions.py   第三方依赖初始化  
│   ├── helper    辅助  
│   │   ├── db_helper.py  数据库语句执行  
│   │   ├── general_helper.py  接口辅助函数  
│   │   ├── redis_helper.py   redis语句执行  
│   │   └── sql_helper.py  数据库初试常用ORM及数据库语句生成  
│   ├── templates  页面文件  
│   │   └── viewport.html  中转github用户信息  
│   ├── unit_config.py 接口配置项  
│   └── utils  通用工具  
│       ├── auth_utils.py  用户信息验证  
│       ├── res_utils.py   返回数据格式化  
│       └── user_utils.py  用户登录信息类  
├── config.py   项目配置  
├── db  数据库文件  
│   ├── myblog.sql  数据库表    
│   ├── triggers.sql  触发器  
│   └── views.sql  视图  
├── docker-compose.yml  容器管理，也可扩展该文件中配置数据库、redis服务等  
├── gunicorn.config.py  gunicorn启动配置    
├── requirements.txt  依赖环境  
├── server.py  启动入口  
└── static  静态文件  
    └── blog  文章图标 也可修改配置文件中的地址将文件上传到单独的文件服务器  
        └── 20210723  自动创建目录

### 运行项目
1. 确保前置环境已经准备完成
2. 到自己的数据库创建一个新的数据库，按照db目录下的语句创建表、视图和触发器
3. 修改./config.py中mysql、redis连接配置，修改GitHub登录需要的Client信息
4. 如果使用本地启动则配置根目录下.env文件的环境参数，或者使用docker启动去配置docker-compose.yml中的环境变量。
5. 本地直接运行server.py文件`python server.py`即可，使用docker-compose执行`docker-compose up`

### 部分开发笔记
* 首页点击量接口同步  
> 思路：点击量每次更新到redis数据库，当累计点击量达增加10次，将数据持久化到mysql  
1.获取点击量  
查询redis中是否存在点击量数据  
不存在去mysql中获取，同时将数据同步到redis中  
2.更新点击量  
点击量增加，增加redis中点击量数据  
redis中点击量对10进行取余，如果等于0持久化点击量到mysql数据库  

* 评论树形结构数据
> 思路：获取所有文章下评论数据，分级格式为树形json  
1.获取数据  
	查询数据库数据，文章下所有数据  
	将文章下所有评论数据的base节点单独提取，作为要返回json数据的根节点  
	拿根节点和所有数据，生成根节点下所有子级数据  
2.子节点获取格式化  
	查询节点有无子级数据，无数据返回返回None   
	遍历所有节点，查询子节点  
	递归子节点，在上一步查询为  

* 记录文章阅读量  
> 思路：用户第一次点击文章，增加文章阅读量，  
1.更新文章点击量  
用户获取文章，更新文章阅读量，  
将用户IP记录到redis中，失效为一小时  
2.用户第二次点击文章  
去redis中查询用户是否一小时内已经点击过文章  
如果存在则不在进行文章阅读量更新  


