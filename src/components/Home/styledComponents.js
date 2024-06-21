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
  width: 100%;
  height: 500px;
  background-image: url(${props => props.outlin});
`
