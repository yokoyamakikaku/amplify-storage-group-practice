"use client"

import {
  useAuthenticator,
  useTheme,
  Flex,
  View,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@aws-amplify/ui-react"

const ViewUser = () => {
  const theme = useTheme()
  const { user, signOut } = useAuthenticator()

  const payload = user.getSignInUserSession()?.getIdToken().payload ?? {}

  return (
    <View
      maxWidth={theme.breakpoints.values.large}
      padding={theme.tokens.space.medium}>
      <Flex direction="column">
        <Table>
          <TableBody>
            {Object.entries(payload).map((([key,value]) => (
              <TableRow key={key}>
                <TableCell as="th">{key}</TableCell>
                <TableCell >{String(value)}</TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
        <View>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </View>
      </Flex>
    </View>
  )
}

export default ViewUser
