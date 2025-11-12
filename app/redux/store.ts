import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/Category/categorySlice";
import departmentReducer from "./features/Department/departmentSlice";
import itemUserReducer from "./features/Item-User/itemUserSlice";
import itemReducer from "./features/Item/itemSlice";
import loginReducer from "./features/auth/authSlice";
import newLoginReducer from "./features/auth/authSliceNew";
import userReducer from "./features/auth/userSlice";
import assignReducer from "./features/assign/assignSlice";
import stockReducer from "./features/Stock/stockSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    departments: departmentReducer,
    itemUsers: itemUserReducer,
    items: itemReducer,
    login: loginReducer,
    loginNew: newLoginReducer,
    user: userReducer,
    assign: assignReducer,
    stocks: stockReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
