import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'


const Login = () => {
   const [loading, setloading] = useState(false);
   const navigate=useNavigate();
     //from submit
     const submitHandler = async(values)=>{
      try {
         setloading(true);
        const {data}=await axios.post('/users/login',values)
        message.success('Login Successfully')
        localStorage.setItem('user', JSON.stringify({...data.user,password:''}));
        navigate('/')
         setloading(false);
      } catch (error) {
         setloading(false);
         message.error('Something went wrong')
      }
 }
 //prevent for login users
  useEffect(() => {
    if(localStorage.getItem('user'))
    {
      navigate('/');
    }
  
   
  }, [navigate]);
  
  return (
    <>
       
      <div className="login-page">
        {loading && <Spinner/> }
         <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login Form</h1>
          
             <Form.Item label="Email" name="email">
                <Input type="email"/>
             </Form.Item>
             <Form.Item label="Password" name="password">
                <Input type="password"/>
             </Form.Item>
             <div className="d-flex justify-content-between">
                <Link to='/register'>Not a user? Click here to register</Link>
                <button className='btn btn-primary'>Login</button>
             </div>
         </Form>
      
      </div>
    </>
  )
}

export default Login
