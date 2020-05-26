import React, { Component } from 'react';
import Truncate from './Truncate';

class ShowMoreText extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      truncated: false
    };
  }

  static defaultProps = {
    lines: 3,
    more: 'Show more',
    less: 'Show less',
    anchorClass: '',
    onClick: undefined,
    expanded: false,
    width: 0,
    keepNewLines: false
  };

  componentDidMount() {
    this._isMounted = true;

    var _self = this;
    if (this._isMounted) {
      this.setState({
        expanded: _self.props.expanded
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleTruncate = truncated => {
    if (this._isMounted && truncated !== this.state.truncated) {
      this.setState({
        truncated
      });
      if (truncated) { this.truncateRef.onResize(); }
    }
  };

  toggleLines = event => {
    event.preventDefault();
    var _self = this;
    if (this._isMounted) {
      this.setState(
        {
          expanded: !this.state.expanded
        },
        () => {
          if (_self.props.onClick) {
            _self.props.onClick(_self.state.expanded);
          }
        }
      );
    }
  };

  render() {
    const {
      children,
      more,
      less,
      lines,
      anchorClass,
      width,
      keepNewLines
    } = this.props;

    const { expanded, truncated } = this.state;

    return (
      <div>
        <Truncate
          width={width}
          lines={!expanded && lines}
          ellipsis={
            <span>
                            ...{' '}
              <div
                className={anchorClass}
                onClick={this.toggleLines}
                style={{color: '#1890ff'}}
              >
                                {more}
                            </div>
                        </span>
          }
          onTruncate={this.handleTruncate}
          ref={ref => (this.truncateRef = ref)}
        >
          {keepNewLines ?
            children.split('\n').map((line, i, arr) => {
                line = <span key={i}>{line}</span>;

                if (i === arr.length - 1) {
                  return line;
                } else {
                  return [line, <br key={i + 'br'} />];
                }
              }
            )
            : children
          }
        </Truncate>
        {!truncated && expanded && (
          <span>
                        {' '}
            <div
              className={anchorClass}
              onClick={this.toggleLines}
              style={{color: '#1890ff'}}
            >
                            {less}
                        </div>
                    </span>
        )}
      </div>
    );
  }
}

export default ShowMoreText;