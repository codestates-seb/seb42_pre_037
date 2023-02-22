import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

function TextEditor({ body, setBody }) {
  const handleChange = value => {
    setBody(value);
  };

  return (
    <ReactQuill
      onChange={handleChange}
      value={body}
      theme="snow"
      modules={modules}
    />
  );
}

export default TextEditor;
