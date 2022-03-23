import { useState } from 'react';


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        

        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
            .then(response => response.json())//catch token here and save to local storage
            .then(data => {
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('userid', data.userid)
                //add if statement checking that login is validated
                window.location.href = '/UserHome'
            })
            .catch(error => {
                console.log(error)
            });
    };
    
    const handleNewAccount = () => {
        window.location.href = '/signup'
    }

    const handleFacebook = () => {
        
    }

    const handleGoogle = () => {
        
    }

    return (
        <div className='container'>
            <h1 className="text-light text-center mt-5 mb-5">OdinBook</h1>
            <form onSubmit={handleSubmit}>
                <div >
                     <div className="mb-3 w-50 mx-auto">
                        <input
                            placeholder='Username'
                            type="username"
                            className="form-control form-control-sm"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <input
                            placeholder='Password'
                            type="password"
                            className="form-control form-control-sm"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
               </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleSubmit}
                        >Log In
                        </button>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleNewAccount}
                        >Create New Account
                        </button>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleFacebook}
                        >Log In with Facebook
                        </button>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleGoogle}
                        >Log In with Google
                        </button>
                  </div>
            </form>
        </div>
     );
}

export default Login;