"use client"

import {
  useTheme,
  Button,
  View,
} from "@aws-amplify/ui-react"
import { useForm } from "react-hook-form"

const UploadFile = () => {
  const theme = useTheme()

  const { register } = useForm<{ file: File }>({
    defaultValues: {

    }
  })

  return (
    <View maxWidth={theme.breakpoints.values.medium}>
      <form action="">
        <Button as="label" htmlFor="fileInput"></Button>
        <input id="fileInput" type="file" {...register('file')} />
        <Button>Upload</Button>
      </form>
    </View>
  )
}

export default UploadFile
