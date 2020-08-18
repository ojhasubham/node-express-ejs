var EmailSubscribe = function () {
  $("#subscribe").on("click", async function (e) {
    e.preventDefault();
    var email = $("input[name=email]").val();
    var re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return alert("Enter Your Email");
    }
    if (!re.test(email)) {
      return alert("Invalid Email format, please try again.");
    }
    const data = {
      email: email,
    };
    await $.ajax("/emailSubscrib", {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: async function (response) {
        if (response.status) {
          localStorage.setItem("token", response.data.Code);
          window.location = "/thankyou";
        } else {
          alert(response.message);
        }
      },
    });
  });
};

jQuery(document).ready(function () {
  localStorage.clear();
  EmailSubscribe();
});
