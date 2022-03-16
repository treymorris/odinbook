import { useState } from 'react';


function SignupForm() {

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        

        fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                email: email
            }),
        })
            .then(response => response.json())//catch token here and save to local storage
            .then(data => {
                console.log(data)
                localStorage.setItem('user', data.token)
                window.location.href = '/'
            })
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <div className='container mt-5'>
            <h1 className='text-light text-center'>Welcome To OdinBook!</h1>
            <h3 className="text-light text-center mt-5" >Sign Up!</h3>
            <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <div className="mb-3 w-50 mx-auto">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="form-control form-control-sm"
                            id="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="form-control form-control-sm"
                            id="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control form-control-sm"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <input
                            type="username"
                            placeholder="Username"
                            className="form-control form-control-sm"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 w-50 mx-auto">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control form-control-sm"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit} >
                        Submit
                    </button>
                </div>
            </form>  
        </div>
    );
}

export default SignupForm;