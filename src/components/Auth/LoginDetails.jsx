import axios from 'axios';


const LoginDetails = (props) => {

    const onSubmitUser = (e) => {
        e.preventDefault();
        const { value } = e.target[0];
        console.log(value)
        axios.get(
            'http://localhost:8082/api/v1/loan/authenticate/' + value
        )
            .then(r => props.onAuth({ username: value, secrets: value }))
            .catch(e => console.log('error', e));


    };



    return (
        <div className="backgroud">
            <form className="form-card" onSubmit={onSubmitUser}>
                <div className="form-title"> Welcome </div>
                <div className="form-subtitle">Set a username to get started</div>
                <div className="auth">
                    <div className="auth-label">Username</div>
                    <input className="auth-input" name="username" />
                    <button className="auth-button" type="submit">
                        Enter
                    </button>
                </div>
            </form>
        </div>
    );
};
export default LoginDetails;