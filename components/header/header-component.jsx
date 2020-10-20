
import styles from './header-styles.module.scss';
import { useSession, signOut } from 'next-auth/client'

const HeaderComponent = ({ children }) => {
  const [ session, loading ] = useSession();

  return (
    <header className={styles.container}>
      <div  className={styles.menu}>
        <span className={styles.logo}>Virtual Bookshelf</span>
        <div className={styles.profile}>
          {session &&
            <>
              <div className={styles.userInfo}>
                <span>Signed in as:</span>
                <span>{session.user.email}</span>
              </div>
              <img
                src={session.user.picture}
                className={styles.userPicture}
                alt={session.user.name}
                title={session.user.name}
              />
              <button onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` })}>Sign out</button>
            </>
          }
          {!session &&
           <a href="/api/auth/signin"
            onClick={(e) => {
            e.preventDefault()
            signIn('google', { callbackUrl: `${process.env.NEXTAUTH_URL}/library` })
            }}>Log in</a>
          }
        </div>
      </div>
    
    </header>
  )
}

export default HeaderComponent;
