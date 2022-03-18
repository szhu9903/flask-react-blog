import React from 'react'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';


export default function MyMarkdown(props) {

  // markdown解析器
  const renderMarkdown = (text) => {
    return (<ReactMarkdown children={text}/>);
  }

  return (
    <>
      <MdEditor 
        style={{ height: '400px' }} 
        value={props.value} 
        renderHTML={renderMarkdown} 
        onChange={({text}) => props.onChange(text)}
      />
    </>
  )
}
