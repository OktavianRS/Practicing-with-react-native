/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';
import firebase from 'firebase'


class todoReact extends Component {
	constructor(props) {
		super(props)
		const config = {
			apiKey: "AIzaSyCMxrkL8q_OB-Yxdx_7kpDZ_9fG4-ERSlg",
			authDomain: "native-react-app.firebaseapp.com",
			databaseURL: "https://native-react-app.firebaseio.com",
		};
		
		firebase.initializeApp(config);
		const db = firebase.database();

		this.itemsRef = db.ref('items')

		this.state = {
			newTodo: '',
			todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2})
		}

		this.items = [];
	}

	componentDidMount() {
		this.itemsRef.on('child_added', (dataSnapshot) => {
			this.items.push({id: dataSnapshot.key, text: dataSnapshot.val()})
			this.setState({
				todoSource: this.state.todoSource.cloneWithRows(this.items)
			})
		})
	}

	addTodo() {
		if(this.state.newTodo !== '') {
			this.itemsRef.push({
				todo: this.state.newTodo
			})
			this.setState({
				newTodo: ''
			})
		}
	}

	render() {
		return (
			<View style={styles.appContainer}>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>
						My Todos
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
					<TouchableHighlight 
						style={styles.button}
						onPress={() => this.addTodo()}
						underlayColor='#ddd'>
						<Text style={styles.btnText}>add</Text>
					</TouchableHighlight>
				</View>
				<ListView
					dataSource={this.state.todoSource} 
					renderRow={this.renderRow.bind(this)}/>
			</View>
		)
	}

	renderRow(rowData) {
		return(
			<TouchableHighlight
				underlayColor='#ddd'>
				<View>
					<View style={styles.row}>
						<Text style={styles.todoText}>{rowData.text.todo}</Text>
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
			)
	}

}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

AppRegistry.registerComponent('todoReact', () => todoReact);
