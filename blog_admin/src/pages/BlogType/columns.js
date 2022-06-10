
import { Tag, Space, Button } from 'antd';

export const blogColumns = (updateBlog, deleteBlog) => [
  {
    title: '分类名称',
    dataIndex: 'bt_name',
    key: 'bt_name',
  },
  {
    title: '文章数量',
    dataIndex: 'bt_blogcount',
    key: 'bt_blogcount',
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button size="small" type="primary" onClick={updateBlog(record)} ghost>修改</Button>
        <Button size="small" type="primary" onClick={deleteBlog(record)} danger ghost>删除</Button>
      </Space>
    ),
  },
];
