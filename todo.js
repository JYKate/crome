const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (banana) {
    return banana.id !== parseInt(li.id);
    // filter(function(k)) : ()안 조건에 맞는 array를 새로 제공함
    // parseInt(a) : string인 a를 숫자로 변환
  });
  toDos = cleanToDos;
  // toDos가 const면 변경 업데이트가 안되므로 let 으로 바꿈
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // JSON 통해 Object 인 toDos 를 string으로 변환
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newID;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newID,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// 새로고침해도 화면에 뜨게 하려면 필요한 함수
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    // JSON 통해 string 인 loadedToDos 를 object로 변환
    parsedToDos.forEach(function (potato) {
      paintToDo(potato.text);
    });
    //forEach(): array 있는 함수들 각각 한번씩 순서대로 실행
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
