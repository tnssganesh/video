import './index.css'

const VideoCard = props => {
  const {video} = props
  console.log(video)
  const {
    title,
    thumbnailUrl,
    channel,
    name,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = video
  return (
    <li>
      <img alt="video" src={thumbnailUrl} />
      <p>{title}</p>
    </li>
  )
}

export default VideoCard
