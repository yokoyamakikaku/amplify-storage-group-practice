import ViewUser from './ViewUser'
import UploadFile from './UploadFile'
import ViewFilesList from './ViewFilesList'

export default function Home() {
  return (
    <>
      <ViewUser />
      <UploadFile />
      <ViewFilesList />
    </>
  )
}
