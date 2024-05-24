import React from 'react'

function RatingReview({ rating, setRating, disabled=false }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (  
          <span
            className='start'
            style={{
              cursor: disabled ? 'default' : 'pointer',
              color: rating >= star ? 'gold' : 'gray',
              fontSize: `35px`,
            }}
            onClick={() => {
              setRating(star)
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

export default RatingReview;