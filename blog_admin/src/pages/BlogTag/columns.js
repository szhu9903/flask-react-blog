
import { Tag, Space, Button } from 'antd';

export const blogTagColumns = (updateBlogTag, deleteBlogTag) => [
  {
    title: '分类名称',
    dataIndex: 'bt_tagname',
    key: 'bt_tagname',
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button size="small" type="primary" onClick={updateBlogTag(record)} ghost>修改</Button>
        <Button size="small" type="primary" onClick={deleteBlogTag(record)} danger ghost>删除</Button>
      </Space>
    ),
  },
];
