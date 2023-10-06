import { StyleSheet } from "react-native";
import { myColors } from "./colors";

export const Styles = StyleSheet.create({
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 36, 
        backgroundColor: myColors.orange,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: myColors.btnDark,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: myColors.white,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: myColors.btnGray,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnZeroLight: {
        flex: 1,
        width: '100%',
        height: '41%',
        borderRadius: 36,
        backgroundColor: myColors.white,
        justifyContent: "center",
        alignItems: "stretch",
        margin: 8,
    },
    btnZeroDark: {
        flex: 1,
        width: '100%',
        height: '41%',
        borderRadius: 36,
        backgroundColor: myColors.btnDark,
        justifyContent: "center",
        alignItems: "stretch",
        margin: 8,
    },
    selectedOperation: {
        width: 72,
        height: 72,
        borderRadius: 36, 
        backgroundColor: myColors.ligthGray,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    smallTextLight: {
        fontSize: 35,
        color: myColors.white,
    },
    smallTextDark: {
        fontSize: 35,
        color: myColors.black,
    },
    // Keyboard
    row: {
        maxWidth: '100%',
        flexDirection: "row",
    },
    viewBottom: {
        position: 'absolute',
        bottom: 50,
    },
});
