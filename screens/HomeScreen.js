import React from 'react';
import { StyleSheet,Text, View,TextInput,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';


export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: "",
            lexicalCategory:'',
            examples: [],
            definition: ""
        }
    }

    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

        return fetch(url).then((data)=>{
            if(data.status === 200){
                return data.json()
            } else {
                return null
            }
        })
        .then((response) => {
            var responseObject = response;

            if(responseObject){
                var wordData= responseObject.definitions[0];
                var definition=wordData.description;
                var lexicalCategory= wordData.wordtype;

                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            } else {
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found",
                })
            }
        })
    }

    render(){
        return(
            <View>
                <Text style={{textAlign:'center', fontSize: 30, fontStyle: 'bold', margin: 3}}> The Online Dictionary</Text>
                <View>
                    <TextInput style={styles.inputBox} onChangeText={text => {
                            this.setState({
                                text:text,
                                isSearchPressed: false,
                                word: "Loading...",
                                lexicalCategory:'',
                                examples: [],
                                definition: ""
                            });
                        }}
                        value={this.state.text}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={() => {
                        this.setState({ isSearchPressed:true });
                        this.getWord(this.state.text);
                    }}>
                        SEARCH
                    </TouchableOpacity>
                </View>

            <View style={{flex: 1,}}>
                <View style={styles.detailsContainer}>
                    <Text style={{marginLeft: 30, fontSize:18}}>
                        Word: {this.state.word} 
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={{marginLeft: 30, fontSize:18}}>
                        Type: {this.state.lexicalCategory}
                    </Text>
                </View>

                <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={{marginLeft: 30, fontSize:18}}>
                        Definition: {this.state.definition}
                    </Text>
                </View>
            </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
    },
    inputBox: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        justifyContent: 'center',
        backgroundColor: "lightgray",
        borderWidth: 6,
        marginTop:60,
        textAlign: 'center',
    },
    inputBoxContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    searchButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
        width: '5%',
        borderWidth: 3,
        textAlign: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'lightblue',
        margin: 7
    }
})