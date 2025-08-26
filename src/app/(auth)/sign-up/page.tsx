import { auth } from '@/lib/auth';
import SignUpView from '@/modules/auth/views/sign-up-view'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const SignUp = async() => {
  const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
  
    if (!!session) {
      redirect("/");
    }
  return (<SignUpView/>)
}

export default SignUp
