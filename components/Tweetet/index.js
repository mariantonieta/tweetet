import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

export default function Tweetet({
  avatar,
  userName,
  img,
  content,
  createdAt,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <h5>Mariantonieta Chacon</h5>
            <h5>{userName}</h5>
            <span>·</span>
            <date>{timeago}</date>
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
        div {
          padding-right: 10px;
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
        date {
          margin: auto;
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
