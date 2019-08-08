import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { updateProfileSuccess, updateProfailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;

        const profile = Object.assign({ name, email }, rest.oldPassword ? rest : {});

        const res = yield call(api.put, 'users', profile);

        toast.success('Perfil atualizado com sucesso!');

        yield put(updateProfileSuccess(res.data));
    } catch (err) {
        toast.error('Não foi possivel alterar o perfil!');
        yield put(updateProfailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
