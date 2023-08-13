import type { Metadata } from 'next'

import '@aws-amplify/ui-react/styles.css'
import Providers from './Providers'

export const metadata: Metadata = {
  title: 'Amplify Storage Group Practice',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
