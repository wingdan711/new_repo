import React from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSigninStart, emailSigninStart} from '../../redux/user/user.actions'

import { connect } from 'react-redux';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        const {emailSigninStart} = this.props;

        emailSigninStart(email, password);
    }

    handleChange = event => {
        const {value, name } = event.target;

        this.setState({
            [name]: value
        })
    }

    render() {
        const { googleSignInStart } = this.props;

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and passwords</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        handleChange={this.handleChange} 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        label="Email"
                        required 
                    />
                    <FormInput 
                        handleChange={this.handleChange} 
                        name="password" 
                        type="password" 
                        label="Password"
                        value={this.state.password} 
                        required 
                    />
                    <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                            Sign in with Google
                    </CustomButton>

                    </div>
                    
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSigninStart()),
    emailSigninStart: (email, password) => dispatch(emailSigninStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);