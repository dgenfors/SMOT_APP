import resolvePromise from "../resolvePromise"
import SearchbarView from "../Views/searchbarView"
import SearchResultView from "../Views/searchResultView"
import {doPlantSearch} from "../plantSearchApi"
import promiseNoData from "../promiseNoData"
import React from "react"
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity} from 'react-native';

export default function SearchbarPresenter(navigation){
    const [promiseState]= React.useState({});
    const [, reRender]= React.useState(); 


    function notifySearch(){ reRender(new Object()); }
    function searchPlant(query){
       resolvePromise(doPlantSearch(query),promiseState, notifySearch);
    }

        return (<View><SearchbarView
            searchPlant={searchPlant}>
        </SearchbarView>
        {promiseNoData(promiseState) || <SearchResultView searchResults={promiseState.data}></SearchResultView>}</View>)
    
    
}