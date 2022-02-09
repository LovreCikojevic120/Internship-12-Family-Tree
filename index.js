class Person {
    constructor(
        name,
        surname,
        gender,
        birthYear,
        deathYear,
        father,
        mother,
        companion
    ) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthYear = birthYear;
        this.deathYear = deathYear;
        this.father = father;
        this.mother = mother;
        this.companion = companion;
    }
}

let menuChoice;

while (menuChoice !== 0) {
	
    menuChoice = parseInt(
        prompt(
            "Welcome, choose menu option:\n"+
			"1 - Add a family member\n"+
			"2 - Input family death\n"+
			"3 - Statistics\n"+
			"0 - Exit application"
        )
    );

	console.log(menuChoice);

    switch (menuChoice) {
        case 1:
            AddMember();
            break;
        case 2:
            InputDeath();
            break;
        case 3:
            Statistics();
            break;
        case 0:
            break;
        default:
            HandleError();
            break;
    }
}

function AddMember() {
    let inputMemberMenuChoice = prompt("");
	alert('add');
}

function InputDeath(){
	alert('ded');
}

function Statistics(){
	alert('stst');
}

function HandleError(){
	alert('error');
}
