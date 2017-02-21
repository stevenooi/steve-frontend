export default {

  redirect: (url) => {
	   window.location.href = url;
  },
  redirectWithParam: (url, params) => {
	   window.location.href = url + "?" + params;
  }
}