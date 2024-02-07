import styled from 'styled-components'
import { auth, storage } from '../firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { db } from '../firebase'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border-bottom: 1px solid #e2e2e2;
`

const Column = styled.div``

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`

const UserName = styled.span`
  font-weight: 500;
  font-size: 12px;
`

const FeedText = styled.p`
  margin: 8px 0;
  font-size: 16px;
`

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`

interface IFeed {
  id: string
  feed: string
  userId: string
  username: string
  photo?: string
}

export default function Feed({ id, username, photo, userId, feed }: IFeed) {
  const user = auth.currentUser

  const handleDelete = async () => {
    const ok = confirm('삭제 하실려고요?')

    if (!ok || user?.uid !== userId) return

    try {
      await deleteDoc(doc(db, 'feeds', id))

      if (photo) {
        const photoRef = ref(storage, `feeds/${user.uid}/${id}`)
        await deleteObject(photoRef)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Wrapper>
      <Column>
        <UserName>{username}</UserName>
        <FeedText>{feed}</FeedText>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  )
}
