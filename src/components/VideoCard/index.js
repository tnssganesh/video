import {Link} from 'react-router-dom'
import LanguageContext from '../../context/LanguageContext'
import './index.css'

const VideoCard = props => (
  <LanguageContext.Consumer>
    {value => {
      const {currentOption} = value

      const {video} = props
      //   console.log(video.channel === undefined)

      const renderHomeTrend = () => {
        const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = video
        return (
          <Link to={`/videos/${id}`}>
            <div>
              <img
                className="profile"
                alt="video thumbnail"
                src={thumbnailUrl}
              />
              <img
                className="prof"
                alt="channel logo"
                src={channel.profile_image_url}
              />
              <p>{title}</p>
              <p>{channel.name}</p>
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </Link>
        )
      }

      const renderGame = () => {
        const {id, title, thumbnailUrl, viewCount} = video
        return (
          <Link to={`/videos/${id}`}>
            <div>
              <img
                className="profile"
                alt="video thumbnail"
                src={thumbnailUrl}
              />

              <p>{title}</p>

              <p>{viewCount}</p>
            </div>
          </Link>
        )
      }

      const isGame = video.channel === undefined

      return (
        <li className="cardItem">
          {isGame ? renderGame() : renderHomeTrend()}
        </li>
      )
    }}
  </LanguageContext.Consumer>
)

export default VideoCard
