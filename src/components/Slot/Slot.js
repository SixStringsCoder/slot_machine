import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Slot = ({result}) => {
  return (
    <div className="slot-object">
      <p className="reel-obj">{result}</p>
    </div>
  );
}

Slot.propTypes = {
  result: PropTypes.string
}

export default Slot;
