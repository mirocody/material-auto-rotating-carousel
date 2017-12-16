import React from 'react'
import PropTypes from 'prop-types'
import { blue500, blue700 } from 'material-ui/styles/colors'

const styles = {
  desktop: {
    root: {
      color: 'white',
      height: '100%'
    },
    media: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    mediaBackground: {
      backgroundColor: 'none',
      height: '100%',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '18px',
      margin: 0
    },
    text: {
      textAlign: 'center',
      maxWidth: '80%',
      margin: '0 auto',
      paddingTop: 32
    },
    title: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
      marginBottom: 12,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  }
}

export default function Slide (props) {
  const {
    contentStyle,
    media,
    mediaBackgroundStyle,
    mediaStyle,
    subtitle,
    subtitleStyle,
    textStyle,
    title,
    titleStyle,
    mobile,
    landscape
  } = props

  const style = styles.desktop

  return (
    <div style={{...style.root, ...contentStyle}}>
      <div style={{...style.mediaBackground, ...mediaBackgroundStyle}}>
        <div style={{...style.text, ...textStyle}}>
          <div style={{...style.title, ...titleStyle}}>
            {title}
          </div>
          <p style={{...style.subtitle, ...subtitleStyle}}>
            {subtitle}
          </p>
        </div>
      </div>

    </div>
  )
}

Slide.propTypes = {
  /** Override the inline-styles of the content. */
  contentStyle: PropTypes.object,
  /** Object to display in the upper half. */
  media: PropTypes.node.isRequired,
  /** Override the inline-styles of the media container. */
  mediaBackgroundStyle: PropTypes.object,
  /** Override the inline-styles of the media. */
  mediaStyle: PropTypes.object,
  /** Subtitle of the slide. */
  subtitle: PropTypes.string.isRequired,
  /** Override the inline-styles of the subtitle. */
  subtitleStyle: PropTypes.object,
  /** Override the inline-styles of the text container. */
  textStyle: PropTypes.object,
  /** Title of the slide. */
  title: PropTypes.string.isRequired,
  /** Override the inline-styles of the title. */
  titleStyle: PropTypes.object,
  /**
   * If `true`, the screen width and height is filled.
   * @ignore
   */
  mobile: PropTypes.bool,
  /**
   * If `true`, slide will adjust content for wide mobile screens.
   * @ignore
   */
  landscape: PropTypes.bool
}
