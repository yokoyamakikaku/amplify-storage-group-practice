"use client"
import { FC, PropsWithChildren } from "react"
import { Amplify } from "aws-amplify"

import { Authenticator } from "@aws-amplify/ui-react"
import config from '@/aws-exports'

Amplify.configure(config)

const Providers:FC<PropsWithChildren> = ({ children }) => {
  return (
    <Authenticator>{children}</Authenticator>
  )
}

export default Providers
