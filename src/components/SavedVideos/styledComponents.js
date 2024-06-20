import styled from 'styled-components'

export const LightDarkContainer = styled.div`
  background-color: ${props => (props.outline ? '#0f0f0f' : 'white')};
  color: ${props => (!props.outline ? '#424242' : '#f9f9f9')};
`
