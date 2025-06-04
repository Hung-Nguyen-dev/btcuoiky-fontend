import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()
    const submit = async (data) => {
        try {
            const req = await fetch("http://localhost:8081/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
            if (req.ok) {
                navigate("/")
            }
            else {
                console.log(req.error)

            }
        } catch (error) {
            console.error("Send data error:", error);
        }

    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <p>First_name</p>
            <input type="text" {...register("first_name", { required: true })} />
            {errors.first_name && <p>Required first_name</p>}
            <p>Last_name</p>
            <input type="text" {...register("last_name", { required: true })} />
            {errors.last_name && <p>Required last_name</p>}
            <p>Location</p>
            <input type="text" {...register("location", { required: true })} />
            {errors.location && <p>Required location</p>}
            <p>Description</p>
            <input type="text" {...register("description", { required: true })} />
            {errors.description && <p>Required description</p>}
            <p>Occupation</p>
            <input type="text" {...register("occupation", { required: true })} />
            {errors.occupation && <p>Required occupation</p>}
            <p>Login_name</p>
            <input type="text" {...register("login_name", { required: true })} />
            {errors.login_name && <p>Required login_name</p>}
            <p>Password</p>
            <input type="password" {...register("password", { required: true })} />
            {errors.password && <p>Required password</p>}
            <br />
            <button>Register</button>


        </form>
    )
}

export default Register