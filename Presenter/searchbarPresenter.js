import resolvePromise from "../resolvePromise"
import SearchbarView from "../Views/searchbarView"
import SearchResultView from "../Views/searchResultView"
import {doPlantSearch} from "../plantSearchApi"
import promiseNoData from "../promiseNoData"
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';
import React from "react"
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity} from 'react-native';

export default function SearchbarPresenter(navigation){
    const model = useContext(ModelContext);
    const [promiseState]= React.useState({});
    const [, reRender]= React.useState(); 
    

    function notifySearch(){ reRender(new Object()); }
    function searchPlant(query){
       resolvePromise(doPlantSearch(query),promiseState, notifySearch);
    }
    function addPlanToModel(item, id){
        model.setPlantInfo(item, id);
    }

    return (
    <View style={{flex: 1, backgroundColor: '#2e8f2e'}}>
        <SearchbarView searchPlant={searchPlant}></SearchbarView>
        
        {promiseNoData(promiseState) || 
            <SearchResultView 
                searchResults={promiseState.data} 
                addPlant={addPlanToModel} 
                devices={model.devices}>
            </SearchResultView>
        }
    </View>
    )
    
    
}