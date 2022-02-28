import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text,FlatList } from 'react-native';
import * as Contacts from 'expo-contacts'

const MainScreen = () => {
    const [contacts, setContacts] = useState();
    useEffect(()=>{
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data);
                    console.log(contacts);
                }
            }
        })();
    },[])
    return (
        <FlatList
            style={{width:'100%',padding: 20, marginTop:10}}
            data={contacts}
            keyExtractor={item => item.id}
            renderItem={({item})=>{
                return <View style={{borderBottomWidth: 2}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                        <Text style={{fontSize:17}}>{item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}</Text>
                </View>
            }}
        >

        </FlatList>
    );
};

export default MainScreen;
