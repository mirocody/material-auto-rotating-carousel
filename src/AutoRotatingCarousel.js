import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Paper, RaisedButton } from 'material-ui'
import { grey700 } from 'material-ui/styles/colors'
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import Dots from 'material-ui-dots'
import Carousel from './SwipableCarouselView'
import { modulo } from './util'

const desktopStyles = {
  carouselWrapper: {
    overflow: 'hidden',
    borderRadius: 14,
    transform: 'scale(1.0)',
    background: 'transparent',
    height: '100%'
  },
  root: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: 1400,
    left: 0,
    top: 0,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  content: {
    width: '60%',
    maxWidth: 700,
    height: 'calc(100% - 96px)',
    maxHeight: 600,
    margin: '-16px auto 0',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  dots: {
    paddingTop: 36,
    margin: '0 auto',
    dotColor: '#fff'
  },
  footer: {
    marginTop: -72,
    width: '100%',
    position: 'relative',
    textAlign: 'center'
  },
  slide: {
    width: '100%',
    height: '100%'
  },
  carousel: {
    height: '100%'
  },
  carouselContainer: {
    height: '100%'
  }
}

export default class AutoRotatingCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (slideIndex) => {
    this.setState({
      slideIndex
    }, this.onChange(slideIndex))
  }

  decreaseIndex () {
    const slideIndex = this.state.slideIndex - 1
    this.setState({
      slideIndex
    }, this.onChange(slideIndex))
  }

  increaseIndex () {
    const slideIndex = this.state.slideIndex + 1
    this.setState({
      slideIndex
    }, this.onChange(slideIndex))
  }

  onChange (slideIndex) {
    if (this.props.onChange) {
      this.props.onChange({ index: modulo(slideIndex, this.props.children.length)})
    }
  }

  render () {
    const style = desktopStyles
    const landscape = this.props.mobile && this.props.landscape

    return (
      <div
        style={{
          ...style.root,
          pointerEvents: this.props.open ? null : 'none',
          opacity: this.props.open ? '1' : '0',
          ...this.props.style
        }}
        onClick={this.props.onRequestClose}
      >
        <div
					id="contentStyle"
					style={{...style.content, ...this.props.contentStyle}}
          onClick={evt => evt.stopPropagation() || evt.preventDefault()}>
          <Paper
						id="carouselWrapperStyle"
            zDepth={this.props.mobile ? 0 : 1}
            style={{...style.carouselWrapper, ...this.props.carouselWrapperStyle}}>
            <Carousel
							id="carouselContainerStyle"
              autoplay={this.props.open && this.props.autoplay}
              interval={this.props.interval}
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
              style={{...style.carousel, ...this.props.carouselStyle}}
              containerStyle={{...style.carouselContainer, ...this.props.carouselContainerStyle}}
              slideStyle={style.slide}
            >
              {this.props.children.map((c, i) => React.cloneElement(c, {
                key: i
              }))}
            </Carousel>
          </Paper>
          <div style={landscape ? {minWidth: 300, maxWidth: 'calc(50% - 48px)', padding: 24, float: 'right'} : null}>
            <div
							style={landscape ? { ...style.footerLandscape, ...this.props.footerStyle } : { ...style.footer, ...this.props.footerStyle }}
							id="footerStyle"
							>
              {this.props.label &&
								<RaisedButton
	                label={this.props.label}
	                onClick={this.props.onStart}
              />}
              <Dots
                count={this.props.children.length}
                index={modulo(this.state.slideIndex, this.props.children.length)}
                style={landscape ? { ...style.dotsLandscape, ...this.props.dotsStyle } : { ...style.dots, ...this.props.dotsStyle }}
                dotColor="#fff"
                onDotClick={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AutoRotatingCarousel.defaultProps = {
  autoplay: true,
  interval: 3000,
  mobile: false,
  open: false,
  hideArrows: false
}

AutoRotatingCarousel.propTypes = {
  /** Override the inline-styles of the arrow icon. */
  arrowIcon: PropTypes.object,
  /** Override the inline-styles of the arrow icon button */
  arrowIconButtonStyle: PropTypes.object,
  /** Override the inline-styles of the left arrow. */
  arrowLeftStyle: PropTypes.object,
  /** Override the inline-styles of the right arrow. */
  arrowRightStyle: PropTypes.object,
  /** If `false`, the auto play behavior is disabled. */
  autoplay: PropTypes.bool,
  /** Override the inline-styles of the carousel container. */
  carouselContainer: PropTypes.object,
  /** Override the inline-styles of the carousel. */
  carouselStyle: PropTypes.object,
  /** Override the inline-styles of the carousel wrapper. */
  carouselWrapperStyle: PropTypes.object,
  /** Override the inline-styles of the content container. */
  contentStyle: PropTypes.object,
  /** Override the inline-styles of the footer dots when not in landscape mode. */
  dotsStyle: PropTypes.object,
  /** Override the inline-styles of the footer when not in landscape mode. */
  footerStyle: PropTypes.object,
  /** Delay between auto play transitions (in ms). */
  interval: PropTypes.number,
  /** Button text. If not supplied, the button will be hidden. */
  label: PropTypes.string,
  /** If `true`, slide will adjust content for wide mobile screens. */
  landscape: PropTypes.bool,
  /** If `true`, the screen width and height is filled. */
  mobile: PropTypes.bool,
  /** Fired when the index changed. Returns current index. */
  onChange: PropTypes.func,
  /** Fired when the gray background of the popup is pressed when it is open. */
  onRequestClose: PropTypes.func,
  /** Fired when the user clicks the getting started button. */
  onStart: PropTypes.func,
  /** Controls whether the AutoRotatingCarousel is opened or not. */
  open: PropTypes.bool,
  /** Override the inline-styles of the root component. */
  style: PropTypes.object,
  /** If `true`, the left and right arrows are hidden in the desktop version. */
  hideArrows: PropTypes.bool
}
