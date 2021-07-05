import React from 'react'

const Fallback: React.FC = () => {
  return (
    <div className='fallback-ui'>
      <span className={'errorBtn'}>
        <a href='/'>
          <span>← Back</span>
        </a>
      </span>
      <h3>
        <span
          className='iconify '
          data-icon='emojione:tiger'
          data-inline='false'></span>{' '}
        Opps !
      </h3>
    </div>
  )
}

export default Fallback
