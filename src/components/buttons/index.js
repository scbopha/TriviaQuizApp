import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Platform, TouchableNativeFeedback } from 'react-native'

const isiOS = Platform.OS === 'ios';

export class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      style,
      containerStyle,
      disabled
    } = this.props    

    const attributes = (!isiOS && Platform.Version >= 21) ? [{background: TouchableNativeFeedback.Ripple('grey')}] : []
    if (isiOS) {
      return (
        <TouchableOpacity onPress={this.props.onPress} style={style} disabled={disabled}>
          <View style={{justifyContent:'center', alignItems:'center', height: 40, ...containerStyle}}>
          {this.props.children}
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableNativeFeedback {...attributes} onPress={this.props.onPress} style={style} disabled={disabled}>
          <View style={{justifyContent:'center', alignItems:'center', height: 40, ...containerStyle}}>
          {this.props.children}
          </View>
        </TouchableNativeFeedback>
      )
    }
  }
}

Button.defaultProps = {
  style: {},
  containerStyle: {},
  disabled: false
}

Button.propTypes = {
  style: PropTypes.any,
  containerStyle: PropTypes.any,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
}