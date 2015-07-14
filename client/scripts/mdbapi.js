// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader("38bbbf6ebdbc95842e5974c969310778", "PARSE_API_KEY");
});
