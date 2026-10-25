# v0.1 Notes – Event Loop & Async

## 1. What is the execution order in Node?
1. Sync code
2. nextTick queue
3. Promise queue (microtasks)
4. Event loop phases: timers → poll → check → ...
   After every callback in any phase: nextTick queue, then Promise queue again.

timers, poll and check are the macrotasks, split into phases.

## 2. What is the difference between "busy" and "waiting"?
- Busy: my own code (a callback, like a `while` loop) is running and the CPU is engaged.
  The event loop is stuck and nothing else can run.
- Waiting: Node is asleep (in the poll phase) until someone calls it,
  for example a timer finishes or I/O is ready. CPU is almost 0.

## 3. What exactly does `await` do?
It pauses only the async function, not the whole process.
Control goes back, so other code keeps running.
When the Promise is done, the rest of the function runs as a microtask.

## 4. When to use `for`, `Promise.all` and `allSettled`?
- `for` + `await`: runs the items one by one, so total time = the sum of all.
  Use it when each step needs the previous result, or to avoid putting too much load on the server.
- `Promise.all`: the result of all of them matters and must come back correctly.
  The first error is a full exit, and all results are lost.
- `Promise.allSettled`: always waits for all of them to finish, success or failure, and then it's done.
  It never rejects, and it gives a status for each item.

  ## 5. Busy vs waiting: how to tell?
- Busy: JavaScript itself is doing the computation. It blocks the event loop.
- Waiting: someone else (disk, network, database, OS) is doing the work,
  and JavaScript only waits for the answer. The event loop stays free.

Busy examples: heavy image processing, sorting a huge array, a long regex on a big string.
Waiting examples: a database query, an HTTP request, setTimeout and setInterval.
(Sort and regex are only a problem when the data is very large.)

## 6. `bcrypt.hash` vs `bcrypt.hashSync`
- `hashSync` runs on the main JavaScript thread, so it blocks the event loop
  and every user has to wait.
- `hash` runs on a libuv background thread, so the main thread stays free
  for other requests. It uses the same CPU, just somewhere else.
- In a server, always use `hash` (any function ending in `Sync` blocks).

## 7. Does `async` + `await` make a heavy loop non-blocking?
No. The server still freezes. The heavy loop keeps the thread busy and
nothing else can run until it finishes. `async` only makes the function
return a Promise. `await` only helps when there is real I/O behind it.
Real fixes: chunk it with `setImmediate`, use `worker_threads`, or a job queue.