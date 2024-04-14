import styled from 'styled-components'
import { auth, db, storage } from '../firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useState } from 'react'

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

const UpdateButton = styled.button`
  background-color: blue;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TextArea = styled.textarea`
  border: 1px solid #e1e1e1;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`

interface IFeed {
  id: string
  userId: string
  feed: string
  userName: string
  photo?: string
}

export default function Feed({ id, userId, feed, userName, photo }: IFeed) {
  // 현재 로그인 된 정보 가져오기
  const user = auth.currentUser

  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [updateText, setUpdateText] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    const ok = confirm('선택한 피드를 삭제하시겠습니까?')

    if (!ok || user?.uid !== userId) return // 삭제 취소하거나, 로그인한 유저와 작성자가 다른 경우 (종료)

    try {
      await deleteDoc(doc(db, 'feeds', id))

      if (photo) {
        const photoRef = ref(storage, `feeds/${user.uid}/${id}`)
        await deleteObject(photoRef)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ToggleUpdateState = () => {
    setIsUpdating((prev) => !prev)
  }

  const onChangeUpdateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateText(e?.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || updateText === '' || updateText.length > 100) return

    try {
      setIsLoading(true)

      await updateDoc(doc(db, 'feeds', id), {
        feed: updateText,
        userId: user.uid,
      })
    } catch (error) {
      console.error(error)
    }

    setUpdateText('')
    ToggleUpdateState()
  }

  // true: deleteDoc + if photo: deleteObject
  // DB를 지워주고 + 이미지를 저장 중인 Storage도 함께 Delete

  return (
    <Wrapper>
      {/* 3 그리드 */}
      <Column>
        <UserName>{userName}</UserName>

        {isUpdating ? (
          <Form onSubmit={onSubmit}>
            <TextArea
              required // 빈 값 허용하지 않음
              rows={5}
              maxLength={180}
              onChange={onChangeUpdateText}
              value={updateText}
              placeholder='What is happening?!'
            />
            <SubmitBtn
              type='submit'
              value={isLoading ? '업데이팅...' : '업데이트'}
            />
          </Form>
        ) : (
          <FeedText>{feed}</FeedText>
        )}

        {user?.uid === userId && !isUpdating ? (
          <>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            <UpdateButton onClick={ToggleUpdateState}>Update</UpdateButton>
          </>
        ) : (
          <div onClick={ToggleUpdateState}>취소</div>
        )}
      </Column>

      {/* 1 그리드 */}
      {photo && (
        <Column>
          <Photo src={photo} />
        </Column>
      )}
    </Wrapper>
  )
}
