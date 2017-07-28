import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Cell.scss';

const Cell = (props) => {
  const {
    className,
    style,
    children,
    align,
    phoneCol = props.col,
    tabPortCol,
    tabLandCol,
    desktopCol,
    desktopBigCol,
    phonePush = props.push,
    tabPortPush,
    tabLandPush,
    desktopPush,
    desktopBigPush,
    // phone,
    // tabPort,
    // tabLand,
    // desktop,
    // bigDesktop,
  } = props;

  return (
    <div
      style={style}
      className={classnames(styles.cell, className, {
        [styles[`cell--${align}`]]: !align,
        [styles[`cell--phone-${phoneCol}-col`]]: phoneCol > -1,
        [styles[`cell--phone-${phonePush}-push`]]: phonePush > -1,

        [styles[`cell--tabPort-${tabPortCol}-col`]]: tabPortCol > -1,
        [styles[`cell--tabPort-${tabPortPush}-push`]]: tabPortPush > -1,

        [styles[`cell--tabLand-${tabLandPush}-push`]]: tabLandPush > -1,
        [styles[`cell--tabLand-${tabLandCol}-col`]]: tabLandCol > -1,

        [styles[`cell--desktop-${desktopPush}-push`]]: desktopPush > -1,
        [styles[`cell--desktop-${desktopCol}-col`]]: desktopCol > -1,

        [styles[`cell--desktopBig-${desktopBigPush}-push`]]: desktopBigPush > -1,
        [styles[`cell--desktopBig-${desktopBigCol}-col`]]: desktopBigCol > -1,
      })}
    >{children}</div>
  );
};

Cell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
};

Cell.defaultProps = {
  className: '',
  style: {},
};

export default Cell;
