import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function LoginRegister(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const submit = async (data) => {
        try {
            const req = await fetch("http://localhost:8081/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (req.ok) {
                const resData = await req.json();

                localStorage.setItem("token", resData.token);

                props.setUserLogin("Hi " + resData.first_name);
                navigate("/users");
                console.log("Login success:", resData);
            } else {
                console.error("Login failed:", req.status);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    const handleRegister = () => {
        navigate("/register");
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>Login name:</label> <input type="text" {...register('login_name', { required: true })} />
                    {errors.login_name && <p>required login_name</p>}
                    <br />
                    <label>Password:</label><input type="password" {...register('password', { required: true })} />
                    {errors.password && <p>require password</p>}
                </div>
                <button>Login</button>
            </form>
            <button onClick={() => { handleRegister() }}>Register</button>
        </div>
    )
}

export default LoginRegister;