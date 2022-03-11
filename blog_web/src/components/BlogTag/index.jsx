import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tag } from 'antd'
import actions from '../../redux/actions'
import { getColorArr } from '../../utils/config'
import './index.css'


export default function BlogTag() {

  const { blogTag } = useSelector(state => state.sys)
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogTag.length === 0){
      dispatch(actions.sys.getBlogTag());
    }
  }, [])

  return (
    <>
      <div className='tag'>
        <div className='tag-title'>
          标签
        </div>
        { 
          blogTag.length > 0 && blogTag.map((tag) => (<Tag key={tag.id} color={getColorArr()}>{tag.bt_tagname}</Tag>)) 
        }
      </div>
    </>
  )
}
