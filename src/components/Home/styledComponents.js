import styled from 'styled-components'

export const LightDarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme};
`
export const HomeListItem = styled.li`
  background-color: ${props => props.isActive};
`
