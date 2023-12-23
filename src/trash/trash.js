startTime();

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  // let s = today.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";

  m = checkTime(m);
  // s = checkTime(s);
  currentTimeEl.innerHTML = h + "." + m + " " + ampm;
  setTimeout(startTime, 1000);

  const greetingTime = h;

  if (greetingTime >= 0 && greetingTime < 12) {
    greetingEl.textContent = "Good Morning";
  } else if (greetingTime >= 12 && greetingTime < 18) {
    greetingEl.textContent = "Good Afternoon";
  } else if (greetingTime >= 18 && greetingTime < 24) {
    greetingEl.textContent = "Good Evening";
  }
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
