"use client"
import { FC, PropsWithChildren } from "react"
import { Amplify, I18n } from "aws-amplify"

import { Authenticator, translations } from "@aws-amplify/ui-react"
import config from '@/aws-exports'

I18n.putVocabularies(translations);
I18n.setLanguage('ja');

Amplify.configure(config)

const Providers:FC<PropsWithChildren> = ({ children }) => {
  return (
    <Authenticator>{children}</Authenticator>
  )
}

export default Providers
