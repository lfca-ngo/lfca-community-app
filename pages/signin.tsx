import type { NextPage } from 'next'
import React from 'react'

import Signin from '../components/Auth/Signin'
import { OneColLayout } from '../components/Layout'

const SignIn: NextPage = () => {
  return (
    <OneColLayout>
      <Signin />
    </OneColLayout>
  )
}

export default SignIn
