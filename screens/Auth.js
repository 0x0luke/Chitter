import {AsyncStorage} from "react-native";

export const AuthKey = "";

export const Authenticated = () => AsyncStorage.setItem(AuthKey, "true");

export const Unauthenticated = () => AsyncStorage.removeItem(AuthKey);