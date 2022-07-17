import React,{useEffect, useState} from 'react';

import { Formik, useFormik } from 'formik';

import * as Yup from 'yup';

import {TextField , Button } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import { registerUser } from '../../store/actions/user_actions';


const Auth = (props) => {
    
    const [register,setRegister] = useState(false);
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{email: '', password: ''},
        validationSchema:Yup.object({
            email: Yup.string().required('sorry the email is requiredl').email('this is not a valid email'),
            password: Yup.string().required('sorry the password is requiredl')
        }),
        onSubmit: (values,{resetForm})=> {
            handlesubmit(values)
            console.log(values)
        
        }
    })

    const handlesubmit = (values) => {
        if(register) {
            dispatch(registerUser(values));

        }else{

        }
    }

    const errorHelper = (formik , values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    })

    useEffect(() => {
        if(notifications && notifications.success){
            props.history.push('/dashboard');
        }
    },[notifications])

    return (
        <>
            <div className='auth_container'>
                    <h1>Authenticate</h1>
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField 
                            style={{ width: '100%'}}
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            error={formik.errors.email && formik.touched.email ? true : false}
                            helperText="error msg"
                            {...errorHelper(formik,'email')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField 
                            style={{ width: '100%'}}
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant="outlined"
                            {...formik.getFieldProps('password')}
                            error={formik.errors.password && formik.touched.password ? true : false}
                            helperText="error msg"
                            {...errorHelper(formik,'password')}
                            
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit" size="large">
                            {register ? 'Register' : 'Login'}
                        </Button>

                        <Button className="mt-3" variant="outlined" color="secondary" type="submit" size="small" onClick={() => setRegister(!register)}>
                            Want To {!register ? 'Register' :'Login' } ? 
                        </Button>
                    </form>
            </div>
        
        </>
    )
}

export default Auth;