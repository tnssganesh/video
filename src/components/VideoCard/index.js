import LanguageContext from '../../context/LanguageContext'
import './index.css'

const VideoCard = props => (
  <LanguageContext.Consumer>
    {value => {
      const {isDark, currentOption} = value
      const id = currentOption
      const {video} = props
      // console.log(video)
      const {title, thumbnailUrl, channel, name, viewCount, publishedAt} = video

      const renderHomeTrend = () => (
        <div>
          <img className="profile" alt="thumb" src={thumbnailUrl} />
          <img className="prof" alt="pro" src={channel.profile_image_url} />
          <p>{title}</p>
          <p>{channel.name}</p>
          <p>{viewCount}</p>
        </div>
      )

      const renderGame = () => (
        <div>
          <img className="profile" alt="thumb" src={thumbnailUrl} />

          <p>{title}</p>

          <p>{viewCount}</p>
        </div>
      )

      const isGame = id === 'Gaming'

      return (
        <li className="cardItem">
          {isGame ? renderGame() : renderHomeTrend()}
        </li>
      )
    }}
  </LanguageContext.Consumer>
)

export default VideoCard
