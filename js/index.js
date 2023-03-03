const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g;

function addTask() {
	const reminderList = document.getElementById('reminder-list');
	let hour;
	while (!regex.test(hour)) {
		hour = prompt('Digite a hora escolhida! (hh:mm)');
	}
	const message = prompt('Digite sua mensagem: ');
	document.getElementById('hidden').style.display = 'none'
	reminderList.appendChild(createLi(hour, message));
    updateDate()
}
function createLi(hour, message) {
	const createItem = document.createElement('li');
	createItem.classList.add('reminder-item');
	createItem.classList.add(`date-${date.getFullYear()}${date.getMonth()}`);
	createItem.setAttribute('hora',`${Number(hour.replace(":",""))}`)
	createItem.innerHTML = `
  <div>${message}</div>
  <div>${hour}</div>
 `;
	return createItem;
}

const date = new Date();

function updateDate() {
	document.getElementById("display-date").innerHTML = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

	let tasksUl = document.querySelectorAll("#reminder-list li");
    tasksUl = Array.from(tasksUl).sort((a,b)=>a.getAttribute('hora')-b.getAttribute('hora')).filter(item => item.getAttribute('id')!='hidden')
    // console.log(tasksUl)
    updateLayout()
	for (let t = 0; t < tasksUl.length; t++){
        document.querySelector("#reminder-list").appendChild(tasksUl[t])
		if(tasksUl[t].classList.contains(`date-${date.getFullYear()}${date.getMonth()}`)) {
            tasksUl[t].style.display = "flex";
            document.getElementById('hidden').style.display = 'none'
		} else {
			tasksUl[t].style.display = "none";
            document.getElementById('hidden').style.display = 'block'
		}
	}

}

updateDate();

function addMonthInDate() {
	date.setMonth(date.getMonth() + 1);
	updateDate();
}

function minusMonthInDate() {
	date.setMonth(date.getMonth() - 1);
	updateDate();
}

function updateLayout(){
    document.querySelector("#reminder-list").innerHTML=""
    const createItem = document.createElement('li');
    createItem.classList.add('reminder-item')
    createItem.setAttribute('id', 'hidden')
    createItem.innerHTML = "<div>Nenhum lembrete cadastrado ainda</div>"
    document.querySelector("#reminder-list").appendChild(createItem)
}