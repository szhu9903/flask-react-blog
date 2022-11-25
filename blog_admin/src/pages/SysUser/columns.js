
import { Tag, Space, Button } from 'antd';

export const blogColumns = (updateUser, deleteUser) => [
  {
    title: '账号',
    dataIndex: 'bu_account',
    key: 'bu_account',
  },
  {
    title: '性别',
    dataIndex: 'bu_sex',
    key: 'bu_sex',
  },
  {
    title: '用户名',
    dataIndex: 'bu_username',
    key: 'bu_username',
  },
  {
    title: '头像地址',
    dataIndex: 'bu_userphoto',
    key: 'bu_userphoto',
  },
  {
    title: '电话',
    dataIndex: 'bu_phone',
    key: 'bu_phone',
  },
  {
    title: '邮箱',
    dataIndex: 'bu_email',
    key: 'bu_email',
  },
  {
    title: '允许后台',
    dataIndex: 'bu_isadmin',
    key: 'bu_isadmin',
    render: buisadmin => (
      <Tag color={buisadmin ? 'green' : 'red'}>
        {buisadmin ? '允许' : '禁止'}
      </Tag>
    )
  },
  {
    title: '注册时间',
    dataIndex: 'bu_createdate',
    key: 'bu_createdate',
  },
  {
    title: '有效状态',
    key: 'bu_delflag',
    dataIndex: 'bu_delflag',
    render: bDelflag => (
      <Tag color={bDelflag ? 'geekblue' : 'green'}>
        {bDelflag ? '无效' : '有效'}
      </Tag>
    )
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button size="small" type="primary" onClick={updateUser(record)} ghost>修改</Button>
        <Button size="small" type="primary" onClick={deleteUser(record)} danger ghost>删除</Button>
      </Space>
    ),
  },
];
