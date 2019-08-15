import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

function Dashboard() {
    const [date, setDate] = useState(new Date());

    const dateFormatt = useMemo(() => format(date, "d 'de' MMMM", { locale: pt }), [date]);

    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevDay}>
                    <MdChevronLeft size={36} color="#fff" />
                </button>
                <strong>{dateFormatt}</strong>
                <button type="button" onClick={handleNextDay}>
                    <MdChevronRight size={36} color="#fff" />
                </button>
            </header>

            <ul>
                <Time past>
                    <strong>08:00</strong>
                    <span>Thauã Borges</span>
                </Time>
                <Time avilable>
                    <strong>09:00</strong>
                    <span>em aberto</span>
                </Time>
                <Time>
                    <strong>10:00</strong>
                    <span>Thauã Borges</span>
                </Time>
            </ul>
        </Container>
    );
}

export default Dashboard;
