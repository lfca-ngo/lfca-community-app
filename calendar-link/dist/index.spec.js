"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const index_1 = require("./index");
const utils_1 = require("./utils");
describe("Calendar Links", () => {
    describe("Google", () => {
        test("generate a google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
            };
            const link = index_1.google(event);
            const sTime = dayjs_1.default(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = dayjs_1.default(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate a google link with time & timezone", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29T12:00:00.000+01:00",
                duration: [2, "hour"],
            };
            const link = index_1.google(event);
            const sTime = dayjs_1.default(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = dayjs_1.default(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate an all day google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
            };
            const link = index_1.google(event);
            const sTime = dayjs_1.default(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = dayjs_1.default(event.start).add(1, "day").utc().format(utils_1.TimeFormats.allDay);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate a multi day google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                end: "2020-01-12",
                allDay: true,
            };
            const link = index_1.google(event);
            const sTime = dayjs_1.default(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = dayjs_1.default(event.end).utc().format(utils_1.TimeFormats.allDay);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate a recurring google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
                rRule: "FREQ=YEARLY;INTERVAL=1"
            };
            const link = index_1.google(event);
            const sTime = dayjs_1.default(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = dayjs_1.default(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&recur=RRULE%3AFREQ%3DYEARLY%3BINTERVAL%3D1&text=Birthday%20party`);
        });
        test("generate a google link with guests", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
                guests: ["hello@example.com", "another@example.com"],
            };
            const link = index_1.google(event);
            const sTime = dayjs_1.default(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = dayjs_1.default(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            const expectedGuests = encodeURIComponent(event.guests ? event.guests.join() : "");
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&add=${expectedGuests}&dates=${expectedDates}&text=Birthday%20party`);
        });
    });
});
//# sourceMappingURL=index.spec.js.map