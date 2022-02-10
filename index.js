const familyTree = [
    (root = {
        name: "sdvjnsdvk",
        surname: "skdjfbskd",
        gender: "male",
        parents: [],
        children: [],
        companion: null,
        birthYear: 1800,
        deathYear: 1844,
    }),
    (rootCompanion = {
        name: "tzhnjthk",
        surname: "skdjfbskd",
        oldSurname: "gbjndlvdd",
        gender: "female",
        parents: [],
        children: [],
        companion: root,
        birthYear: 1802,
        deathYear: 1856,
    }),
    (rootChild1 = {
        name: "posjdvo",
        surname: "skdjfbskd",
        gender: "female",
        parents: [root, rootCompanion],
        children: [],
        companion: null,
        birthYear: 1822,
        deathYear: null,
    }),
    (rootChild2 = {
        name: "veivbw",
        surname: "skdjfbskd",
        gender: "male",
        parents: [root, rootCompanion],
        children: [],
        companion: null,
        birthYear: 1824,
        deathYear: null,
    }),
];

familyTree[0].companion = rootCompanion;
familyTree[0].children.push(rootChild1, rootChild2);
familyTree[1].children.push(rootChild1, rootChild2);

console.log(familyTree);

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
            HandleError("Incorrect menu choice!");
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
                HandleError("Incorrect menu choice!");
                break;
        }
    }
}

function InputCompanion() {
    const person = {};

    person.name = StringInput("name");
    if (person.name === "") return;

    person.surname = StringInput("surname");
    if (person.surname === "") return;

    person.birthYear = YearInput("birth year");
    if (person.birthYear === "") return;

    person.gender = StringInput("gender");
    if (person.gender === "") return;

    if (person.gender === "female")
        person.oldSurname = StringInput("old surname");
    if (person.oldSurname === "") return;

    person.companion = ObjectInput("companion");
    if (person.companion === "") return;
    else familyTree[familyTree.indexOf(person.companion)].companion = person;

    familyTree.push(person);
    alert("Companion added!");
}

function InputChild() {
    const person = {};

    person.name = StringInput("name");
    if (person.name === "") return;

    person.birthYear = YearInput("birth year");
    if (person.birthYear === "") return;

    person.gender = StringInput("gender");
    if (person.gender === "") return;

    person.parents = ObjectInput("child");
    if (person.parents === "") return;
    else {
        for(let parent of person.parents)
            familyTree[familyTree.indexOf(parent)].children.push(person);
    }

    familyTree.push(person);
    alert("Child added!");
}

function InputDeath() {
    alert("ded");
}

function Statistics() {
    alert("stst");
}

function HandleError(errorMessage) {
    alert(errorMessage);
}

function ObjectInput(inputType) {
    let indexChoice;
    let treePrint = PrintTree(0);

    if (inputType === "companion") {
        while (indexChoice !== "") {
            let indexChoice = prompt(
                `Insert number for companion\n${treePrint}`);

            if (familyTree[indexChoice].companion)
                HandleError("Chosen person already has a companion!");
            if (familyTree[indexChoice].companion.deathYear)
                HandleError("Chosen person DED!");
        }
        return indexChoice === "" ? indexChoice : familyTree[indexChoice];
    }

    if(inputType === "child"){
        while (indexChoice !== "") {
            let indexChoice = prompt(
                `Insert number for parent\n${treePrint}`);

            if (!familyTree[indexChoice].companion)
                HandleError("Chosen person doesn\'t have a partner!");
            if (familyTree[indexChoice].companion.deathYear)
                HandleError("Chosen person DED!");
        }
        if(indexChoice === "")return indexChoice;
        return [familyTree[indexChoice], familyTree[indexChoice].companion];
    }
}

function StringInput(inputType) {
    let result;

    while (result !== "") {
        result = prompt(
            `Insert ${inputType}, to cancel input leave field empty`
        );

        if (result !== " " && isNaN(result)) return result;
    }

    if (result === "") {
        HandleError("You canceled your input!");
        return result;
    }
}

function YearInput(inputType) {
    let result;

    while (result !== "") {
        result = prompt(
            `Insert ${inputType}, to cancel input leave field empty`
        );

        if (result !== " " && !isNaN(result)) return result;
    }
}

function PrintTree(treeIndex) {
    let result = "";
    if (!familyTree[treeIndex]) return result;

    let person = familyTree[treeIndex];
    result += `${treeIndex} ${person.name}`;

    if (person.companion)
        result += `---${familyTree.indexOf(person.companion)} ${
            person.companion.name
        }\n`;
    else result += "\n";

    if (familyTree[treeIndex].hasOwnProperty("children")) {
        for (let child of familyTree[treeIndex].children) {
            result += PrintTree(familyTree.indexOf(child));
        }
    }

    return result;
}
