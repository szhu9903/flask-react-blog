import React from 'react'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../../api'


export default function MyMarkdown(props) {

  // markdown解析器
  const renderMarkdown = (text) => {
    return (<ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />);
  }

  // 上传图片
  const onImageUpload = (file) => {
    let formData = new FormData();
    formData.append('file', file);
    return api.sys.uploadImg(formData);
  }

  return (
    <>
      <MdEditor 
        style={{ height: '400px' }} 
        value={props.value} 
        renderHTML={renderMarkdown} 
        onChange={({text}) => props.onChange(text)}
        onImageUpload={onImageUpload}
      />
    </>
  )
}
