import styled from 'styled-components'

export const LightDarkContainer = styled.div`
  background-color: ${props => (props.outline ? 'black' : 'white')};
  color: ${props => (!props.outline ? '#424242' : '#f9f9f9')};
`
