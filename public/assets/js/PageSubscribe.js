jQuery(document).ready(() => {
  $("#subscribe").on("click", async (e) => {
    e.preventDefault();
    var email = $("input[name=email]").val();
    var re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return alert("Enter Your Email");
    }
    if (!re.test(email)) {
      return alert("Invalid Email format, please try again.");
    }
    const referralCode = window.location.href.split("/user/")[1];
    const data = {
      email: email,
      referralCode: referralCode,
    };
    await $.ajax(`/emailSubscrib`, {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: async (response) => {
        if (response.status) {
          localStorage.setItem("token", response.data.Code);
          window.location = "/thankyou";
        } else {
          alert(response.message);
        }
      },
    });
  });

  localStorage.clear();

  $("#position").on("click", async (e) => {
    var email = $("input[name=positionEmail]").val();
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
    await $.ajax(`/findPosition`, {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: async (response) => {
        if (response.status) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      },
    });
  });
});
