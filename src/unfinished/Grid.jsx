import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Grid = ({ className, style, children }) => (
  <div
    className={classnames(className)}
    style={style}
  >{children}</div>
);

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
};

Grid.defaultProps = {
  className: '',
  style: {},
};

export default Grid;
