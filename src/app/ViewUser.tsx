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
  Button,
  Heading,
  Expander, ExpanderItem
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
        <Flex alignItems="center">
          <Heading grow={1} level={1}>User</Heading>
          <View>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </View>
        </Flex>
        <Expander isCollapsible>
          <ExpanderItem title="Payload" value="payload">
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
          </ExpanderItem>
        </Expander>
      </Flex>
    </View>
  )
}

export default ViewUser
