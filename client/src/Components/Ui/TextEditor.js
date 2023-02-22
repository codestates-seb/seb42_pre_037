import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

function TextEditor() {
 
  const [text, setTest] = useState("")

  const handleChange = (value)=> {
    setTest(value.replace(/<(\/)?[Pp](\/)?>/g,""));
    console.log(text)

  }

  return <ReactQuill onChange={handleChange} value={text} theme="snow" modules={modules} />;
}

export default TextEditor;
