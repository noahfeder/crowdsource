import React, { Component } from 'react';
import style from '../public/styles/style';
import { Button } from 'react-native-elements';
import { TouchableHighlight, View, Text, Dimensions } from 'react-native';
import BackButton from '../components/back_button';
import { connect } from 'react-redux';
import Header from '../components/header';
import Loading from './loading';
import t from 'tcomb-form-native';
import { Binary, formOptions } from '../public/styles/form_style'

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

      const Value = {
        id: this.props.id,
        type: 'hours'
      }


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
