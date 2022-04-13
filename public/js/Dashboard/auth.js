const auth = () => {
  if (document.querySelector(".login-btn")) {
    document
      .querySelector(".login-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.querySelector(".input-email").value;
        const password = document.querySelector(".input-password").value;

        const res = await fetch("/rominteach-admin-private/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.status === "Success") {
          showAlert("success", "logged In successfully");
          window.setTimeout(() => {
            location.reload(true);
          }, 1500);
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
};
export default auth;
