import React from 'react'
import { Children } from '../utils/types'

interface IJumbotron extends React.FC {
  children?: Children
  Container: React.FC<Children>
  Pane: React.FC<Children>
  Title: React.FC<{ title: string }>
  Content: React.FC<Children>
}

const Jumbotron: IJumbotron = ({ children }) => {
  return (
    <div className='jumbo-item'>
      <div className='jumbo-wrapper'>{children}</div>
    </div>
  )
}

Jumbotron.Container = function JumboCntainer({ children }) {
  return <div className='jumbo-container'>{children}</div>
}

Jumbotron.Pane = function JumboPane({ children }) {
  return <div className='jumbo-pane'>{children}</div>
}

Jumbotron.Title = function JumboTitle({ title }) {
  return <h1>{title}</h1>
}

Jumbotron.Content = function JumboContent({ children }) {
  return <div className='jumbo-content'>{children}</div>
}

export default Jumbotron
