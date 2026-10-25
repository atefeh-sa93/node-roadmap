const start = Date.now();

let n = 0;
function forever() {
  n++;
  if (n % 1e6 === 0) console.log(`${n / 1e6} میلیون بار - ${Date.now() - start}ms`);
  // process.nextTick(forever); 
  setImmediate(forever);
}
forever();
setTimeout(() => console.log(`⏰ تایمر اجرا شد - ${Date.now() - start}ms`), 0);