import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Tweetet from "components/Tweetet"
import useUser from "hooks/useUser"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"
import { fetchLatestTweetet } from "firebase/client"
import Link from "next/link"
import Head from "next/head"
export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestTweetet().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Tweetet</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {" "}
          {timeline.map(
            ({ createdAt, id, img, username, avatar, content, userId }) => (
              <Tweetet
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                img={img}
                key={id}
                content={content}
                userName={username}
                userId={userId}
              />
            )
          )}
        </section>
        <nav>
          <Link href="/home">
            <a>
              <Home stroke="09f" />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search stroke="09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create stroke="09f" />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        section {
          flex: 1;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
