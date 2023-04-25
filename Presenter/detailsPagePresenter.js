import React from 'react';
import {Text} from 'react-native';
import { ModelContext } from "../ModelContext";
import { useContext } from 'react';

export default function DetailsPage({route, navigation}) {
    const model = useContext(ModelContext);
    const {itemId} = route.params;
    model.setName("whatever", 1)
    return(<Text>details go here, id: {JSON.stringify(itemId)}</Text>)
}
