import './index.css'

const VideoCard = props => {
  const {video} = props
  // console.log(video)
  const {title, thumbnailUrl, channel, name, viewCount, publishedAt} = video
  return (
    <li>
      <img alt="thumb" src={thumbnailUrl} />

      <p>{title}</p>

      <p>{viewCount}</p>
    </li>
  )
}

export default VideoCard

