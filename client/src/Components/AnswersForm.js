import TextEditor from './Ui/TextEditor';
import Button from './Ui/Button';

function AnswersForm() {
  const handlerSubmit = e => {
    e.preventDefault();
  };
  return (
    <form>
      <h1 className="text-3xl w-4/5 my-7">Your Answer</h1>
      <div className="mb-10">
        <TextEditor />
      </div>
      <Button onClick={handlerSubmit}>Post Your Answer</Button>
    </form>
  );
}

export default AnswersForm;
