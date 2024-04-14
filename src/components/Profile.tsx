import { useState } from 'react'
import styled from 'styled-components'
import { auth, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`

const AvatarUpload = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: snow;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`

const AvatarImg = styled.img`
  width: 100%;
`

const AvatarInput = styled.input`
  display: none;
`

const Name = styled.span`
  font-size: 24px;
`

export default function Profile() {
  const user = auth.currentUser
  const [avatar, setAvatar] = useState(user?.photoURL)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!user) return

    if (files && files.length === 1) {
      const file = files[0]

      const locationRef = ref(storage, `avatar/${user.uid}`)

      const result = await uploadBytes(locationRef, file)

      const avatarUrl = await getDownloadURL(result.ref)

      await updateProfile(user, {
        photoURL: avatarUrl,
      })

      setAvatar(avatarUrl)
    }
  }

  return (
    <Wrapper>
      <AvatarUpload htmlFor='avatar'>
        {avatar ? <AvatarImg src={avatar} /> : <svg></svg>}
        <AvatarInput
          type='file'
          accept='image/'
          id='avatar'
          onChange={() => {
            handleAvatarChange
          }}
        />
      </AvatarUpload>
      <Name>{user?.displayName ?? '어나니머슨'}</Name>
    </Wrapper>
  )
}
