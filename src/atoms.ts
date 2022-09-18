import { atom } from "recoil";

export const indexAtom = atom({
  key: "index",
  default: 0,
});

export const toggleLeavingAtom = atom({
    key: "toggleLeaving",
    default: false,
  });