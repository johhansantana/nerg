import React from 'react'
import PropTypes from 'prop-types'

const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line

// Note
// this component will only work for ENV = development
const CSSTag = props => {
  const { style } = props
  return dev && <style dangerouslySetInnerHTML={{ __html: style }} />
}

CSSTag.propTypes = {
  style: PropTypes.object.isRequired
}

export default CSSTag