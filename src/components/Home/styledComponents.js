import styled from 'styled-components'

export const LightDarkContainer = styled.div`
  background-color: ${props => (props.outline ? '#181818' : 'white')};
  color: ${props => (!props.outline ? '#424242' : '#f9f9f9')};
`
export const HomeListItem = styled.li`
  background-color: ${props => props.isActive};
`

export const BannerContainer = styled.div`
  background-size: cover;

  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png ');
`
