import React from 'react';
import {Text} from 'react-native';

export default function DetailsPage({route, navigation}) {
    const {itemId} = route.params;
    return(<Text>details go here, id: {JSON.stringify(itemId)}</Text>)
}
