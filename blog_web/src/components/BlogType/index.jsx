
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blogPageSize } from '../../utils/config';
import action from '../../redux/actions';
import './index.css'


export default function BlogType(props) {

  const { blogType, blogTypeId } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.blog.getBlogType());
  }, [])

  const getTypeBlog = (index) => {
    return () => {
      dispatch(action.blog.clearBlogList());
      dispatch(action.blog.blogChange({key:'blogTypeId', value: index}))
      let getBlogListParam = `filter=b_type=${index}&pagination=1,${blogPageSize}`;
      dispatch(action.blog.getBlogList(getBlogListParam));
    }
  }

  return (
    <>
      <div className='type'>
        <div className='type-title'>
          文章分类
        </div>
        <div className='type-list'>
          <ul>
            {blogType &&
              blogType.map((item) => (
                <li key={item.id} className={item.id == blogTypeId ? 'selected' : ''} onClick={getTypeBlog(item.id)}>
                  <span>{item.bt_name}</span>
                  <span>{item.bt_blogcount}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
