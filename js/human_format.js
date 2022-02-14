"use strict";


function startHumanFormat() {
  const dataInput = document.querySelector('#input_sec');
  const dataOutput = document.querySelector('#output_time');

  dataInput.addEventListener('input', () => {
    dataOutput.textContent = formatDuration(dataInput.value);
  });

  function formatDuration(seconds) {
    if (seconds === '') return;
    if (isNaN(seconds) || !seconds.split(' ').join('')) return 'Numbers only';

    seconds = +seconds;

    const minute = 60;
    const hour = 3600;
    const day = 86400;
    const year = 31536000;

    let y = null;
    let d = null;
    let h = null;
    let m = null;
    let s = null;

    let sec = '';
    let mins = '';
    let hrs = '';
    let ds = '';
    let yr = '';

    let resSec = '';
    let resMins = '';
    let resHour = '';
    let resDay = '';

    switch (seconds) {
      // case 0: return 'now';
      case 1: return '1 second';
      case 60: return '1 minute';
      case 3600: return '1 hour';
      case 86400: return '1 day';
      case 31536000: return '1 year';
    }

    //.........seconds.........//
    if (seconds < minute) {
      return `${seconds} seconds`;
    }

    //.........minuts and seconds.........//
    if (seconds > minute && seconds < hour) {
      m = Math.trunc(seconds / minute);
      s = seconds - m * minute;

      checkPlural();
      checkExistence();

      return `${m} ${mins}${resSec}`;
    }

    //........hours, minuts and seconds.......//
    if (seconds > hour && seconds < day) {
      h = Math.trunc(seconds / hour);
      m = Math.trunc((seconds - h * hour) / minute);
      s = seconds - h * hour - m * minute;

      checkPlural();
      checkExistence();

      return `${h} ${hrs}${resMins}${resSec}`;
    }

    //........days, hours, minuts and seconds.......//
    if (seconds > day && seconds < year) {
      d = Math.trunc(seconds / day);
      h = Math.trunc((seconds - d * day) / hour);
      m = Math.trunc((seconds - d * day - h * hour) / minute);
      s = (seconds - d * day - h * hour - m * minute);

      checkPlural();
      checkExistence();

      return `${d} ${ds}${resHour}${resMins}${resSec}`;
    }

    //........years, days, hours, minuts and seconds.......//
    if (seconds > year) {
      y = Math.trunc(seconds / year);
      d = Math.trunc((seconds - y * year) / day);
      h = Math.trunc((seconds - y * year - d * day) / hour);
      m = Math.trunc((seconds - y * year - d * day - h * hour) / minute);
      s = seconds - y * year - d * day - h * hour - m * minute;

      checkPlural();
      checkExistence();

      return `${y} ${yr}${resDay}${resHour}${resMins}${resSec}`;
    }

    function checkExistence() {
      if (s) resSec = ` and ${s} ${sec}`;
      if (m) resMins = `, ${m} ${mins}`;
      if (h) resHour = `, ${h} ${hrs}`;
      if (d) resDay = `, ${d} ${ds}`;
      if (m && !s) resMins = ` and ${m} ${mins}`;
      if (h && !m && !s) resHour = ` and ${h} ${hrs}`;
      if (d && !h && !m && !s) resDay = ` and ${d} ${ds}`;
    }

    function checkPlural() {
      y === 1 ? yr = "year" : yr = "years";
      d === 1 ? ds = "day" : ds = "days";
      h === 1 ? hrs = "hour" : hrs = "hours";
      m === 1 ? mins = "minute" : mins = "minutes";
      s === 1 ? sec = "second" : sec = "seconds";
    }
  }
}
