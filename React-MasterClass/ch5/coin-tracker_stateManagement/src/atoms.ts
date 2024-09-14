import { atom } from "recoil";

export const ThemeAtoms = atom({
  key: "isDark", // unique Id (필수)
  default: true, // 기본값
});
