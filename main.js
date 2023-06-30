const testAxios = () => {
  let enrolleeId = document.getElementById("enrolleenum").value;
  let phoneNumber = document.getElementById("phonenum").value;
  let dob = document.getElementById("dob").value;
  if (enrolleeId === "") {
    alert("Please enter your enrollee number!");
    return;
  }
  if (phoneNumber === "") {
    alert("Please enter your phone number!");
    return;
  }
  if (dob === "") {
    alert("Please enter your Date of birth!");
    return;
  }
  const spilttedId = enrolleeId.split("/");

  document.getElementById("loader").style.display = "block";
  document.getElementById("text").style.display = "none";

  axios
    .get(
      `https://online.hygeiahmo.com/hyintermediary/json_enrollee_services.aspx?op=familyinfo&authorization=aGdobW9hcGk6aGcqJDIwMTZAdGVjaA==&iid=${spilttedId[0]}`
    )
    .then(function (response) {
      // Handle success
      document.getElementById("loader").style.display = "none";
      document.getElementById("text").style.display = "block";

      let res = response.data;
      res.forEach((element) => {
        let dateofBirth = moment(element.dob).format("DD/MM/YYYY");
        let dateofBirthFromInput = moment(dob).format("DD/MM/YYYY");
        if (dateofBirth === dateofBirthFromInput) {
          document.getElementById("enrolleeId").innerHTML =
            element.legacycode + "/" + "0";
          document.getElementById("enrolleeName").innerHTML =
            element.lastname + " " + element.firstname;
          document.getElementById("company").innerHTML = element.divisionname;
          document.getElementById("plan").innerHTML = element.planname;
          document.getElementById("gender").innerHTML = element.gendername;
          document.getElementById(
            "image"
          ).src = `https://apps.hygeiahmo.com:444/cba/uploads/enrolment-uploads/pictures/${
            element.pixpath.split("\\")[2]
          }`;
          document.getElementById("capture").style.display = "block";
        }
      });
    })
    .catch(function (error) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("text").style.display = "block";
      alert("Something went wrong, please try again!");
      console.error(error);
    });
};

function downloadElementAsImage(elementId) {
  var element = document.getElementById(elementId);

  rasterizeHTML
    .drawHTML(element.outerHTML)
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.href = dataUrl;
      link.download = "image.png";

      link.click();
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

// Usage:
