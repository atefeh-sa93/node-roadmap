const fs = require('fs');

function promisify(fn) {
  return function (...arg) {
    return new Promise((resolve, reject) => {
      fn(...arg, (err, data) => {
        if(err) {
          reject(err)
        } else {
          resolve(data)
        }
      })

    })
  }
}

const readFileP = promisify(fs.readFile);

async function main() {
  const text = await readFileP(__filename, 'utf8');
  console.log(text.slice(0, 50));            // ۵۰ کاراکتر اول همین فایل

  try {
    await readFileP('not-exists.txt');
  } catch (err) {
    console.log('خطا گرفته شد:', err.code);   // باید ENOENT چاپ کنه
  }
}
main();