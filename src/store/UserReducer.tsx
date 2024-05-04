import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    user: string | null;
};

const initialState: UserState = {
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;

// export const userReducer = (state: UserState = initialState, action: Action) : UserState => {
//     switch (action.type) {
//         case 'LOGIN':
//             return {...state, user: action.payload};
//         case 'LOGOUT':
//             return {...state, user: null};
//         default:
//             return state;
//     }
// };

// export default userReducer;