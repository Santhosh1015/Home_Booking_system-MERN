import React, { useState } from 'react';
import axios from 'axios';

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

const Registerscreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [Cpassword, setCpass] = useState('')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success , setSuccess] = useState(false);
    const [successMessage , setSuccessMessage] = useState('');

    async function register() {
        if (password == Cpassword) {
            const user = {
                name,
                email,
                password,
                Cpassword
            }
            try{
                setLoading(true);
                const result = (await axios.post('http://localhost:5555/api/users/register' , user)).data;
                setLoading(false)
                setSuccess(true);
                setSuccessMessage('Registration Successful');


                setName('');
                setEmail('');
                setPass('');
                setCpass('');

            }catch(error){
                
                console.log(error);
                setLoading(false);
                setError(true);
            }
        } else {
            alert('password mismatch');
        }

    }

    return (
        <div>
            {loading && <Loader/>}
            {error && <Error/>}
            
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                {success && <Success message ={successMessage} />};
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type="text" className='form-control' placeholder='Name'
                            value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input type="text" className='form-control' placeholder='Email'
                            value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="text" className='form-control' placeholder='Password'
                            value={password} onChange={(e) => { setPass(e.target.value) }} />
                        <input type="text" className='form-control' placeholder='Confirm Password'
                            value={Cpassword} onChange={(e) => { setCpass(e.target.value) }} />
                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Registerscreen
