/**
 *
 * @param {import('astro').AstroGlobal['cookies']}
 * @param {string} msg Pesan yang akan ditampilkan
 * @param {string} redirect Endpoint setelah muncul notifikasi
 */

function createAlert(cookies, msg, redirect) {
  cookies.set("msg", msg, { path: "/alert" });
  cookies.set("redirect", redirect, { path: "/alert" });
}

export { createAlert, readAlert };
