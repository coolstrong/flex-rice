import { TitleText } from "../utils/helpers.js";

const SATURDAY = 6;
const SUNDAY = 7;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;

const FuzzyDay = () =>
    TitleText({
        title: "",
        text: "",
        titleClass: "wd-fuzzy-day-text",
        textClass: "wd-fuzzy-day-icon",
        boxClass: "wd-fuzzy-day-box",
        titleXalign: 0, // local === "RTL" ? 0 : 1,
        textXalign: 0, // local === "RTL" ? 0 : 1,
        vertical: false,
    });

const TimeNow = () =>
    Widget.Label({
        className: "wd-time-now",
        xalign: 0, // local === "RTL" ? 0 : 1,
    });

const FuzzyTime = () =>
    TitleText({
        title: "",
        text: "",
        titleClass: "wd-fuzzy-time-text",
        textClass: "wd-fuzzy-time-icon",
        boxClass: "wd-fuzzy-time-box",
        titleXalign: 0, // local === "RTL" ? 0 : 1,
        textXalign: 0, // local === "RTL" ? 0 : 1,
        vertical: false,
    });

export default (className) =>
    Widget.Box({
        className: className || "wd-fuzzy-clock-box",
        vertical: true,
        children: [FuzzyDay(), TimeNow(), FuzzyTime()],
    }).poll(15 * 1000 * 60, (box) => {
        Utils.execAsync(["date", "+%u|%-k"])
            .then((val) => {
                const date = val.split("|");
                const day = date[0];
                let hour = date[1];

                let usedFuzzyDay = box.children[0];
                let usedTimeNow = box.children[1];
                let usedFuzzyTime = box.children[2];

                if (day == SATURDAY) {
                    usedFuzzyDay.children[0].label = "Welcome to a new day,";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label =
                        "Saturday is the beginning of new adventures.";
                } else if (day == SUNDAY) {
                    usedFuzzyDay.children[0].label =
                        "Sunday is a new opportunity";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label = "Keep striving towards your goals.";
                } else if (day == MONDAY) {
                    usedFuzzyDay.children[0].label = "Light session today";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label =
                        "Enjoy the moment of rest and prepare for the days ahead.";
                } else if (day == TUESDAY) {
                    usedFuzzyDay.children[0].label = "Half the week has come";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label = "Maintain the momentum and positivity.";
                } else if (day == WEDNESDAY) {
                    usedFuzzyDay.children[0].label = "Only two days left";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label = "Enjoy challenges and do your best.";
                } else if (day == THURSDAY) {
                    usedFuzzyDay.children[0].label = "Welcome, Thursday";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label = "Time to enjoy the efforts.";
                } else if (day == FRIDAY) {
                    usedFuzzyDay.children[0].label = "Friday";
                    usedFuzzyDay.children[1].label = "";
                    usedTimeNow.label =
                        "Fun and relaxation, enjoy the quiet moments.";
                }

                if (hour >= 0 && hour < 4) {
                    usedFuzzyTime.children[0].label =
                        "Time to code, time to create";
                    // usedFuzzyTime.children[1].label = "";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 4 && hour < 9) {
                    usedFuzzyTime.children[0].label =
                        "Good morning! A fresh start to a day full of opportunities";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 9 && hour < 12) {
                    usedFuzzyTime.children[0].label =
                        "The morning has come, let the achievements begin";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 12 && hour < 15) {
                    usedFuzzyTime.children[0].label =
                        "Its lunch time, rest up and get ready for round two";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 15 && hour < 16) {
                    usedFuzzyTime.children[0].label =
                        "Enjoy a cup of tea and relax with a light book";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 16 && hour < 18) {
                    usedFuzzyTime.children[0].label =
                        "Its time for creativity, passion and light work awaits you";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 18 && hour < 21) {
                    usedFuzzyTime.children[0].label =
                        "Dinner is ready, enjoy your time with your loved ones";
                    usedFuzzyTime.children[1].label = "";
                } else if (hour >= 21) {
                    usedFuzzyTime.children[0].label =
                        "Good night! Relax and prepare for a new tomorrow";
                    usedFuzzyTime.children[1].label = "";
                }

                // usedTimeNow.label = createFuzzyHour();
            })
            .catch(print);
    });

// export default clock = FuzzyClock();

function createFuzzyHour() {
    const now = new Date();
    const hours = now.getHours();
    // const timeOfDay = hours >= 12 ? "evening" : "A.M";
    let timeOfDay = "";

    if (hours >= 15) {
        timeOfDay = "evening";
    } else if (hours >= 12) {
        timeOfDay = "Noon";
    } else if (hours >= 6) {
        timeOfDay = "A.M";
    } else if (hours >= 4) {
        timeOfDay = "At dawn";
    } else if (hours > 0) {
        timeOfDay = "After midnight";
    }

    const arabicNumbers = [
        "One",
        "the second",
        "Third",
        "Fourth",
        "Fifth",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "tenth",
        "eleventh",
        "Twelfth",
    ];

    let timeInArabicWords = "The time is now ";

    if (hours === 0) {
        timeInArabicWords += "Twelve oclock at night";
    } else if (hours === 12) {
        timeInArabicWords += "Twelve noon";
    } else {
        timeInArabicWords += arabicNumbers[(hours % 12) - 1] + " " + timeOfDay;
    }

    return timeInArabicWords;
}
