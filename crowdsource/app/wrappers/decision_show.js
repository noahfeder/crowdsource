import React, {Component} from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import Loading from './loading';
import Decision from '../components/decision';
import TimeLeft from '../components/time_left';
import style from '../public/styles/style';
import { Button, SideMenu } from 'react-native-elements';
import BackButton from '../components/back_button';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/header';
import { MenuGuts } from '../components/side_menu';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class DecisionShow extends Component {

  componentWillMount() {
    this.props.fetchBinary(this.props.binary_id);
  }

  componentDidMount() {
    this.setInterval( () => {
      this.props.fetchBinary(this.props.binary_id);
    }, 1000)
  }

  render() {
    let hue = this.props.color;
    let time;
    if (this.props.loaded) {
      if (!this.props.error) {
        // ALL GOOD
        return (
          <SideMenu menuWidth={120} toggled={this.props.toggled} MenuComponent={MenuGuts}>
            <Header toggleMenu={this.props.toggleMenu.bind(this)} />
            <View style={style.wrapper}>
              <View style={style.decision} >
                <Text style={style.binaryText}>{this.props.binary.name}</Text>
                <Text style={{height: 50}}>{this.props.binary.content}</Text>
                <TimeLeft expiration={this.props.binary.expiration} />
                <LinearGradient
                  start={[0.0,0.0]} end={[1.0,0.0]}
                  locations={[ 0, (this.props.breakPoint - 0.05), (this.props.breakPoint + 0.05), 1 ]}
                  colors={[`hsl(${hue},75%,75%)`,`hsl(${hue},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`]}
                  style={style.binary} />
                <View style={style.options}>
                  <TouchableHighlight activeOpacity={0.2}
                    underlayColor={'rgba(0,0,0,0)'}
                    style={style.option}
                    onPress={ () => {
                        this.props.vote(this.props.binary.id, 1, this.props.user_id);
                    }
                  }>
                    <Text style={style.optionA}>
                      {this.props.binary.choiceA}
                    </Text>
                  </TouchableHighlight>

                  <TouchableHighlight activeOpacity={0.2}
                    underlayColor={'rgba(0,0,0,0)'}
                    style={style.option}
                    onPress={ () =>
                      this.props.vote(this.props.binary.id, 2, this.props.user_id)
                  }>
                    <Text style={style.optionB}>
                      {this.props.binary.choiceB}
                    </Text>
                  </TouchableHighlight>

                </View>
                <BackButton navigator={this.props.navigator} />
              </View>
            </View>
          </SideMenu>
          )
        } else {
          // ERROR MESSAGE
          return (
          <SideMenu menuWidth={120} toggled={this.props.toggled} MenuComponent={MenuGuts}>
            <Header toggleMenu={this.props.toggleMenu.bind(this)} />
            <View style={style.wrapper}>
              <View style={style.decision} >
                <Text style={style.binaryText}>{this.props.binary.name}</Text>
                <Text style={{height: 50}}>{this.props.binary.content}</Text>
                <Text style={[style.textMedium, {height: 50, color: 'red'}]}>{this.props.message}</Text>
                <LinearGradient
                  start={[0.0,0.0]} end={[1.0,0.0]}
                  locations={[ 0, (this.props.breakPoint - 0.05), (this.props.breakPoint + 0.05), 1 ]}
                  colors={[`hsl(${hue},75%,75%)`,`hsl(${hue},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`]}
                  style={style.binary} />
                <View style={style.options}>
                  <View style={style.option}>
                    <Text style={style.optionA}>
                      {this.props.binary.choiceA}
                    </Text>
                  </View>
                  <View style={style.option}>
                    <Text style={style.optionB}>
                      {this.props.binary.choiceB}
                    </Text>
                  </View>
                </View>
                <BackButton navigator={this.props.navigator} />
              </View>
            </View>
          </SideMenu>
          )
        }
      } else {
        return <Loading />
      }
  }
}

reactMixin(DecisionShow.prototype, TimerMixin);

function mapStateToProps(state, ownProps) {
  if (state.activeBinary.data && state.activeBinary.data.binary_id === ownProps.id) {
    return {
      loaded: true,
      binary: state.activeBinary.data,
      breakPoint: (state.activeBinary.data.votesA / (state.activeBinary.data.votesA + state.activeBinary.data.votesB)),
      toggled: state.toggleMenu.toggle,
      error: state.activeBinary.error,
      message: state.activeBinary.message,
      user_id: state.user.id
    }
  } else {
    return {
      loaded: false,
      toggled: state.toggleMenu.toggle
    }
  }
}

export default connect(mapStateToProps)(DecisionShow);
