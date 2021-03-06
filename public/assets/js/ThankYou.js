jQuery(document).ready(() => {
  var base_url = window.location.origin;
  const token = localStorage.getItem("token");
  const peopleAhead = localStorage.getItem("peopleAhead");
  if (!token) {
    window.location = "/";
  }
  
  $("#peopleAhead")
  .html(`${peopleAhead} People ahead of you`)
    
  $("#BaseURL")
    .html(`${base_url}/user/${token}`)
    .attr("href", `${base_url}/user/${token}`);

  $("#facebookBtn").attr(
    "href",
    `https://www.facebook.com/sharer/sharer.php?u=${`${base_url}/user/${token}`}`
  );
  $("#twitterBtn").attr(
    "href",
    `https://twitter.com/share?url=${`${base_url}/user/${token}`}`
  );
  $("#linkedInBtn").attr(
    "href",
    `https://www.linkedin.com/shareArticle?mini=true&url=${`${base_url}/user/${token}`}`
  );
 
});
const copyToClipboard = (element) => {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
};
