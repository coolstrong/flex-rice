import prayerService from '../services/PrayerTimesService.js';
import { local, TitleText } from '../utils/helpers.js';
import { Widget } from '../utils/imports.js';

const MenuRevealer = () => {
  const header = TitleText({
    title: 'Prayer times',
    text: '',
    titleClass: 'prayer-times-menu-header-title',
    textClass: 'prayer-times-menu-header-icon',
    vertical: false,
    boxClass: 'prayer-times-menu-header',
    titleXalign: 0,
  });

  const fajr = TitleText({
    title: 'Al-fajr prayer',
    text: '',
    vertical: false,
    boxClass: 'prayer-time-item-box-class',
    spacing: 25,
    titleXalign: 0,
  });

  const dhuhr = TitleText({
    title: 'Salat Aduher',
    text: '',
    vertical: false,
    boxClass: 'prayer-time-item-box-class',
    spacing: 25,
    titleXalign: 0,
  });

  const asr = TitleText({
    title: 'Asr prayer',
    text: '',
    vertical: false,
    boxClass: 'prayer-time-item-box-class',
    spacing: 25,
    titleXalign: 0,
  });

  const maghrib = TitleText({
    title: 'Maghrebs prayer',
    text: '',
    vertical: false,
    boxClass: 'prayer-time-item-box-class',
    spacing: 14,
    titleXalign: 0,
  });

  const isha = TitleText({
    title: 'eshaa pray',
    text: '',
    vertical: false,
    boxClass: 'prayer-time-item-box-class isha-item',
    spacing: 17,
    titleXalign: 0,
  });

  return Widget.Revealer({
    transition: 'slide_down',
    child: Widget.Box({
      className: 'prayer-times-menu-box',
      vertical: true,
      children: [header, fajr, dhuhr, asr, maghrib, isha],
    }).hook(prayerService, (box) => {
      const nextPrayer = prayerService.nextPrayerName;

      box.children[1].children[1].label = `${prayerService.fajr}`;
      box.children[2].children[1].label = `${prayerService.dhuhr}`;
      box.children[3].children[1].label = `${prayerService.asr}`;
      box.children[4].children[1].label = `${prayerService.maghrib}`;
      box.children[5].children[1].label = `${prayerService.isha}`;

      if (nextPrayer === 'Daybreak') {
        updateClasses(box, 1);
      } else if (nextPrayer === 'noon') {
        updateClasses(box, 2);
      } else if (nextPrayer === 'age') {
        updateClasses(box, 3);
      } else if (nextPrayer === 'Morocco') {
        updateClasses(box, 4);
      } else if (nextPrayer === 'dinner') {
        updateClasses(box, 5);
      }
    }),
  });
};

function updateClasses(box, selected) {
  box.children[1].className = `prayer-time-item-box-class`;
  box.children[2].className = `prayer-time-item-box-class`;
  box.children[3].className = `prayer-time-item-box-class`;
  box.children[4].className = `prayer-time-item-box-class`;
  box.children[5].className = `prayer-time-item-box-class`;

  var isha = '';
  if (selected === 5) {
    isha = 'isha-item';
  }

  box.children[
    selected
  ].className = `prayer-time-item-box-class next-prayer ${isha}`;
}

const menuRevealer = MenuRevealer();

export const PrayerTimesMenu = () =>
  Widget.Window({
    name: `prayer_times_menu`,
    margins: [6, 510],
    anchor: ['top', local === 'RTL' ? 'right' : 'left'],
    child: Widget.Box({
      css: `
            min-height: 2px;
        `,
      children: [menuRevealer],
    }),
  });

globalThis.showPrayerTimesMenu = () => {
  menuRevealer.revealChild = !menuRevealer.revealChild;
};
