
import { Tag, Space } from 'antd';

export const blogColumns = [
  {
    title: '标题',
    dataIndex: 'b_title',
    key: 'b_title',
  },
  {
    title: '分类',
    dataIndex: 'bt_name',
    key: 'bt_name',
  },
  {
    title: '阅读量',
    dataIndex: 'b_views',
    key: 'b_views',
  },
  {
    title: '点赞量',
    dataIndex: 'b_likecount',
    key: 'b_likecount',
  },
  {
    title: '作者',
    dataIndex: 'bu_username',
    key: 'bu_username',
  },
  {
    title: '创作时间',
    dataIndex: 'b_createdate',
    key: 'b_createdate',
  },
  {
    title: '发布状态',
    key: 'b_delflag',
    dataIndex: 'b_delflag',
    render: bDelflag => (
      <Tag color={bDelflag ? 'geekblue' : 'green'}>
        {bDelflag ? '已发布' : '未发布'}
      </Tag>
    )
  },
];
