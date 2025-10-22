import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {formatDistanceToNow} from 'date-fns'
import LanguageContext from '../../context/LanguageContext'
import './index.css'

const VideoCard = props => {
  const {isDark} = useContext(LanguageContext)
  const {video} = props

  const formatPublishedAt = publishedAt => {
    if (!publishedAt) return ''
    const timeAgo = formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    })
    // Clean up 'about' and 'less than' from formatDistanceToNow output
    return timeAgo.replace('about', '').replace('less than', '').trim()
  }

  const renderHomeTrend = () => {
    const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = video
    const displayTime = formatPublishedAt(publishedAt)
    return (
      <Link to={`/videos/${id}`}>
        <div>
          <img className="profile" alt="video thumbnail" src={thumbnailUrl} />
          <img
            className="prof"
            alt="channel logo"
            src={channel.profile_image_url}
          />
          <p>{title}</p>
          <p>{channel.name}</p>
          <p>{viewCount} views</p>
          <p>{displayTime}</p>
        </div>
      </Link>
    )
  }

  const renderGame = () => {
    const {id, title, thumbnailUrl, viewCount} = video
    return (
      <Link to={`/videos/${id}`}>
        <div>
          <img className="profile" alt="video thumbnail" src={thumbnailUrl} />
          <p>{title}</p>
          <p>{viewCount} watching worldwide</p>
        </div>
      </Link>
    )
  }

  const isGame = video.channel === undefined

  return (
    <li className="cardItem">{isGame ? renderGame() : renderHomeTrend()}</li>
  )
}

export default VideoCard
