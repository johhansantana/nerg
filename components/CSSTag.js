import React from 'react';

const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line

// Note
// this component will only work for ENV = development
function CSSTag (props) {
  const { style } = props;
  return dev && <style dangerouslySetInnerHTML={{ __html: style }} />;
}

export default CSSTag;