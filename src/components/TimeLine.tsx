import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { db } from '../firebase'
import Feed from './Feed'
import { Unsubscribe } from 'firebase/auth'

// DB 구조
export interface IFeed {
  id: string
  photo?: string // 필수가 아니다
  feed: string
  userId: string
  username: string
  createdAt: number
}

const Wrapper = styled.div``

export default function Timeline() {
  const [feeds, setFeed] = useState<IFeed[]>([])
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null

    const fetchFeeds = async () => {
      // 데이터 페칭
      const feedsQuery = query(
        // 어떤 쿼리를 원하는지
        collection(db, 'feeds'), // feed 컬렉션에서
        orderBy('createdAt', 'desc') // 최신 순으로 (내림차)
      )
      unsubscribe = await onSnapshot(feedsQuery, (snapshot) => {
        const feeds = snapshot.docs.map((doc) => {
          const { feed, createdAt, userId, username, photo } = doc.data()

          return {
            feed,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          }
        })
        setFeed(feeds) // 얻은 데이터 객체를 setState
      })
    }

    fetchFeeds() // 페칭

    return () => {
      if (unsubscribe) {
        unsubscribe()
        console.log('실행')
      }
      // unsubscribe && unsubscribe();
    }
  }, [])
  return (
    <Wrapper>
      {feeds.map((feed) => (
        <Feed key={feed.id} {...feed} />
      ))}
    </Wrapper>
  )
}
