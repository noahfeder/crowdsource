import React, {Component} from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import Header from '../components/header';
import Decision from '../components/decision';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';
import BackButton from '../components/back_button';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class DecisionShow extends Component {

  render() {
    let hue = this.props.color;
    return (
      <View style={style.wrapper}>
        <Header />
        <Text style={{height: 50}}>{this.props.binary.content}</Text>

        <View style={style.decision} >

        <Text style={style.binaryText}>{this.props.binary.name}</Text>

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
                this.props.vote(this.props.binary.id, 'A');
                this.forceUpdate();
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
              this.props.vote(this.props.binary.id, 'B')
          }>
            <Text style={style.optionB}>
              {this.props.binary.choiceB}
            </Text>
          </TouchableHighlight>

        </View>
      </View>

        <BackButton navigator={this.props.navigator} />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let activeBinary = state.activeBinary.data || state.binaries.items[ownProps.id];
  return {
    binary: activeBinary,
    breakPoint: (activeBinary.votesA / (activeBinary.votesA + activeBinary.votesB))
  };
}

export default connect(mapStateToProps)(DecisionShow);
