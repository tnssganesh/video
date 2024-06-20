import {Link} from 'react-router-dom'
import LanguageContext from '../../context/LanguageContext'
import './index.css'

const VideoCard = props => (
  <LanguageContext.Consumer>
    {value => {
      const {currentOption} = value

      const {video} = props
      // console.log(video)
      const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = video

      const renderHomeTrend = () => (
        <Link to={`/videos/${id}`}>
          <div>
            <img className="profile" alt="thumb" src={thumbnailUrl} />
            <img className="prof" alt="pro" src={channel.profile_image_url} />
            <p>{title}</p>
            <p>{channel.name}</p>
            <p>{viewCount}</p>
            <p>{publishedAt}</p>
          </div>
        </Link>
      )

      const renderGame = () => (
        <Link to={`/videos/${id}`}>
          <div>
            <img className="profile" alt="thumb" src={thumbnailUrl} />

            <p>{title}</p>

            <p>{viewCount}</p>
          </div>
        </Link>
      )

      const isGame = currentOption === 'Gaming'

      return (
        <li className="cardItem">
          {isGame ? renderGame() : renderHomeTrend()}
        </li>
      )
    }}
  </LanguageContext.Consumer>
)

export default VideoCard
