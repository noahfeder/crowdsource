import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'

Reactotron
  .configure()
  .use(trackGlobalErrors())
  .connect()

console.tron = Reactotron
