const beep = new Audio(process.env.PUBLIC_URL + "/shotclock.mp3");
const time = new Audio(process.env.PUBLIC_URL + "/time.mp3");

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
        playTime();
    } else if (remainingTime < 5) {
        playBeep();
    }
}