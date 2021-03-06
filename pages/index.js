import Head from "next/head"
import { colors } from "styles/theme"
import { loginWithGitHub } from "firebase/client"
import Button from "components/Button"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"
export default function Home() {
  const router = useRouter()
  const user = useUser()
  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    user && router.replace("/home")
  }, [user])
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <img src="/im.png" width="100" />

        <h1>Tweetet</h1>
        <h2>
          Talk about development
          <br />
          with developers 👨‍💻
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>Login with GitHub</Button>
          )}
          {user === USER_STATES.NOT_KNOWN && (
            <div>
              <span>Loading...</span>
            </div>
          )}
        </div>
      </section>
      <style jsx>{`
        div {
          margin-top: 16px;
        }
        h5 {
          margin-top: -35px;
          margin-left: 60px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
