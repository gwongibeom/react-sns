import styled from 'styled-components'

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

interface IFeed {
  feed: string
  username: string
  photo?: string
}

export default function Feed({ username, photo, feed }: IFeed) {
  return (
    <Wrapper>
      <Column>
        <UserName>{username}</UserName>
        <FeedText>{feed}</FeedText>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  )
}
