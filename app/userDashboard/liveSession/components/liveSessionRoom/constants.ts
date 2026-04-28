import i18n from "@/i18n";
import { RoomTab, RoomUser } from "./types";

export const roomTabs: Array<{ id: RoomTab }> = [
  { id: "chat" },
  { id: "questions" },
  { id: "poll" },
];

export function getCurrentRoomUser(): RoomUser {
  return {
    id: "current-user",
    name: i18n.t("dashboard.roomCurrentUser"),
    avatar: "/profile.jpg",
    role: "student",
  };
}

export const minPollOptions = 2;
export const maxPollOptions = 4;

export function createDefaultPollDraft() {
  return {
    question: "",
    options: ["", ""],
  };
}
