import React, { Component } from 'react';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';
import { TouchableHighlight, View, Text, Dimensions } from 'react-native';
import BackButton from '../components/back_button';
import { connect } from 'react-redux';
import Header from '../components/header';
import Loading from './loading';
import t from 'tcomb-form-native';
import _ from 'lodash';

class DecisionNew extends Component {

  onSubmit() {
    let val = this.refs.form.getValue()
    fetch('https://crowdsourcehelp.herokuapp.com/binaries', {
      method: 'POST',
      body: JSON.stringify(val)
    }).then( response => response.json() )
      .then( json => {
        console.log(json)
        this.props.navigator.replace({
          name: 'show',
          id: json.id,
          color: Math.floor(Math.random() * 360)
        })
      })
      .catch( error => console.error(error))
  }

  render() {
    if (this.props.loaded) {
      let Form = t.form.Form;

      const TimeType = t.enums({
        day: 'Days',
        hours: 'Hours',
        minutes: 'Minutes'
      });

      const Binary = t.struct({
        name: t.String,
        content: t.String,
        choiceA: t.String,
        choiceB: t.String,
        number: t.Number,
        type: TimeType,
        id: t.String
      });

      const Value = {id: this.props.id, type: 'hours'}

      let { height, width } = Dimensions.get('window');

      const halfStyle = _.cloneDeep(t.form.Form.stylesheet);
      const newStyle = _.cloneDeep(t.form.Form.stylesheet);
      const tallStyle = _.cloneDeep(t.form.Form.stylesheet);

      tallStyle.textbox.normal.height = 100;
      tallStyle.textbox.error.height = 100;
      tallStyle.textbox.normal.width = width - 20;
      tallStyle.textbox.error.width = width - 20;
      tallStyle.textbox.normal.margin = 10
      tallStyle.textbox.error.margin = 10

      newStyle.fieldset = {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
      }
      newStyle.textbox.normal.width = width - 20;
      newStyle.textbox.error.width = width - 20;
      newStyle.textbox.normal.margin = 10
      newStyle.textbox.error.margin = 10

      halfStyle.textbox.normal.width = width / 2 - 20;
      halfStyle.textbox.error.width = width / 2 - 20;
      halfStyle.pickerTouchable.normal.width = width / 2 - 20;
      halfStyle.pickerTouchable.error.width = width / 2 - 20;



      console.log(halfStyle)

      const formOptions = {
        stylesheet: newStyle,
        auto: 'placeholders',
        fields: {
          id: {
            hidden: true
          },
          name: {
            autoCapitalize: 'words',
            autoCorrect: true,
            returnKeyType: 'next',
            maxLength: 32
          },
          content: {
            multiline: true,
            autoCapitalize: 'sentences',
            autoCorrect: true,
            returnKeyType: 'next',
            stylesheet: tallStyle
          },
          choiceA: {
            autoCapitalize: 'words',
            maxLength: 16,
            placeholder: 'Choice A',
            stylesheet: halfStyle
          },
          choiceB: {
            autoCapitalize: 'words',
            maxLength: 16,
            placeholder: 'Choice B',
            stylesheet: halfStyle
          },
          type: {
            stylesheet: halfStyle
          },
          number: {
            stylesheet: halfStyle
          }
        }
      };

      return (
        <View style={style.wrapper}>
          <Header />
          <Form
            ref="form"
            type={Binary}
            value={Value}
            options={formOptions}
          />
          <Button backgroundColor="#2F8"
            small raised title='SUBMIT'
            onPress={this.onSubmit.bind(this)}
          />
          <BackButton navigator={this.props.navigator} />
        </View>
      )
    } else {
      return <Loading />
    }

  }
}

function mapStateToProps(state) {
  if (state.user) {
    return {
      loaded: true,
      id: state.user.id
    };
  } else {
    return {
      loaded: false
    };
  }
}

export default connect(mapStateToProps)(DecisionNew);
