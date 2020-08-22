jQuery(document).ready(() => {
  $("#subscribe").on("click", async (e) => {
    e.preventDefault();
    var email = $("input[name=email]").val();
    var contact = $("input[name=contact]").val();
    var re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return toastr.error("Enter Your Email", "", { timeOut: 1000 });
    }

    if (!re.test(email)) {
      return toastr.error("Invalid Email format, please try again.", "", {timeOut: 1000,});
    }

    if (!contact) {
      return toastr.error("Enter Your Contact Number", "", { timeOut: 1000 });
    }

    if (isNaN(contact)) {
      return toastr.error("Enter the valid Contact Number(Like : 9566137117)","",{ timeOut: 1000 });
    }

    if (contact.length != 10) {
      return toastr.error("Enter Your Contact Number must be 10 Integers", "", {timeOut: 1000,});
    }

    const referralCode = window.location.href.split("/user/")[1];
    const data = {
      email: email,
      contact: contact,
      referralCode: referralCode,
    };
    await $.ajax(`/emailSubscrib`, {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: async (response) => {
        if (response.status) {
          localStorage.setItem("token", response.data.Code);
          localStorage.setItem("peopleAhead", response.people);
          window.location = "/thankyou";
        } else {
          toastr.error(response.message, "", { timeOut: 1000 });
        }
      },
    });
  });

  localStorage.clear();

  $("#position").on("click", async (e) => {
    var emailOrContact = $("input[name=findPosition]").val();
    if (!emailOrContact) {
      return toastr.error("Enter Your Email or Contact", "", { timeOut: 1000 });
    }
    
    const data = {
      emailOrContact: emailOrContact,
    };
    await $.ajax(`/findPosition`, {
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: async (response) => {
        if (response.status) {
          $("#userPositin").html(`${response.message}`);
          $("#userUrl")
            .html(`${response.base_url}`)
            .attr("href", `${response.base_url}`);
          document.getElementById("modalCopyButton").style.display = "block";
        } else {
          toastr.error(response.message, "", { timeOut: 1000 });
        }
      },
    });
  });
});
const copy = (element) => {
  console.log("call");
  console.log(element);
  var $temp = $("<input>");
  $("#userUrl").append($temp)
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
};