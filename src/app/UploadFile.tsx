"use client"

import { v4 as uuid } from 'uuid'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Storage } from "@aws-amplify/storage"
import { useTheme, Button, View, Flex, Heading, Alert, Loader } from "@aws-amplify/ui-react"

const UploadFile = () => {
  const theme = useTheme()

  const { register, handleSubmit, reset } = useForm<{ file: FileList }>({
    defaultValues: {}
  })

  const mutation = useMutation({
    async mutationFn ({ file: fileList }: { file: FileList }) {
      const file = fileList[0]
      const key = uuid()
      const result = await Storage.put(key, file, {
        level: 'protected',
        contentType: file.type,
        metadata: { name: file.name }
      })
      return result
    },
    onSuccess() {
      reset()
    }
  })

  return (
    <Flex
      direction="column"
      maxWidth={theme.breakpoints.values.medium}
      padding={theme.tokens.space.medium}
      gap={theme.tokens.space.medium}>
      <Heading level={1}>Upload File</Heading>
      <Flex
        direction="column" gap={theme.tokens.space.small}
        as='form' onSubmit={handleSubmit(({ file }) => mutation.mutate({ file: file }))}>
        <input id="fileInput" type="file" required {...register('file')} />
        {mutation.isError && <Alert variation="error" isDismissible>Failed to Upload File</Alert>}
        {mutation.isError && <Alert variation="success" isDismissible>Succeeded to Upload File</Alert>}
        <View>
          {mutation.isLoading ? (
            <Button variation="primary" disabled>Uploading <Loader /></Button>
          ) : (
            <Button variation="primary" type="submit">Upload File</Button>
          )}
        </View>
      </Flex>
    </Flex>
  )
}

export default UploadFile
