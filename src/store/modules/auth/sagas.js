import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFail } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const res = yield call(api.post, 'sessions', { email, password });

        const { token, user } = res.data;

        if (!user.provider) {
            toast.error('Usuario não é prestador');
        }

        yield put(signInSuccess(token, user));

        history.push('/dashboard');
    } catch (err) {
        toast.error('Falha na autenticação, verifique seus dados');
        yield put(signFail());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
