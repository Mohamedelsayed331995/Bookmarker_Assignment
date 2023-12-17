var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var siteList;

if (localStorage.getItem("siteList") == null) {
    siteList = [];
}
else {
    siteList = JSON.parse(localStorage.getItem("siteList"));
    displaySites(siteList);
}

function validateName() {
    var regex = /^[A-Z a-z 0-9]{3,}$/;

    if (regex.test(siteName.value)) {
        siteName.classList.replace("is-invalid", "is-valid");
        return true;
    }
    else {
        siteName.classList.add("is-invalid");
        return false;
    }
}

function validateUrl() {
    var regex = /^[A-z a-z 0-9]+\.com$/
    if (regex.test(siteUrl.value)) {
        siteUrl.classList.replace("is-invalid", "is-valid");
        return true;
    }
    else {
        siteUrl.classList.add("is-invalid");
        return false;
    }
}

function addSite() {
    if ((validateName() === true) && (validateUrl() === true)) {
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        };

        siteList.push(site);
        displaySites(siteList);
        localStorage.setItem("siteList", JSON.stringify(siteList));
        clearForm();
    }
    else {
        popup.classList.replace('d-none','d-block');
    }
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function displaySites(siteList) {
    var box = "";
    for (i = 0; i < siteList.length; i++) {
        box += ` <tr class="mt-4">
             <td>${i}</td>
            <td>${siteList[i].name}</td>
             <td><button class="visit" onclick="visitSite(${i})"><i class="fa-solid fa-eye"></i>  Visit</button></td>
             <td><button class="delete" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
         </tr>`;
    }
    document.getElementById("data").innerHTML = box;
}

function visitSite(index) {
    window.open(siteList[index].url);
}

function deleteSite(index) {
    siteList.splice(index, 1);
    displaySites(siteList);
    localStorage.setItem("siteList", JSON.stringify(siteList));
}

function closePopup(){
    popup.classList.replace('d-block','d-none');
}