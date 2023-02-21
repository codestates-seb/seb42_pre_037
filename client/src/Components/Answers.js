import AnswersImg from '../icons/AnswersImg.png';


function Answers() {
  return ( <>

        <div className="AskHeader w-screen h-32 relative">
            <span className="text-2xl font-semibold absolute top-10 left-64">Ask a public question</span>
            <img className="h-25 max-w-md right-64 top-4 absolute" src={AnswersImg} alt="askPageImg" />
        </div>
        <div className="AskSubForm max-w-2xl h-screen ml-64">
            <div className=" bg-sky-50 max-w-2xl h-52 rounded-sm border-sky-200 border">
                <div className="ml-4 absolute top-36">Writing a good question</div> 
                    <div className="text-xs ml-4 absolute top-44" >You’re ready to <span className="text-blue-500">ask</span> a <span className="text-blue-500">programming-related question</span> and this form will help guide you through the process. <br/>
                    Looking to ask a non-programming question? See <span className="text-blue-500">the topics here</span> to find a relevant site.</div><br/>
                <span className="text-xs font-medium ml-4 absolute top-52 mt-1">Steps</span><br/>
                    <ul className="list-disc text-xs font-light ml-11 mt-14">
                        <li>Summarize your problem in a one-line title.</li>
                        <li>Describe your problem in more detail.</li>
                        <li>Describe what you tried and what you expected to happen.</li>
                        <li>Add “tags” which help surface your question to members of the community.</li>
                        <li>Review your question and post it to the site.</li>
                    </ul>
            </div>
            <div className="bg-white max-w-2xl h-24 mt-3 rounded-sm border">
                <div className='ml-5 mt-5 text-xs font-medium'>Title</div>
                <div className='text-xs font-light ml-5' required size='100' >Be specific and imagine you’re asking a question to another person.</div>
                <input className='w-auto rounded-sm text-xs border h-6 ml-5 mt-1' 
                type='text' placeholder="e.g.Is there an R function for finding the index of an element in a vector?"/>
            </div>
            <div className="bg-white max-w-2xl h-72 mt-3 rounded-sm border">
                <div className='ml-5 mt-5 text-xs font-medium'>What are the details of your problem?</div>
                <div className='text-xs font-light ml-5'>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
                {/* <MyComponent/> */}
            </div>
            <div className="bg-white max-w-2xl h-72 mt-3 rounded-sm border">
                <div className='ml-5 mt-5 text-xs font-medium'>What did you try and what were you expecting?</div>
                <div className='text-xs font-light ml-5'>Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.</div>
                <input className='w-96 rounded-sm text-xs border h-6 ml-5 mt-1' />
            </div>
            <div className="bg-white max-w-2xl h-36 mt-3 rounded-sm border">
                <div className='ml-5 mt-5 text-xs font-medium'>Review questions already on Stack Overflow to see if your question is a duplicate.</div>
                <div className='text-xs font-light ml-5'>Clicking on these questions will open them in a new tab for you to review. Your progress here will be saved so you can come back and continue.</div>
                <input className='max-w-md rounded-sm text-xs border h-6 ml-5 mt-1' />
             

            </div>
            
        </div>
    </>)
}

export default Answers;