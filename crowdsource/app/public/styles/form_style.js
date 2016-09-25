import { StyleSheet, Dimensions } from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';

const TimeType = t.enums({
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes'
});

export const Binary = t.struct({
  name: t.String,
  content: t.String,
  choiceA: t.String,
  choiceB: t.String,
  number: t.Number,
  type: TimeType,
  id: t.String
});

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
halfStyle.select.normal.width = width / 2 - 20;
halfStyle.select.error.width = width / 2 - 20;

export const formOptions = {
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

