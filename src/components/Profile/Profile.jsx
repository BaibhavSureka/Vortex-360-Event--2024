import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import axios from "axios";

const EditProfile = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const Records = {
        "name": "Sriram",
        "reg_number": "21BDG0921",
        "gender": "male",
        "email": "sriram.r2021a@vitstudent.ac.in",
        "phone_number": "9821314536",
        "vit_email": "sriram.r2021a@vitstudent.ac.in"
    };

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/profile/create', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);

            if (data.name && data.reg_no && data.gender && data.email && data.vit_email && data.number) {
                // Simulate sending data to a server
                console.log("Submitted data:", data);
                toast.success('Submitted successfully!', {
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to submit form. Please fill in all fields.', {
                    position: 'top-center',
                });
            }

            reset();
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Failed to submit form. Please try again later.', {
                position: 'top-center',
            });
        }
    };

    return (
        <div id='profile' className="body gradient-background">
            <div className='profile'>
                <Toaster position="top-center" reverseOrder={false} />
                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        <h1>Profile</h1>
                    </div>
                    <div className="text-box">
                        <label>Name :</label>
                        <input
                            className='input'
                            placeholder="Enter your name"
                            value={Records.name}
                            {...register("name", {
                                required: true,
                                pattern: /^[A-Za-z ]+$/,
                            })}
                        />
                        <span className="error">
                            {errors.name?.type === "required" && "Name is required"}
                            {errors.name?.type === "pattern" && "Name should not contain numbers"}
                        </span>
                    </div>

                    <div className="text-box">
                        <label>Register number :</label>
                        <input
                            className='input'
                            placeholder="Enter your register no."
                            value={Records.reg_number}
                            {...register("reg_no", {
                                required: true,
                                pattern: /^[A-Za-z0-9 ]+$/,
                            })}
                        />
                        <span className="error">
                            {errors.reg_no?.type === "required" && "Reg no. is required"}
                            {errors.reg_no?.type === "pattern" && "Given Reg no. is invalid"}
                        </span>
                    </div>

                    <div className="form-group text-box">
                        <label>Gender :</label>
                        <div className="radio-group">
                            <div>
                                <input
                                    type="radio"
                                    {...register("gender", { required: true, disabled: true })}
                                    value="male"
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    {...register("gender", { required: true, disabled: true })}
                                    value="female"
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    {...register("gender", { required: true, disabled: true })}
                                    value="other"
                                />
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>
                        <span className="error">{errors.gender && "Gender is required"}</span>
                    </div>

                    <div className="text-box">
                        <label>Email :</label>
                        <input
                            className='input'
                            placeholder="Enter your email id"
                            value={Records.email}
                            {...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:com|in)$/i,
                            })}
                        />
                        <span className="error">
                            {errors.email?.type === "required" && "Email is required"}
                            {errors.email?.type === "pattern" &&
                                "Entered email is in the wrong format"}
                        </span>
                    </div>

                    <div className="text-box">
                        <label>VIT Email :</label>
                        <input
                            className='input'
                            placeholder="Enter your VIT email id"
                            value={Records.vit_email}
                            {...register("vit_email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9_.+-]+@vitstudent\.ac\.in$/i,
                            })}
                        />
                        <span className="error">
                            {errors.vit_email?.type === "required" && "VIT Email is required"}
                            {errors.vit_email?.type === "pattern" &&
                                "Entered VIT email is in the wrong format"}
                        </span>
                    </div>

                    <div className="text-box">
                        <label>Mobile Number :</label>
                        <input
                            className='input'
                            placeholder="Enter your mobile no."
                            type="text"
                            {...register("number", {
                                required: true,
                                pattern: /^(0|[1-9][0-9]*)$/,
                                minLength: 10,
                                maxLength: 10,
                            })}
                        />
                        <span className="error">
                            {errors.number?.type === "required" && "Mobile no. is required"}
                            {errors.number?.type === "minLength" &&
                                "Entered number is less than 10 digits"}
                            {errors.number?.type === "maxLength" &&
                                "Entered number is more than 10 digits"}
                        </span>
                    </div>

                    <div>
                        <input className="button" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

const Profile = () => {
    const [edit, setEdit] = useState(false);
    const something = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
        { id: 5, name: "Item 5" }
    ];

    return (
        <div>
            
                
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {something.map(item => (
                            <div>
                            <div key={item.id}>{item.name}</div>
                            <div key={item.id}>{item.name}</div>
                            </div>
                        ))}
                    </div>
                
            
        </div>
    )
}

export default Profile;
