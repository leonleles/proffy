import React, {useState} from "react";
import {View, ScrollView, Text, TextInput} from "react-native";
import PageHeader from "../../components/PageHeader";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons';
import api from "../../services/api";
import AsyncStorage from '@react-native-community/async-storage';

import TeacherItem, {Teacher} from "../../components/TeacherItem";

import styles from './styles';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites () {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToogleFilter() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFilterSubmit() {
        loadFavorites();

        const searchTerms = {
            subject,
            week_day,
            time
        };

        const response = await api.get('/classes', {
            params: searchTerms
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title='Proffys disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToogleFilter}>
                        <Feather name="filter" size={20} color="#fff"/>
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => {
                                setSubject(text)
                            }}
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc'
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => {
                                        setWeek_day(text)
                                    }}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => {
                                        setTime(text)
                                    }}
                                    placeholder='Qual o horário?'
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherlist}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
                
                {teachers.length === 0 && <Text>Nenhum resultado.</Text>}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;