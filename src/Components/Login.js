import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { login, loginGoogle } from '../Firebase/auth';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(isLoading);
    let user;
    setLoading(true);
    try {
      user = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (user) {
      <Navigate to="/plans" />;
    } else {
      setLoading(false);
    }
  };

  const openPopup = async () => {
    let user;
    setLoading(true);
    try {
      user = await loginGoogle();
      console.log('hello');
      // reset();
    } catch (error) {
      console.log(error);
    }

    if (user) {
      <Navigate to="/plans" />;
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                placeholder="name@flowbite.com"
                required
                type="email"
                {...register('email')}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" required type="password" {...register('password')} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
            <Button onClick={openPopup}>Login with Google</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
