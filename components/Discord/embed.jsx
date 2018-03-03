import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { parseAllowLinks, parseEmbedTitle } from './markdown'
import { extractRGB } from './color'


class Link extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children, ...props } = this.props
    return <a target='_blank' rel='noreferrer' {...props}>{children}</a>
  }
}


class EmbedColorPill extends React.Component{
  static propTypes = {
    color: PropTypes.number,
  }

  render() {
    let computed

    if (this.props.color) {
      const c = extractRGB(this.props.color)
      computed = `rgba(${c.r},${c.g},${c.b},1)`
    }

    const style = { backgroundColor: computed !== undefined ? computed : '' }
    return <div className='embed-color-pill' style={style} />
  }
}

const EmbedTitle = ({ title, url }) => {
  if (!title) {
    return null
  }

  let computed = <div className='embed-title'>{parseEmbedTitle(title)}</div>
  if (url) {
    computed = <Link href={url} className='embed-title'>{parseEmbedTitle(title)}</Link>
  }

  return computed
}

class EmbedDescription extends React.Component {
  static propTypes = {
    content: PropTypes.object,
  }

  render() {
    if (!this.props.content) {
      return null
    }

    return <div className='embed-description markup'>{parseAllowLinks(this.props.content)}</div>
  }
}

class EmbedAuthor extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    icon_url: PropTypes.string,
  }

  render() {
    const { name, url, icon_url } = this.props

    if (!name) {
      return null
    }

    let authorName
    if (name) {
      authorName = <span className='embed-author-name'>{name}</span>
      if (url) {
        authorName = <Link href={url} className='embed-author-name'>{name}</Link>
      }
    }

    const authorIcon = icon_url ? (<img src={icon_url} role='presentation' className='embed-author-icon' />) : null

    return <div className='embed-author'>{authorIcon}{authorName}</div>
  }
}

class EmbedField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    inline: PropTypes.bool,
  }

  render() {
    const { name, value, inline } = this.props

    if (!name && !value) {
      return null
    }

    const cls = 'embed-field' + (inline ? ' embed-field-inline' : '')

    const fieldName = name ? (<div className='embed-field-name'>{parseEmbedTitle(name)}</div>) : null
    const fieldValue = value ? (<div className='embed-field-value markup'>{parseAllowLinks(value)}</div>) : null

    return <div className={cls}>{fieldName}{fieldValue}</div>
  }
}

class EmbedThumbnail extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  }

  render() {
    if (!this.props.url) {
      return null
    }

    return (
      <img
        src={this.props.url}
        role='presentation'
        className='embed-rich-thumb'
        style={{ maxWidth: 80, maxHeight: 80 }}
      />
    )
  }
}

class EmbedImage extends React.Component {
  static propTypes = {
    url: PropTypes.string,
  }

  render() {
    if (!this.props.url) {
      return null
    }

    // NOTE: for some reason it's a link in the original DOM
    // not sure if this breaks the styling, probably does
    return <a className='embed-thumbnail embed-thumbnail-rich'><img className='image' role='presentation' src={this.props.url} /></a>
  }
}

class EmbedFooter extends React.Component {
  static propTypes = {
    timestamp: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon_url: PropTypes.string,
  }

  render() {
    const { timestamp, text, icon_url } = this.props

    if (!text && !timestamp) {
      return null
    }

    // pass null, since undefined will make moment(...) return the current date/time
    let time = Moment(timestamp !== undefined ? timestamp : null)
    time = time.isValid() ? time.format('ddd MMM Do, YYYY [at] h:mm A') : null

    const footerText = [text, time].filter(Boolean).join(' | ')
    const footerIcon = text && icon_url ? (
      <img src={icon_url} className='embed-footer-icon' role='presentation' width='20' height='20' />
    ) : null

    return <div>{footerIcon}<span className='embed-footer'>{footerText}</span></div>
  }
}

class EmbedFields extends React.Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
  }

  render() {
    if (!this.props.fields) {
      return null
    }

    return <div className='embed-fields'>{this.props.fields.map((f, i) => <EmbedField key={i} {...f} />)}</div>
  } 
}

class Embed extends React.Component {
  static propTypes = {
    color: PropTypes.number,
    author: PropTypes.object,
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    fields: PropTypes.array,
    thumbnail: PropTypes.object,
    image: PropTypes.object,
    timestamp: PropTypes.string,
    footer: PropTypes.object,
  }
  
  render() {
    const { color, author, title, url, description, fields, thumbnail, image, timestamp, footer } = this.props

    return (
      <div className='accessory'>
        <div className='embed-wrapper'>
          <EmbedColorPill color={color} />
          <div className='embed embed-rich'>
            <div className='embed-content'>
              <div className='embed-content-inner'>
                <EmbedAuthor {...author} />
                <EmbedTitle title={title} url={url} />
                <EmbedDescription content={description} />
                <EmbedFields fields={fields} />
              </div>
              <EmbedThumbnail {...thumbnail} />
            </div>
            <EmbedImage {...image} />
            <EmbedFooter timestamp={timestamp} {...footer} />
          </div>
        </div>
      </div>
    )
  }
}




export default Embed
