window.onload = (ev) => {
  displayData(_default);
};

//display add new student table
let addBtn = document.getElementById("Add");
let fistTable = document.getElementById("fistTable");
let secondTable = document.getElementById("container2");
addBtn.addEventListener("click", () => {
  fistTable.style.display = "none";
  secondTable.style.display = "block";
  let saveEditsBtn = document.getElementById("saveEditsBtn");
  saveEditsBtn.style.display = "none";
});
let inputTable = document.getElementById("in");
let dataTable = document.querySelector(".container");

// creating constractor function
function Students(Name, Age, Address, Course) {
  this.name = Name;
  this.age = Age;
  this.address = Address;
  this.course = Course;
  let degree;
  this.setDegree = function (value) {
    degree = value;
  };
  this.getDegree = function () {
    return degree;
  };
}
let _default = [];

// predefined istanaces
var student1 = new Students("Nadia", "27", "Mansoura", "js");
student1.setDegree(90);
std1 = {};
for (let key in student1) {
  if (typeof student1[key] != "function") {
    std1[key] = student1[key];
  }
}
std1.degree = student1.getDegree();
_default.push(std1);

var student2 = new Students("Ahmed", "24", "Mansoura", "js");
student2.setDegree(80);
std2 = {};
for (let key in student2) {
  if (typeof student2[key] != "function") {
    std2[key] = student2[key];
  }
}
std2.degree = student2.getDegree();
_default.push(std2);

var student3 = new Students("Eman", "22", "Alex", "c++");
student3.setDegree(70);
std3 = {};
for (let key in student3) {
  if (typeof student3[key] != "function") {
    std3[key] = student3[key];
  }
}
std3.degree = student3.getDegree();
_default.push(std3);

// take user inputs
let userInputs = document.querySelectorAll(".tableInput");
var userSelect = document.getElementById("selectCourses");
var saveBtn = document.getElementById("saveBtn");
let data_table = document.getElementsByTagName("tbody")[1];

// save button functionality
saveBtn.addEventListener("click", (ev) => {
  //let x = window.confirm("are you sure you want to save ?");

  // validate user inputs
  let logs = document.querySelectorAll(".log");
  let arrayOfUserInputs = [...userInputs];
  let allUserInputs = arrayOfUserInputs.concat(userSelect);
  if (
    allUserInputs[0].value != "" &&
    (allUserInputs[1].value != "" ||
      allUserInputs[1].value.search(/^\d+$/) != -1) &&
    allUserInputs[2].value != "" &&
    allUserInputs[4].value != "index0" &&
    allUserInputs[3].value != ""
  ) {
    var userInputsArray = [];
    for (let i = 0; i < userInputs.length; i++) {
      userInputsArray.push(userInputs[i].value);
    }
    userInputsArray.push(userSelect.value);

    var studentInstance = new Students(
      userInputsArray[0],
      userInputsArray[1],
      userInputsArray[2],
      userInputsArray[4]
    );
    studentInstance.setDegree(parseInt(userInputsArray[3]));
    let std = {};
    for (let key in studentInstance) {
      if (typeof studentInstance[key] != "function") {
        std[key] = studentInstance[key];
      }
    }
    std.degree = studentInstance.getDegree();
    _default.push(std);
    let tr_ele = document.createElement("tr");
    tr_ele.className = "t-row-data";
    data_table.appendChild(tr_ele);
    for (let key in std) {
      let td_ele = document.createElement("td");
      td_ele.innerHTML = std[key];
      tr_ele.appendChild(td_ele);
    }
    let deleteBtn = document.createElement("td");
    deleteBtn.innerHTML = "<button class='delete'>Delete</button>";
    tr_ele.appendChild(deleteBtn);

    let enditBtn = document.createElement("td");
    enditBtn.innerHTML = "<button class='edit'>Edit</button>";
    tr_ele.appendChild(enditBtn);

    //binding edit functionality
    edit_function();
    //binding delete functionality
    deleteEle();
    fistTable.style.display = "block";
    secondTable.style.display = "none";
  } else {
    window.alert("enter All required data");
  }
});
// function to display required array
function displayData(arr) {
  var data_table = document.getElementsByTagName("tbody")[1];
  for (let i = 0; i < arr.length; i++) {
    var tr_ele = document.createElement("tr");
    tr_ele.className = "t-row-data";
    data_table.appendChild(tr_ele);
    for (var key in arr[i]) {
      if (typeof arr[i][key] != "function") {
        var td_ele = document.createElement("td");
        td_ele.innerHTML = arr[i][key];
        tr_ele.appendChild(td_ele);
      }
    }
    // creating delete and edit button at run time
    var deleteBtn = document.createElement("td");
    deleteBtn.innerHTML = "<button class='delete'>Delete</button>";
    tr_ele.appendChild(deleteBtn);

    var enditBtn = document.createElement("td");
    enditBtn.innerHTML = "<button class='edit'>Edit</button>";
    tr_ele.appendChild(enditBtn);
  }
  //binding edit functionality
  edit_function();
  //binding delete functionality
  deleteEle();
}
//edit functionality
function edit_function() {
  let editButtons = document.getElementsByClassName("edit");
  const userInputsAsArray = [...userInputs];
  const allUserInputs = userInputsAsArray.concat(userSelect);
  let y = allUserInputs.splice(3, 1);
  allUserInputs.push(y[0]);
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", (ev) => {
      fistTable.style.display = "none";
      secondTable.style.display = "block";
      let saveEditsBtn = document.getElementById("saveEditsBtn");
      saveEditsBtn.style.display = "block";
      let arrayOfBtns = [...editButtons];
      editIndex = arrayOfBtns.indexOf(ev.target);
      let counter = 0;
      for (let key in _default[editIndex]) {
        allUserInputs[counter].value = _default[editIndex][key];
        counter++;
      }
    });
  }
  //saving edits functionality
  let saveEditsBtn = document.getElementById("saveEditsBtn");
  saveEditsBtn.addEventListener("click", (ev) => {
    let x = window.confirm("are you sure you want to edit ?");
    if (x) {
      fistTable.style.display = "block";
      secondTable.style.display = "none";
      let counter = 0;
      for (let key in _default[editIndex]) {
        _default[editIndex][key] = allUserInputs[counter].value;
        counter++;
        if (counter == 5) {
          break;
        }
      }
      data_table.innerHTML = "";
      displayData(_default);
    } else {
    }
  });
}

