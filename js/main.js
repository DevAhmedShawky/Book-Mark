let siteNames = document.querySelector("#book-name");
let webSites = document.querySelector("#web-site");
let submit = document.querySelector("#addBtn");
let showResult = document.querySelector("#result");
let clearValue = document.querySelector("#clear");
let btn = document.createElement("button");
let modal = document.querySelector(".modal");
let index = "";
let siteNamesValidation = false;
let webSitesValidation = false;
let booksMark = [];

// Condition to ensure the presence of data in storage
if (localStorage.getItem("bookmarks")) {
  booksMark = JSON.parse(localStorage.getItem("bookmarks"));
  showBookMark();
} else {
  booksMark = [];
}

// Start Validition
function validateName() {
  if (siteNames.value.length >= 3) {
    siteNamesValidation = true;
    siteNames.classList.add("is-valid");
    siteNames.classList.remove("is-invalid");
  } else {
    siteNamesValidation = false;
    siteNames.classList.add("is-invalid");
    siteNames.classList.remove("is-valid");
  }
}

function validateSites() {
  if (webSites.value != "") {
    webSitesValidation = true;
    webSites.classList.add("is-valid");
    webSites.classList.remove("is-invalid");
  } else {
    webSitesValidation = false;
    webSites.classList.add("is-invalid");
    webSites.classList.remove("is-valid");
  }
}
// End Validition

// function For Add Value Data In Page And LocalStorage
function creatBookMark(e) {
  e.preventDefault();
  let bookMark = {
    siteName: siteNames.value,
    webSite: webSites.value,
  };
  if (webSitesValidation && siteNamesValidation) {
    console.log(webSitesValidation);
    booksMark.push(bookMark);
    localStorage.setItem("bookmarks", JSON.stringify(booksMark));
    webSitesValidation = false;
    siteNamesValidation = false;
    showBookMark();
    clearBookMarks();
    siteNames.classList.remove("is-valid");
    webSites.classList.remove("is-valid");
  } else {
    var myModal = new bootstrap.Modal(
      document.getElementById("staticBackdrop"),
      {}
    );
    myModal.show();
  }
}

// function For Display The Results On The Page
function showBookMark() {
  showResult.innerHTML = "";
  for (let i = 0; i < booksMark.length; i++) {
    showResult.innerHTML += `<tr class= "text-center">
<td>${i + 1}</td>
<td>${booksMark[i].siteName}</td>
<td><button onclick="editBookMark (${i})" class="btn btn-warning text-light"><i class="fa-solid fa-pen-to-square pe-2 me-1"></i>UpDate</button></td>
<td><a class="btn btn-danger" href="${
      booksMark[i].webSite
    }" target="_blank"><i class="fa-solid fa-eye pe-2 me-1"></i>Visit</a></td>
<td><button onclick="pop()" class="btn btn-danger"><i class="fa-solid fa-trash-can  pe-2 me-1"></i>Delete</button></td>
  </tr>
  `;
  }
}
//End

// function For Recover Empty Fields After Adding
function clearBookMarks() {
  siteNames.value = "";
  webSites.value = "";
}
clearValue.addEventListener("click", clearBookMarks);
//End

// function For Retrieving data in fields
function editBookMark(i) {
  index = i;
  siteNames.value = booksMark[i].siteName;
  webSites.value = booksMark[i].webSite;
  submit.innerHTML = `Update`;
  submit.setAttribute("onclick", "updateBookMark(event)");
}
//End

// function For Add value After Modification
function updateBookMark(e) {
  e.preventDefault();
  let bookMark = {
    siteName: siteNames.value,
    webSite: webSites.value,
  };
  booksMark.splice(index, 1, bookMark);
  localStorage.setItem("bookmarks", JSON.stringify(booksMark));
  console.log(e);
  showBookMark();
  clearBookMarks();
  submit.innerHTML = `Submit`;
  submit.setAttribute("onclick", "creatBookMark()");
  siteNames.classList.remove("is-valid");
  webSites.classList.remove("is-valid");
}
//End

// function For Delete Data
function deleteBookMark(i) {
  booksMark.splice(i, 1);
  localStorage.setItem("bookmarks", JSON.stringify(booksMark));
  showBookMark();
}
//End

// pop For Delete Data =< using SweetAlert Library
function pop(i) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteBookMark(i);
      Swal.fire({
        title: "Deleted!",
        text: "Your data has been deleted.",
        icon: "success",
      });
    }
  });
}
