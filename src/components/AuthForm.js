import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { bg_url, host } from "../constant";

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true); 
  const [previewImage, setPreviewImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isLoginForm) {
        // login form submission logic
        const { email, password } = data;
        const loginData = { email, password };
        const response = await axios.post(
          host+"/auth/login",
          loginData
        );
        console.log("response data on login",response.data); 
        if (response.status === 200) {
            const { token, user } = response.data; 
            
            // Save token and user details in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            alert("You have successfully loggedIn");
            navigate("/browse");
        }
        else{
            alert("Something went wrong Please check your credentials");
        }
      } else {
        //  registration form submission logic
        const { email, password, confirmPassword } = data;
        const registerData = { email, password, confirmPassword };
        const response = await axios.post(
          host+"/auth/signup",
          registerData
        );
        console.log(response.data); 
        alert("Registration successful! You can now login.");
        // Switch to login form
        setIsLoginForm(true);
      }
    } catch (error) {
      console.error("Error:", error); 
      if (error.response) {
        alert("An error occurred. Please try again."); 
      }
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); 
  };

  
  return (
    <div className="flex justify-center items-center h-screen m-5 bg-slate-300"
    style={{
      backgroundImage: `url(${bg_url})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
    }}
    >
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/3 sm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl mb-6 text-center">
          {isLoginForm ? "Login" : "Register"}
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        {!isLoginForm && (
          <>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  Confirm Password is required
                </span>
              )}
            </div>
          </>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoginForm ? "Login" : "Register"}
          </button>
        </div>
        <div
          className="flex items-center justify-between mt-5 cursor-pointer"
          onClick={toggleForm} 
        >
          {isLoginForm
            ? "New User? Please Signup"
            : "Already registered? Please Login"}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
