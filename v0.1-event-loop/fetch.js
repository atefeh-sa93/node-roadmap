function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// یه درخواست شبکه‌ی قلابی: بعد از یه زمان تصادفی، ۷۰٪ موفق و ۳۰٪ خطا
async function fakeFetch(id) {
  console.log(`درخواست ${id} شروع شد`);
  await sleep(Math.random() * 1000);
  if (Math.random() < 0.3) throw new Error(`درخواست ${id} شکست خورد`);
  console.log(`درخواست ${id} تموم شد`);
  return { id, name: `کاربر ${id}` };
}


// const start = Date.now();
// async function main() {
//   try {
//     const users=[];
//     for (let i = 1; i <= 5; i++) {
//       try{
//         const user = await fakeFetch(i);
//         users.push(user);
//       } catch(err) {
//         console.error(`خطا در دریافت کاربر ${i}:`, err.message);
//       }
//     }
//     console.log('کاربر دریافت شد:',  users, `⏰ زمان کل: ${Date.now() - start}ms`);
//   }catch(err) {
//     console.error('خطا در دریافت کاربر:', err.message, `⏰ زمان کل: ${Date.now() - start}ms`);
//   }
// }
// main();



//Promise.all
// async function main() {
//   const start = new Date();
//   try{
//     const users = await Promise.all([1, 2, 3, 4, 5].map((id) => fakeFetch(id)));
//     console.log('همه موفق:', users, `⏰ ${Date.now() - start}ms`);
//   }catch(err) {
//     console.error('Promise.all شکست خورد:', err.message, `⏰ ${Date.now() - start}ms`);
//   }
// }


//Promise.allSettled
async function main() {
  const start = new Date();
  try{
    const users = await Promise.allSettled([1,2,3,4,5].map(id => fakeFetch(id)));
    console.log('نتایج Promise.allSettled:', users, `⏰ ${Date.now() - start}ms`);
  } catch(err) {
    console.error('Promise.allSettled شکست خورد:', err.message, `⏰ ${Date.now() - start}ms`);
  }
}

main();


