const team = () => {
  const imgLoading = document.querySelector(".loading-container");
  let teamNames = document.querySelector("#name");
  const profession = document.querySelector("#profession");
  const teamCreateBtn = document.querySelector(".main-contactus__btn.btn");
  const careerCreateBtn = document.querySelector(
    ".main-contactus__btn-career.btn"
  );
  let teamId = "";
  let careerId = "";
  //team create part
  if (teamCreateBtn) {
    teamCreateBtn.addEventListener("click", (e) => {
      if (e.target.innerText === "Create") {
        e.preventDefault();

        const photo = document.querySelector("#photo").files[0];

        const form = new FormData();
        form.append("name", teamNames.value);
        form.append("profession", profession.value);
        form.append("photo", photo);

        createSetting(form, "create", "createTeam");
      } else {
        e.preventDefault();

        const form = new FormData();
        if (document.querySelector("#photo").files[0]) {
          const photo = document.querySelector("#photo").files[0];
          form.append("photo", photo);
        }
        form.append("name", teamNames.value);
        form.append("profession", profession.value);
        form.append("id", teamId);

        createSetting(form, "update", "updateTeam");
      }
    });
  }
  const createSetting = async (form, type, link) => {
    if (type === "create") {
      const url = `/${link}`;
      const fetchBody = {
        method: "POST",

        body: link.includes("Career") ? JSON.stringify(form) : form,
      };
      if (link.includes("Career")) {
        fetchBody.headers = {
          "Content-Type": "application/json",
        };
      }
      try {
        imgLoading.style.display = "flex";
        const res = await fetch(url, fetchBody);
        imgLoading.style.display = "none";
        const data = await res.json();

        if ((data.status = "success")) {
          showAlert("success", data.data.message);
          window.setTimeout(() => {
            location.reload(true);
          }, 1500);
        }
      } catch (e) {
        console.log(e);
        imgLoading.style.display = "none";
        showAlert("error", data.data.message);
      }
    } else {
      const url = `/${link}`;
      const fetchBody = {
        method: "PATCH",

        body: link.includes("Career") ? JSON.stringify(form) : form,
      };
      if (link.includes("Career")) {
        fetchBody.headers = {
          "Content-Type": "application/json",
        };
      }
      try {
        imgLoading.style.display = "flex";
        const res = await fetch(url, fetchBody);
        imgLoading.style.display = "none";
        const data = await res.json();
        if ((data.status = "success")) {
          showAlert("success", data.data.message);
          window.setTimeout(() => {
            location.reload(true);
          }, 1500);
        }
      } catch (e) {
        console.log(e);
        imgLoading.style.display = "none";
      }
    }
  };

  //update part
  const teamListEdit = document.querySelectorAll(".view-team-edit .edit");
  if (teamListEdit) {
    teamListEdit.forEach((item) => {
      item.addEventListener("click", (e) => {
        teamId = e.target.id;

        const nameText =
          e.target.closest(".view-team-list").children[1].children[0].innerText;

        const professionText =
          e.target.closest(".view-team-list").children[1].children[1].innerText;
        document.querySelector(".view-team-img-image").style.display =
          "inline-block";
        document.querySelector(".view-team-img-image").src =
          e.target.closest(".view-team-list").children[0].children[0].src;
        teamNames.value = nameText;
        profession.value = professionText;
        teamCreateBtn.innerText = "Update";
      });
    });
  }

  //career create part
  const JobTitle = document.querySelector("#jobtitle");

  const JobDescription = document.querySelector("#jobdescription");
  const JobLevel = document.querySelector("#joblevel");
  const OfferedSalary = document.querySelector("#offeredSalary");
  const ApplyBefore = document.querySelector("#applybefore");
  const Education = document.querySelector("#education");
  const Experience = document.querySelector("#experience");
  const Opening = document.querySelector("#opening");
  if (careerCreateBtn) {
    careerCreateBtn.addEventListener("click", (e) => {
      const data = {
        jobtitle: JobTitle.value,

        jobdescription: JobDescription.value,
        experience: Experience.value,
        joblevel: JobLevel.value,
        offeredSalary: OfferedSalary.value,
        applybefore: ApplyBefore.value,
        education: Education.value,
        id: careerId,
        opening: Opening.value,
      };

      if (e.target.innerText === "Create") {
        e.preventDefault();

        createSetting(data, "create", "createCareer");
      } else {
        e.preventDefault();

        createSetting(data, "update", "updateCareer");
      }
    });
  }
  //update part
  const careerListEdit = document.querySelectorAll(
    ".view-career-edit .edit-career"
  );
  if (careerListEdit) {
    careerListEdit.forEach((item) => {
      item.addEventListener("click", (e) => {
        careerId = e.target.id;

        const {
          jobtitle,

          jobdescription,
          experience,
          joblevel,
          offeredSalary,
          applybefore,
          education,
          _id,
        } = JSON.parse(e.target.dataset.career);

        JobTitle.value = jobtitle;

        JobDescription.value = jobdescription;
        Experience.value = experience;
        JobLevel.value = joblevel;
        OfferedSalary.value = offeredSalary;
        ApplyBefore.value = applybefore.slice(0, 10);
        Education.value = education;

        careerCreateBtn.innerText = "Update";
      });
    });
  }
  if (document.querySelector(".logout-btn")) {
    document
      .querySelector(".logout-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          imgLoading.style.display = "flex";
          const res = await fetch("/rominteach-admin-private/logout");

          const data = await res.json();
          imgLoading.style.display = "none";
          if ((data.status = "Success"))
            location.assign("/rominteach-admin-private/");
        } catch (e) {
          console.log(e);
          // showAlert("error", "try again");
        }
      });
  }
  const hideAlert = (type, msg) => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
  };
  const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5000);
  };

  //delete team and career
  const deleteBtnFunction = async (e, url) => {
    const id = e.target.id;
    console.log(id);
    e.preventDefault();
    try {
      imgLoading.style.display = "flex";
      const res = await fetch(`/${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      imgLoading.style.display = "flex";
      if (res.status === 204) {
        showAlert("success", "delete successfully");
        window.setTimeout(() => {
          location.reload(true);
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const teamEditDelete = document.querySelectorAll(".view-team-edit .delete");
  if (teamEditDelete.length > 0) {
    teamEditDelete.forEach((item) => {
      item.addEventListener("click", (e) => {
        deleteBtnFunction(e, "deleteTeam");
      });
    });
  }
  const careerEditDelete = document.querySelectorAll(
    ".view-career-edit .delete-career"
  );
  if (careerEditDelete.length > 0) {
    careerEditDelete.forEach((item) => {
      item.addEventListener("click", (e) => {
        deleteBtnFunction(e, "deleteCareer");
      });
    });
  }
};

export default team;
