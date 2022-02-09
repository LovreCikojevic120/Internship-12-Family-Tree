const familyTree = [
	root = {
		name: 'sdvjnsdvk',
		surname:'skdjfbskd',
		gender: 'male',
		parents: [],
		children: [],
		companion: rootCompanion,
		birthYear: 1900,
		deathYear: 1944
	},

	rootCompanion = {
		name: 'rtuzrmlnw',
		surname:'skdjfbskd',
		oldSurname: 'gbjndlvdd',
		gender: 'female',
		parents: [],
		children: [],
		companion: root,
		birthYear: 1902,
		deathYear: 1956 
	},

	rootChild1 = {
		name: 'rtuzrmlnw',
		surname:'skdjfbskd',
		gender: 'female',
		parents: [root, rootCompanion],
		children: [],
		companion: null,
		birthYear: 1922,
		deathYear: 1978 
	},

	rootChild2 = {
		name: 'rtuzrmlnw',
		surname:'skdjfbskd',
		gender: 'male',
		parents: [root, rootCompanion],
		children: [],
		companion: null,
		birthYear: 1924,
		deathYear: 1990 
	}
]

const mainMenuChoices = {
    AddNewMember: 1,
    AddFamilyDeath: 2,
    ShowStatistics: 3,
    Exit: 0,
};

let menuChoice;

while (menuChoice !== 0) {
    menuChoice = parseInt(
        prompt(
            "Welcome, choose menu option:\n" +
                "1 - Add a family member\n" +
                "2 - Input family death\n" +
                "3 - Statistics\n" +
                "0 - Exit application"
        )
    );

    console.log(menuChoice);

    switch (menuChoice) {
        case mainMenuChoices.AddNewMember:
            AddMember();
            break;
        case mainMenuChoices.AddFamilyDeath:
            InputDeath();
            break;
        case mainMenuChoices.ShowStatistics:
            Statistics();
            break;
        case mainMenuChoices.Exit:
            break;
        default:
            HandleError();
            break;
    }
}

function AddMember() {
    let inputMemberMenuChoice;

    while (inputMemberMenuChoice !== 0) {
        inputMemberMenuChoice = parseInt(
            prompt("1 - Child\n2 - Marriage companion\n0 - Back to main menu")
        );

        switch (inputMemberMenuChoice) {
            case 1:
                InputChild();
                break;
            case 2:
                InputCompanion();
                break;
            case 0:
                return;
            default:
                HandleError();
                break;
        }
    }
}

function InputCompanion() {
    const person = {};
    person.name = StringInput("name");
    person.surname = StringInput("surname");
	person.father = familyTree.findIndex(person => person);
    familyTree.push(person);
}

function InputChild() {
    alert("child");
}

function InputDeath() {
    alert("ded");
}

function Statistics() {
    alert("stst");
}

function HandleError() {
    alert("error");
}

function StringInput(inputType) {
    let result;

    while (result !== "") {
        result = prompt(
            `Insert ${inputType}, to cancel input enter empty string`
        );

        if (result !== " " && isNaN(result)) return result;
    }
}
