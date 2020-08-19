CREATE TABLE `project` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `projectName` varchar(255) NOT NULL COMMENT '项目名',
  `gitUrl` varchar(255) NOT NULL COMMENT 'Git 地址',
  `branch` varchar(255) NOT NULL COMMENT '分支名',
  `secret` varchar(255) NOT NULL COMMENT '部署密钥',
  `projectEnv` varchar(1000) DEFAULT NULL COMMENT '环境变量 (JSON 格式)',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
