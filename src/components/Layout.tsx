import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { HomeIcon } from '../atoms/icons/Home'
import { UserIcon } from '../atoms/icons/User'
import { ArrowLeftEnd } from '../atoms/icons/ArrowLeftEnd'
import { auth } from '../firebase'
import Toast from './Toast'
import useToastStore from '../store/toast'

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: black;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`

export default function Layout() {
  const { text, isShowing } = useToastStore()
  const navi = useNavigate()

  const onLogout = async () => {
    const ok = confirm('r u sure???')
    if (ok) {
      await auth.signOut()
      navi('/')
    }
  }
  return (
    <Wrapper>
      <Menu>
        <Link to={'/'}>
          <MenuItem>
            <HomeIcon />
          </MenuItem>
        </Link>
        <Link to={'/profile'}>
          <MenuItem>
            <UserIcon />
          </MenuItem>
        </Link>
        <Link to={'/logout'}>
          <MenuItem onClick={onLogout} className='log-out'>
            <ArrowLeftEnd />
          </MenuItem>
        </Link>
      </Menu>
      <Toast isVisable={isShowing}>{text}</Toast>
      <Outlet />
    </Wrapper>
  )
}
