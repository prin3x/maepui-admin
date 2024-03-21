import Cookies from "js-cookie";

export default function getCookie(cname) {
  const c = Cookies.get(cname);
  return c;
}

export function checkCookie() {
  let username = getCookie("auth");
  if (username != "" && username) {
    return true;
  } else {
    return false;
  }
}
