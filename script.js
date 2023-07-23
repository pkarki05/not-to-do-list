let taskList = [];
let totalHours = 0;
const taskListElm = document.getElementById("taskList");
const badListElm = document.getElementById("badList");
const totalHoursElm = document.getElementById("totalHours");

const handleOnSubmit = (e) => {
  const frm = new FormData(e);
  const task = frm.get("task");
  const hr = +frm.get("hr");
  const obj = { task, hr, type: "entry", id: randomStr() };
  let totalHrs = taskList.reduce((total, item) => {
    return total + item.hr;
    console.log(totalHrs);
  }, 0);
  totalHours = totalHrs + hr;
  let remainingHours = 168 - totalHours;
  console.log(totalHours);
  if (totalHours <= 168) {
    // let remHrs = 168 - totalHrs;
    // total.innerHTML = `${totalHrs} Hours and unused ${remHrs} Hours`;
    // console.log(totalHrs);
    taskList.push(obj);
    display();
    total.innerHTML = `  ${totalHours} Hours allocated for a week and ${remainingHours}  Hours remaining`;
  } else {
    total.style.color = "red";
    total.innerHTML = "Total hours per week exceeded";
  }
};

const display = () => {
  let str = "";
  const entryList = taskList.filter((item) => item.type === "entry");
  console.log(entryList);
  entryList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr} hrs</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="handleOnDelete('${
                      item.id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success" onclick="handleOnSwitch('${
                      item.id
                    }', 'bad')">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  taskListElm.innerHTML = str;
};
const displayBad = () => {
  let str = "";
  const badList = taskList.filter((item) => item.type === "bad");
  badList.map((item, i) => {
    str += ` <tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                  <button class="btn btn-warning" onclick="handleOnSwitch('${
                    item.id
                  }', 'entry')">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button class="btn btn-danger" onclick="handleOnDelete('${
                      item.id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    
                  </td>
                </tr> `;
  });

  badListElm.innerHTML = str;
};
const handleOnDelete = (id) => {
  if (window.confirm("Are sure to delete this task")) {
    taskList = taskList.filter((item) => item.id !== id);
    display();
    displayBad();
  }
};
const handleOnSwitch = (id, type) => {
  if (window.confirm("Are you sure you want to change task type?")) {
    taskList.forEach((item) => {
      if (item.id == id) {
        item.type = type;
      }
    });
    display();
    displayBad();
  }
};
const charStr = "qwertyuioopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

const randomStr = () => {
  const strLength = 6;
  let str = "";
  for (let i = 0; i < strLength; i++) {
    str += charStr[Math.floor(Math.random() * charStr.length)];
  }
  return str;
};
