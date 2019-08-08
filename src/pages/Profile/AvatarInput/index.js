import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
    const { defaultValue, registerField } = useField('avatar');

    const [file, setFile] = useState(defaultValue && defaultValue.id);
    const [preview, setPreview] = useState(defaultValue && defaultValue.url);

    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            registerField({
                name: 'avatar_id',
                ref: ref.current,
                path: 'dataset.file',
            });
        }
    }, [ref, registerField]);

    async function handleChange(e) {
        try {
            const data = new FormData();

            data.append('file', e.target.files[0]);

            const res = await api.post('files', data);

            const { id, url } = res.data;

            setFile(id);
            setPreview(url);
        } catch (error) {
            toast.error('Não foi possivle anexar a imagem, verifique o arquivo!');
        }
    }

    return (
        <Container>
            <label htmlFor="avatar">
                <img
                    src={preview || 'https://api.adorable.io/avatars/barber@adorable.io.png'}
                    alt="avatar"
                />

                <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
            </label>
        </Container>
    );
}
