import styled from 'styled-components'

export const LightDarkContainer = styled.div`
  height: 90vh;
  display: flex;
  margin-top: 0px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.outline ? '#424242' : '#f9f9f9')};
  color: ${props => (!props.outline ? '#424242' : '#f9f9f9')};
`
