"use client"

import {
  useTheme,
  Heading, Flex, Alert, View,
  Text, Divider, Button
} from "@aws-amplify/ui-react"
import { useQuery } from "@tanstack/react-query"
import { Storage } from "@aws-amplify/storage"

function formatBytes(bytes:number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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

  return (
    <Flex
      direction="column"
      maxWidth={theme.breakpoints.values.large}
      padding={theme.tokens.space.medium}
      gap={theme.tokens.space.medium}>
      <Flex alignItems="center">
        <Heading grow={1} level={1}>View Files List</Heading>
        <Button onClick={() => query.refetch() }>Reload</Button>
      </Flex>
      {query.isError && (
        <Alert variation="error" title="Failed to Fetch Files List">{String(query.error)}</Alert>
      )}
      {query.isSuccess && (
        <>
          {query.data.map(item => (
            <View key={item.key}>
              <Flex gap={theme.tokens.space.small} paddingBlock={theme.tokens.space.xs}>
                <Text grow={1}>{item.key}</Text>
                <Text textAlign="end" width={128} shrink={0}>
                  {typeof item.size == "number" ? formatBytes(item.size) : ''}
                </Text>
                <Text>{item.lastModified?.toISOString()}</Text>
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
