import React, {useState} from "react";
import {ScrollView, Text, View} from "react-native";
import PageHeader from "../../components/PageHeader";
import AsyncStorage from "@react-native-community/async-storage";
import {useFocusEffect} from "@react-navigation/native";

import TeacherItem, {Teacher} from "../../components/TeacherItem";

import styles from './styles';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites () {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title='Meus Proffys favoritos' />

            <ScrollView
                style={styles.favoriteslist}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    );
                })}

                {favorites.length === 0 && <Text>Nenhum resultado.</Text>}
            </ScrollView>
        </View>
    );
}

export default Favorites;