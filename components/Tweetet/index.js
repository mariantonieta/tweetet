import Avatar from "components/Avatar"
import { useRouter } from "next/router"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
export default function Tweetet({
  avatar,
  userName,
  img,
  content,
  createdAt,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()
  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push("/status/[id]", `/status/${id}`)
  }
  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a>
                <time>{timeago}</time>
              </a>
            </Link>
            <h5>Mariantonieta Chacon</h5>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }
        div {
          padding-right: 10px;
        }
        h5 {
          margin-top: -15px;
          margin-left: 10px;
        }
        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        span {
          margin: 0 5px;
        }
        time {
          color: #555;
          font-size: 14px;
          margin-left: 350px;
        }
        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
