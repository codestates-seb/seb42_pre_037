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

function TextEditor({ content, setContent }) {
  const handleChange = value => {
    setContent(value);
  };

  return (
    <div className="h-52">
      <ReactQuill
        className="h-40"
        onChange={handleChange}
        value={content}
        theme="snow"
        modules={modules}
      />
    </div>
  );
}

export default TextEditor;
