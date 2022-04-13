document.querySelector(".login-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  console.log();
  const email = document.querySelector(".input-email").value;
  const password = document.querySelector(".input-password").value;
  console.log(email, password);
  const res = await fetch("/rominteach-admin-private/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);
  if (data.status === "Success") {
    location.assign("/rominteach-admin-private/team");
  }
});
