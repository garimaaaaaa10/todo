import React from 'react'
import "./Signup.css"
import HeadingComp from './HeadingComp';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';



const Signin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
   
    const [Inputs, setInputs] = useState({email:"", password:""})
    const change =(e) => {
        const {name,value} =e.target;
        setInputs({...Inputs,[name]:value});
    };
    const submit =async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${window.location.origin}/api/v1/signin`, Inputs).then((response) =>{
                console.log(response.data);
                if (!response.data.others){
                    alert(response.data.message);
                    return;
                }
                sessionStorage.setItem("id",response.data.others._id);
                dispatch(authActions.login());
                history("/todo")
            });
        } catch (error) {
            alert("Signin failed! " + (error.response?.data?.message || error.message));
        }
    }
        
  return (
    <div> <div className="signup">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 column col-left d-lgflex justify-content-center align-items-center d-none ">
                            <HeadingComp first="Sign" second="In"/>
                        </div>
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-3"><input className="p-2 my-3 input-signup"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={Inputs.email}
                            onChange ={change}
                        />
                          
                            <input className="p-2 my-3 input-signup"
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                value={Inputs.password}
                                onChange ={change}
                            />
                            <button className="btn-signup p-2 " onClick ={submit}>SignIn</button>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div></div>
  )
}

export default Signin