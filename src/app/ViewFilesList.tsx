"use client"

import {
  useTheme,
  Heading, Flex, Alert, View,
  Text, Divider
} from "@aws-amplify/ui-react"
import { useQuery } from "@tanstack/react-query"
import { Storage } from "@aws-amplify/storage"

const ViewFilesList = () => {
  const theme = useTheme()

  const query = useQuery({
    queryKey: ['files'],
    async queryFn () {
      const files = []
      let nextToken: string | undefined
      do {
        const listOutput = await Storage.list('', {
          level: 'protected',
          pageSize: "ALL",
          nextToken,
        })
        for (const result of listOutput.results) {
          files.push(result)
        }
        nextToken = listOutput.nextToken
      } while (nextToken)
      return files
    }
  })

  console.log(query.data)

  return (
    <Flex
      direction="column"
      maxWidth={theme.breakpoints.values.medium}
      padding={theme.tokens.space.medium}
      gap={theme.tokens.space.medium}>
      <Heading level={1}>View Files List</Heading>
      {query.isError && (
        <Alert variation="error" title="Failed to Fetch Files List">{String(query.error)}</Alert>
      )}
      {query.isSuccess && (
        <>
          {query.data.map(item => (
            <View key={item.key}>
              <Flex gap={theme.tokens.space.xs} paddingBlock={theme.tokens.space.xxs}>
                <Text>{item.key}</Text>
                <Text>{item.size}</Text>
              </Flex>
              <Divider />
            </View>
          ))}
        </>
      )}
    </Flex>
  )
}

export default ViewFilesList
