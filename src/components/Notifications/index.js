import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, Badge, NotificationsList, Scroll, Notification } from './styles';

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const hasUnread = useMemo(
        () => !!notifications.find(notification => notification.read === false),
        [notifications],
    );

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

    async function handleMarkAsRead(id) {
        try {
            await api.put(`notifications/${id}`);

            setNotifications(
                notifications.map(notification =>
                    notification._id === id ? { ...notification, read: true } : notification,
                ),
            );
        } catch (error) {
            toast.error('Não foi possivel se comunicar com o sevidor');
        }
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>

            <NotificationsList visible={visible}>
                <Scroll>
                    {notifications !== null ? (
                        notifications.map(notification => (
                            <Notification key={notification._id} unread={!notification.read}>
                                <p>{notification.content}</p>
                                <time>{notification.timeDistance}</time>
                                {!notification.read && (
                                    <button
                                        type="button"
                                        onClick={() => handleMarkAsRead(notification._id)}
                                    >
                                        Marcar como lida
                                    </button>
                                )}
                            </Notification>
                        ))
                    ) : (
                        <p>Nenhuma notificação!</p>
                    )}
                </Scroll>
            </NotificationsList>
        </Container>
    );
}
