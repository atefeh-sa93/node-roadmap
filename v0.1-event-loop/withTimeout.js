function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);

    promise.then((value) => {
      clearTimeout(timer);
      resolve(value);
    }).catch((err) => {
      clearTimeout(timer);
      reject(err);
    });
  })
}


async function fakeFetch(id) {
  await sleep(Math.random() * 1000);
  return { id, name: `user ${id}` };
}


async function main() {
  try {
    await withTimeout(sleep(500), 1000);
    console.log('اولی موفق شد');           // باید چاپ بشه
  } catch (err) {
    console.log('اولی:', err.message);
  }

  try {
    const user = await withTimeout(fakeFetch(1), 600);
    console.log('کاربر:', user);
  } catch (err) {
    console.log('سومی:', err.message);
  }

  try {
    await withTimeout(sleep(2000), 1000);
    console.log('دومی موفق شد');
  } catch (err) {
    console.log('دومی:', err.message);      // باید «Timeout» چاپ بشه
  }
}
main();