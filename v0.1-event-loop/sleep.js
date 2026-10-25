// sleep.js
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('شروع');
  await sleep(1000);
  console.log('بعد از ۱ ثانیه');
}
main();