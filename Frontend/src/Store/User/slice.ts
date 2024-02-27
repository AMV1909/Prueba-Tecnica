import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/types.d";

const initialState: User = {
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "Default",
    createdAt: "",
    updatedAt: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserAction: (_, action: PayloadAction<User>) => {
            return { ...action.payload };
        },

        clearUser: () => {
            localStorage.removeItem("token");

            return { ...initialState };
        },
    },
});

export const { setUserAction, clearUser } = userSlice.actions;
export default userSlice.reducer;
