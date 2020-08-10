import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const searchTerms = {
            subject,
            week_day,
            time
        };

        const response = await api.get('/classes', {
            params: searchTerms
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form action="" id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: "Artes" },
                            { value: 'Biologia', label: "Biologia" }
                        ]}
                    />

                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => setWeek_day(e.target.value)}
                        options={[
                            { value: '0', label: "Segunda" },
                            { value: '1', label: "Terça" }
                        ]}
                    />
                    <Input
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value);
                        }}
                        name="time"
                        type="time"
                        label="Hora"
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                        key={Number(teacher.id)}
                        teacher={teacher}
                    />
                })}
            </main>
        </div>
    )
}

export default TeacherList;