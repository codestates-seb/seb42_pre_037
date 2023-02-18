import iconStack from '../icons/icon_stack.png'

const Login = () => {
    const loginKey = 'a';

    return (
    <div className='flex flex-col bg-gray-400'>
        <div className=''>
            <img className='' src={iconStack} alt="icon_stack" />
        </div>
        <div>this is Login page {loginKey}</div>
        <div className='formContainer bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <form className='login-form'>
                <div className='email-set mb-4'>
                    <label className='email-label block text-left text-gray-700 text-sm font-bold mb-2' htmlFor='emailInput'>Email</label>
                    <div>
                        <input 
                            className='email-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='emailInput'
                            type='text'
                            required
                        />
                    </div>
                </div>
                <div className='password-set mb-6'>
                    <div className='password-label-set flex flex-row justify-between'>
                        <label className='password-label block text-left text-gray-700 text-sm font-bold mb-2' htmlFor='passwordInput'>Password</label>
                        <a className="inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800" href="https://www.naver.com">
                            Forgot Password?
                        </a>
                    </div>
                    <div>
                        <input 
                            className='password-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            id='passwordInput'
                            type='password'
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="login-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Log in
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default Login;
