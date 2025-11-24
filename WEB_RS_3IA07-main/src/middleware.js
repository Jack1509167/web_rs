import MongodbRS from "./lib/core/mongodb";

export async function onRequest({ locals, cookies, url, redirect }, next) {
  // console.log(url.pathname);
  // console.log(cookies.get("userData"));
  if (url.pathname === "/") {
    if (cookies.get("noreg")) cookies.delete("noreg");
  }

  if (url.pathname === "/janji-temu") {
    if (cookies.get("userData")) {
      locals.userData = cookies.get("userData").value;
      cookies.delete("userData");
    }
  }

  if (url.pathname == "/alert") {
    if (!cookies.get("msg") || !cookies.get("redirect")) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
      return next();
    } else {
      locals.msg = cookies.get("msg").value;
      locals.redirect = cookies.get("redirect").value;
      cookies.delete("msg", { path: "/alert" });
      cookies.delete("redirect", { path: "/alert" });
    }
  }

  if (url.pathname == "/addSchedule") {
    if (cookies.get("userId")) {
      locals.userId = cookies.get("userId").value;
      cookies.delete("userId");
    }
  }

  if (url.pathname == "/search") {
    // console.log(cookies.get("noreg"));
    if (cookies.get("noreg")) {
      locals.noreg = cookies.get("noreg").value;
    }
  }

  if (url.pathname.startsWith("/internal/admin")) {
    if (!cookies.get("usr") && !cookies.get("pswd")) {
      locals.prompt = "needLogin";
    } else {
      const accountValid = await new MongodbRS().db_collection("rs_account").checkAccount(cookies.get("usr").value);

      try {
        if (accountValid.password && accountValid.password == cookies.get("pswd").value) {
          locals.prompt = "loggedIn";
        } else {
          locals.prompt = "needLogin";
        }
      } catch {
        locals.prompt = "needLogin";
      }
    }
    return next();
  }

  return next();
}
