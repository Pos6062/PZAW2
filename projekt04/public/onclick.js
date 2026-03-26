function del(id) {
  fetch(`/delete/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      location.reload();
    }
  });
}
function updatePerson(id, oldFname, oldLname) {
  const fname = prompt("Imię:", oldFname);
  const lname = prompt("Nazwisko:", oldLname);

  if (!fname || !lname) return;

  fetch("/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, fname, lname })
  })
  .then(() => location.reload());
}