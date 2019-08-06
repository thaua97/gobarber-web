import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-header.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="GoBarber" />
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong>Thauã Borges</strong>
                            <Link to="/profile">Meu Perfil</Link>
                        </div>
                        <img
                            src="https://api.adorable.io/avatars/285/barber@adorable.io.png"
                            alt=""
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
