import styled, { css } from 'styled-components';

export const Container = styled.div`
    position: relative;
`;
export const Badge = styled.button`
    background: none;
    border: none;
    position: relative;

    ${props =>
        props.hasUnread &&
        css`
            &::after {
                position: absolute;
                right: 0;
                top: 0;
                width: 10px;
                height: 10px;
                background: #ff892e;
                content: '';
                border-radius: 50%;
            }
        `}
`;

export const NotificationsList = styled.div`
    position: absolute;
    width: 260px;
    left: calc(50% - 130px);
    top: calc(100% + 30px);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    padding: 20px;

    &::before {
        content: '';
        position: absolute;
        left: calc(50% - 20px);
        top: -20px;
        width: 0px;
        height: 0px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid rgba(0, 0, 0, 0.6);
    }
`;
export const Notification = styled.div``;
