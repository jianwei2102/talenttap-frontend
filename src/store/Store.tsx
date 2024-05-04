import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer.tsx";

export const store = configureStore({
    reducer: {
        users: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// export const store = configureStore(userReducer);

// const store = configureStore({
//     reducer: {
//         posts: postsReducer,
//         comments: commentsReducer,
//         users: usersReducer,
//     },
// })