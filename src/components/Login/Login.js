import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import './Login.css';
import google from '../../images/icons/google.png'
import { useForm } from 'react-hook-form';
import Loading from '../Loading/Loading';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    let errorMessage;

    const navigate = useNavigate();
    const [
        signInWithGoogle,
        googleUser,
        googleLoading,
        googleError
    ] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || googleUser);
    if (token) {
        navigate(from, { replace: true });
    }

    if (loading || googleLoading) {
        return <Loading></Loading>
    }
    if (error || googleError) {
        errorMessage = <p style={{ 'color': 'red' }}>Error: {error?.message}{googleError?.message}</p>
    }
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signInWithEmailAndPassword(email, password);
    }
    const handleResetPassword = async () => {
        navigate('/resetpassword');
    }
    return (
        <div style={{ 'minHeight': '650px' }}>
            <h2 className='login-heading'>Login</h2>
            <form className='login-container' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="email"
                        placeholder="You email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Invalid email'
                            }
                        })}
                    />
                    <br />
                    <label>
                        {errors.email?.type === 'required' && <span style={{ 'color': 'red' }}>{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span style={{ 'color': 'red' }}>{errors.email.message}</span>}
                    </label>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Your password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is required'
                            },
                            minLength: {
                                value: 6,
                                message: 'Password must be 6 characters or more'
                            }
                        })}
                    />
                    <br />
                    <label>
                        {errors.password?.type === 'required' && <span style={{ 'color': 'red' }}>{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span style={{ 'color': 'red' }}>{errors.password.message}</span>}

                    </label>
                </div>

                <input className='submit-btn' type="submit" value='Login' />
            </form>
            {errorMessage}
            <p>New here? <Link to='/register'>Please register first</Link></p>

            <p>Forgot password? <span onClick={handleResetPassword} style={{ 'color': 'blue', 'cursor': 'pointer' }}>Reset now!</span></p>
            <h4>Or</h4>
            <br />
            <div className='google-signin-container' onClick={() => signInWithGoogle()}>
                <img style={{ 'width': '20px' }} src={google} alt="" />
                <span>Sign in with google</span>
            </div>
        </div>
    );
};

export default Login;