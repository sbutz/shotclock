const beep = new Audio(process.env.PUBLIC_URL + "/shotclock.mp3");
const beep5s = new Audio(process.env.PUBLIC_URL + "/shotclock_5s.mp3");
const time = new Audio(process.env.PUBLIC_URL + "/time.mp3");

export function startBeep() {
  beep5s.play();
}

export function stopBeep() {
  beep5s.pause();
  beep5s.currentTime = 0;
}

async function playBeep() {
  try {
    await beep.play();
  } catch (e) {console.log(e)}
};

async function playTime() {
  try {
    await time.play();
  } catch (e) {console.log(e)}
};

export async function playSound(remainingTime: number) {
    if (remainingTime === 10) {
        //playTime();
    } else if (remainingTime < 5) {
        playBeep();
    }
}