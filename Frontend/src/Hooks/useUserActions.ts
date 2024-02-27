import { useAppDispatch } from "./store";
import { setUserAction, clearUser } from "../Store/User/slice";
import type { User } from "../Types/types.d";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const setUser = (user: User) => {
        dispatch(setUserAction(user));
    };

    const logout = () => {
        dispatch(clearUser());
    };

    return { setUser, logout };
};
