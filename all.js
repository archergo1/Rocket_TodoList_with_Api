// 參考自https://www.youtube.com/watch?v=HEc1oM_a9JU&t=4296s
// 以及https://ithelp.ithome.com.tw/articles/10281200

const apiUrl = "https://fathomless-brushlands-42339.herokuapp.com/todo2";

// 1. add new todo items
const inputText = document.querySelector(".inputText");
const addBtn = document.querySelector(".addBtn");
// 用來承接新增的資料
let todoData = [];
axios.get("apiUrl").then(function (response) {
  console.log(response);
  todoData = response.data;
  updateList();
});

addBtn.addEventListener("click", addTodo);
function addTodo() {
  let todo = {
    txt: inputText.value,
    id: new Date().getTime(),
    checked: "",
  };

  if (todo.txt != "") {
    todoData.unshift(todo);
    inputText.value = "";
  }
  updateList();
}

// 1.5 use "Enter" to submit new todo items
inputText.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    addTodo();
  }
});

// 2. render
const todoList = document.querySelector("#todoList");
// console.log(todoList);
function render(arr) {
  let str = "";
  arr.forEach((item) => {
    console.log(item);
    str += `<li data-id = "${item.id}">
              <label for="" class="checkbox">
                <input type="checkbox" ${item.checked}/>
                <span>${item.txt}</span>
              </label>
              <a href="#" class="delete"></a>
        </li>`;
  });

  todoList.innerHTML = str;
}

// 3. tab alternation
const tab = document.querySelector("#tab");
tab.addEventListener("click", changeTab);
let toggleStatus = "all";
function changeTab(e) {
  toggleStatus = e.target.dataset.tab;
  let tabs = document.querySelectorAll("#tab li");
  tabs.forEach(function (item) {
    item.classList.remove("active");
  });
  e.target.classList.add("active");
  updateList();
}

//  4. delete and alter "checked" status
todoList.addEventListener("click", deleteAndChecked);
function deleteAndChecked(e) {
  // 選取點到的元件最近id;
  let id = e.target.closest("li").dataset.id;
  // 刪除功能
  if (e.target.classList.value == "delete") {
    e.preventDefault();
    todoData = todoData.filter(function (item) {
      item.id != id;
    });
  } else {
    // 切換checked狀態功能
    todoData.forEach((item, index) => {
      if (item.id == id) {
        if (todoData[index].checked == "checked") {
          todoData[index].checked = "";
        } else {
          todoData[index].checked = "checked";
        }
      }
    });
  }
  updateList();
}

// 5. update todo list
function updateList() {
  let showData = [];
  if (toggleStatus == "all") {
    showData = todoData;
  } else if (toggleStatus == "work") {
    showData = todoData.filter(function (item) {
      item.checked == "";
    });
  } else {
    showData = todoData.filter(function (item) {
      item.checked == "checked";
    });
  }

  const workNum = document.getElementById("workNum");
  let todoLength = todoData.filter((item) => item.checked == "");
  workNum.textContent = todoLength.length;

  render(showData);
}

// init
updateList();

// 6. clear done items
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  todoData = todoData.filter(function (item) {
    item.checked != "checked";
  });
  updateList();
});
