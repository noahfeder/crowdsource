import React, {Component} from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import Router from 'react-native-simple-router';
import Header from '../components/header';
import Decision from '../components/decision';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class DecisionShow extends Component {
  render() {
    let hue = this.props.color;
    return (
      <View style={style.wrapper}>
        <Header />
        <Text style={{height: 50}}>{this.props.binary.description}</Text>

        <View style={style.decision} >

        <Text style={style.binaryText}>{this.props.binary.name}</Text>

        <LinearGradient
            start={[0.0,0.0]} end={[1.0,0.0]}
            locations={[ 0, (this.props.breakPoint - 0.05), (this.props.breakPoint + 0.05), 1 ]}
            colors={[`hsl(${hue},75%,75%)`,`hsl(${hue},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`,`hsl(${(hue + 60) % 360},75%,75%)`]}
            style={style.binary} />

        <View style={style.options}>

          <TouchableHighlight style={style.option}
            onPress={ () => {
                this.props.vote(this.props.binary.id, 'A');
                this.forceUpdate();
            }
          }>
            <Text style={style.optionA}>
              {this.props.binary.choiceA}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight  style={style.option}
            onPress={ () =>
              this.props.vote(this.props.binary.id, 'B')
          }>
            <Text style={style.optionB}>
              {this.props.binary.choiceB}
            </Text>
          </TouchableHighlight>

        </View>
      </View>

        <Button onPress={ () => this.props.navigator.pop() }
          backgroundColor="#f20"
          small raised title='BACK' />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    binary: state.binaries.items[ownProps.id],
    breakPoint: (state.binaries.items[ownProps.id].votesA / (state.binaries.items[ownProps.id].votesA + state.binaries.items[ownProps.id].votesB))
  };
}

export default connect(mapStateToProps)(DecisionShow);
