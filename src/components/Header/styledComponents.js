import styled from 'styled-components'

export const LightDarkContainer = styled.div`
  background-color: ${props => props.theme};
`
export const LogoutButton = styled.button`
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 13px;
  padding: 8px 16px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  border-color: ${props => props.bdColor};
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  outline: none;
`
