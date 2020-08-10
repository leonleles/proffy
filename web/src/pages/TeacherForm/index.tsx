import React, { useState, useEffect, FormEvent } from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Select from '../../components/Select';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: "", to: "" }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: "",
                to: ""
            }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((item, index) => {
            if (index === position) {
                return { ...item, [field]: value };
            }

            return item;
        });

        setScheduleItems(newArray);
    }

    function randleCreateClass(e: FormEvent) {
        e.preventDefault();

        const newClasses = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        };

        api.post('classes', newClasses).then(() => {
            alert('Cadastro relalizado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro')
        });
    };

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro é preecher o formulário de inscrição"
            />

            <main>
                <form onSubmit={randleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: "Artes" },
                                { value: 'Biologia', label: "Biologia" }
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>


                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => { setScheduleItemValue(index, 'week_day', e.target.value) }}
                                        options={[
                                            { value: '0', label: "Segunda" },
                                            { value: '1', label: "Terça" }
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => { setScheduleItemValue(index, 'from', e.target.value) }}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => { setScheduleItemValue(index, 'to', e.target.value) }}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;