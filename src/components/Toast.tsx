import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  width: fit- content; /* 텍스트 크기만큼 동적으로 조정 */
  min-height: 3rem;
  background: #fff;
  box-shadow: 5px 5px 5px lightgray;
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: opacity 0.3s ease-in-out;
  &.show {
    display: flex;
  }
  &.hide {
    display: none;
  }
`

const ToastContent = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Toast = ({ isVisable = true, children }: ToastProps) => {
  const [isShowing, setIsShowing] = useState(isVisable)

  useEffect(() => {
    setIsShowing(isVisable)
  }, [isVisable])

  return (
    <ToastWrapper className={isShowing ? 'show' : 'hide'}>
      <ToastContent>
        <div>{children}</div>
      </ToastContent>
    </ToastWrapper>
  )
}

interface ToastProps {
  isVisable?: boolean
  children?: React.ReactNode
}

export default Toast
