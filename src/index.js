import {
  getYear,
  getMonth,
  getDate,
  addSeconds,
  addMilliseconds,
  getHours,
  getMinutes
} from "date-fns";

const defaultMS = 3600000;

function convertToMs(timefloat) {
  let remainder = timefloat % 1;
  let minutes = remainder * 100 * 60 * 1000;
  let hours = (timefloat - remainder) * 60 * 60 * 1000;
  return minutes + hours;
}

const startHours = Math.round(Math.random() * (9 - 7) + 7);
let startMins = Math.round(Math.random() * (60 - 0) + 0);
startMins = startMins < 10 ? `0${startMins}` : startMins;

const thisYear = getYear(new Date());
const thisMonth = getMonth(new Date());
const thisDay = getDate(new Date());

const morningTime = new Date(
  thisYear,
  thisMonth,
  thisDay,
  startHours,
  startMins
);

const halfTime = 15840;

const endOfMorning = addSeconds(morningTime, halfTime);

const lunchTime = Math.random() * (2 - 1) + 0.5;

const lunchTimeInMS = Math.round(convertToMs(lunchTime));

const lunchOvertime = lunchTimeInMS - defaultMS;

const startOfAfternoon = addMilliseconds(endOfMorning, lunchTimeInMS);

const finalTime = halfTime * 1000 + lunchOvertime;

const endOfAfternoon = addMilliseconds(startOfAfternoon, finalTime);

const app = document.getElementById("app");

function getCorrectTime(date) {
  const hours = getHours(date);
  let minutes = getMinutes(date);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
}

app.innerHTML = `
  <div class="times">
    <div class="time">
      <div>Início</div>
      <div>${getCorrectTime(morningTime)}</div>
    </div>
    <div class="time">
      <div>Almoço</div>
      <div>${getCorrectTime(endOfMorning)}</div>
    </div>
    <div class="time">
      <div>Volta almoço</div>
      <div>${getCorrectTime(startOfAfternoon)}</div>
    </div>
    <div class="time">
      <div>Final expediente</div>
      <div>${getCorrectTime(endOfAfternoon)}</div>
    </div>
  </div> 
`;
