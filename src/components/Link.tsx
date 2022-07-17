import React, { ReactNode } from "react"
import { Link as ReactRouterLink } from "react-router-dom"
import styled from "styled-components"

type LinkProps = {
  to: string
  external?: boolean
  children: ReactNode
}

export const Link = (props: LinkProps) => {
  if(props.external){
    return <StyledA href={props.to} target='_blank'>{props.children}</StyledA>
  }

  return <StyledLink {...props}/>
}

const StyledA = styled.a`
  outline: none;
  text-decoration: none;
`

const StyledLink = styled(ReactRouterLink)`
  outline: none;
  text-decoration: none;
`