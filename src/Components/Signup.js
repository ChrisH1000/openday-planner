import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { signup } from '../Firebase/auth';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(isLoading);
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
      reset();

      if (newUser) {
        <Navigate to="/plans" />;
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fname" value="First Name" />
              </div>
              <TextInput
                id="fname"
                placeholder="Joe"
                required
                type="text"
                {...register('firstName')}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lname" value="Last Name" />
              </div>
              <TextInput
                id="lname"
                placeholder="Bloggs"
                required
                type="text"
                {...register('lastName')}
              />
            </div>
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
            <Button type="submit">Signup</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