//delete functionality
function deleteEle() {
  let deleteButtons = document.getElementsByClassName("delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (ev) => {
      let x = window.confirm("are you sure you want to delete ?");
      if (x) {
        let arrayOfBtns = [...deleteButtons];
        deletedIndex = arrayOfBtns.indexOf(ev.target);
        ev.target.parentElement.parentElement.remove();
        _default.splice(deletedIndex, 1);
      } else {
      }
    });
  }
}

//function to remove the created element
function removePrevious(arr) {
  var oldData = document.querySelectorAll(".t-row-data");
  for (let i = 0; i < arr.length; i++) {
    oldData[i].remove();
  }
}
// sorting by the selected item
let headers = document.querySelectorAll(".header");
for (let i = 0; i < headers.length; i++) {
  headers[i].addEventListener("click", (ev) => {
    let sortedArray = [..._default];
    sortedArray.sort((a, b) => {
      if (ev.target.id === "age" || ev.target.id === "degree") {
        a = parseInt(a[ev.target.id]);
        b = parseInt(b[ev.target.id]);
      } else {
        a = a[ev.target.id].toLowerCase();
        b = b[ev.target.id].toLowerCase();
      }
      if (a > b) return 1;
      else if (a < b) return -1;
      else 0;
    });
    data_table.innerHTML = "";
    displayData(sortedArray);
  });
}
// get the avg of the degrees
let avgBtn = document.getElementById("avg");
avgBtn.addEventListener("click", (ev) => {
  let arrayOfDegrees = _default.map((ele) => {
    return parseInt(ele.degree);
  });
  let sum = 0;
  for (let i = 0; i < arrayOfDegrees.length; i++) {
    sum += arrayOfDegrees[i];
  }
  let avg = sum / arrayOfDegrees.length;
  window.alert(`the avg of students degrees = ${avg.toFixed(2)}`);
});
// get the summation of degrees
let summationBtn = document.getElementById("summation");
summationBtn.addEventListener("click", (ev) => {
  let arrayOfDegrees = _default.map((ele) => {
    return parseInt(ele.degree);
  });
  let sum = 0;
  for (let i = 0; i < arrayOfDegrees.length; i++) {
    sum += arrayOfDegrees[i];
  }
  window.alert(`the sum of students degrees = ${sum}`);
});

// find a search value
let searchInput = document.getElementById("searchValue");
searchInput.addEventListener("input", (ev) => {
  let searchValue = searchInput.value;
  data_table.innerHTML = "";
  let res = search(searchValue);
  displayData(res);
});
function search(searchValue) {
  let pattern = new RegExp("^" + searchValue, "i");
  let res = _default.filter((element) => pattern.test(element.name));
  return res;
}
