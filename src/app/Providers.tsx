"use client"
import { FC, PropsWithChildren } from "react"
import { Amplify, I18n } from "aws-amplify"

import { Authenticator, translations } from "@aws-amplify/ui-react"
import config from '@/aws-exports'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

I18n.putVocabularies(translations);
I18n.setLanguage('ja');

Amplify.configure(config)

const client = new QueryClient()

const Providers:FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <Authenticator>{children}</Authenticator>
    </QueryClientProvider>
  )
}

export default Providers
