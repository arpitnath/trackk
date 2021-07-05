import React from 'react'

interface JumbotronComposition {
  Container: React.FC
  Pane: React.FC
  Title: React.FC<{ title: string }>
  Content: React.FC
}

const Jumbotron: React.FC & JumbotronComposition = ({ children }) => {
  return (
    <div className='jumbo-item'>
      <div className='jumbo-wrapper'>{children}</div>
    </div>
  )
}

const JumboContainer: React.FC = ({ children }) => {
  return <div className='jumbo-container'>{children}</div>
}

const JumboPane: React.FC = ({ children }) => {
  return <div className='jumbo-pane'>{children}</div>
}

const JumboTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h1>{title}</h1>
}

const JumboContent: React.FC = ({ children }) => {
  return <div className='jumbo-content'>{children}</div>
}

Jumbotron.Container = JumboContainer
Jumbotron.Pane = JumboPane
Jumbotron.Title = JumboTitle
Jumbotron.Content = JumboContent

export default Jumbotron
