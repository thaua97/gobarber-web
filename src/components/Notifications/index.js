import React, { useState, useEffect } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, Badge, NotificationsList, Scroll, Notification } from './styles';

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function loadNotifications() {
            try {
                const res = await api.get('notifications');

                const data = res.data.map(notification => ({
                    ...notification,
                    timeDistance: formatDistance(parseISO(notification.createdAt), new Date(), {
                        addSuffix: true,
                        locale: pt,
                    }),
                }));

                setNotifications(data);
            } catch (error) {
                toast.error('Não foi possivel se comunicar com o sevidor');
            }
        }

        loadNotifications();
    }, []);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>

            <NotificationsList visible={visible}>
                <Scroll>
                    {notifications.map(notification => (
                        <Notification key={notification._id} unread={!notification.read}>
                            <p>{notification.content}</p>
                            <time>{notification.timeDistance}</time>
                            <button type="button">Marcar como lida</button>
                        </Notification>
                    ))}
                </Scroll>
            </NotificationsList>
        </Container>
    );
}
