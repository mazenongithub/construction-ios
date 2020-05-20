import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import combinedReducer from './components/reducers';
import { Provider } from 'react-redux';
import ConstructionApp from './components/constructionapp';
const store = createStore(combinedReducer, {}, applyMiddleware(reduxThunk));

class App extends Component {
render() {
return(<Provider store={store}><ConstructionApp /></Provider>)
}
}
export default App;