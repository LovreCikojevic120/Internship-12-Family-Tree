const familyTree = [
    (root = {
        name: 'Ivan',
        surname: 'Ivic',
        gender: 'Male',
        children: [],
        birthYear: 1900,
        deathYear: 1944,
        outsider: false,
    }),
    (rootCompanion = {
        name: 'Marija',
        surname: 'Ivic',
        oldSurname: 'Bilic',
        gender: 'Female',
        children: [],
        companion: root,
        birthYear: 1902,
        deathYear: 1956,
        outsider: true,
    }),
    (rootChild1 = {
        name: 'Ela',
        surname: 'Ivic',
        gender: 'Female',
        parents: [root, rootCompanion],
        children: [],
        birthYear: 1922,
        outsider: false,
    }),
    (rootChild2 = {
        name: 'Mario',
        surname: 'Ivic',
        gender: 'Male',
        parents: [root, rootCompanion],
        children: [],
        birthYear: 1924,
        outsider: false,
    }),
];

familyTree[0].companion = rootCompanion;
familyTree[0].children.push(rootChild1, rootChild2);
familyTree[1].children.push(rootChild1, rootChild2);

console.log(familyTree);

const mainMenuChoice = {
    AddNewMember: 1,
    AddFamilyDeath: 2,
    ShowStatistics: 3,
    Exit: 0,
};

const memberMenuChoice = {
    AddChild: 1,
    AddCompanion: 2,
    Exit: 0,
};

const statMenuChoice = {
    Ancestors: 1,
    Siblings: 2,
    AvgAge: 3,
    TableOfNames: 4,
    TreePrint: 5,
    PersonDetails: 6,
    Exit: 0
}

let menuChoice;

while (menuChoice !== 0) {
    menuChoice = parseInt(
        prompt(
            'Welcome, choose menu option:\n' +
                '1 - Add a family member\n' +
                '2 - Input family death\n' +
                '3 - Statistics\n' +
                '0 - Exit application'
        )
    );

    switch (menuChoice) {
        case mainMenuChoice.AddNewMember:
            AddMember();
            break;
        case mainMenuChoice.AddFamilyDeath:
            InputDeath();
            break;
        case mainMenuChoice.ShowStatistics:
            Statistics();
            break;
        case mainMenuChoice.Exit:
            break;
        default:
            alert('Incorrect menu choice!');
            break;
    }
}

function AddMember() {
    let inputMemberMenuChoice;

    while (inputMemberMenuChoice !== 0) {
        inputMemberMenuChoice = parseInt(
            prompt('1 - Child\n2 - Marriage companion\n0 - Exit to main menu')
        );

        switch (inputMemberMenuChoice) {
            case memberMenuChoice.AddChild:
                InputChild();
                break;
            case memberMenuChoice.AddCompanion:
                InputCompanion();
                break;
            case mainMenuChoice.Exit:
                return;
            default:
                alert('Incorrect menu choice!');
                break;
        }
    }
}

function InputCompanion() {
    const person = {};

    person.children = [];
    person.outsider = true;

    person.name = StringInput('name');
    if (person.name === '') return;

    person.gender = GenderInput();
    if (person.gender === '') return;

    person.birthYear = YearInput('birth year');
    if (person.birthYear === '') return;

    person.companion = CompanionInput(person.birthYear);
    if (person.companion === '') return;
    else familyTree[familyTree.indexOf(person.companion)].companion = person;

    if (person.gender === 'Female'){
        
        person.oldSurname = StringInput('old surname');
        if (person.oldSurname === '') return;
        person.surname = person.companion.surname;
    }
    else {
        person.surname = StringInput('surname');
        if (person.surname === '') return;

        person.companion.surname = person.surname;
    }

    familyTree.push(person);
    alert('Companion added!');
    return;
}

function InputChild() {
    const person = {};

    person.name = StringInput('name');
    if (person.name === '') return;

    person.gender = GenderInput();
    if (person.gender === '') return;

    person.birthYear = YearInput('birth year');
    if (person.birthYear === '') return;

    person.parents = ChildParentInput(person.birthYear);
    if (person.parents === '') return;
    else {
        for (let parent of person.parents) {
            familyTree[familyTree.indexOf(parent)].children.push(person);
            person.surname = parent.surname;
        }
    }

    person.outsider = false;
    person.children = [];

    familyTree.push(person);
    alert('Child added!');
    return;
}

function InputDeath() {
    let chosenIndex, person;

    while (chosenIndex !== '') {
        chosenIndex = prompt(`Insert number for person\n${PrintTree(0, '')}`);
        person = familyTree[chosenIndex];

        if (person && !('deathYear' in person)) {
            let yearOfDeath = YearInput('year of death');
            if (yearOfDeath === '') return;

            if (yearOfDeath >= person.birthYear && (yearOfDeath - person.birthYear) < 120) {
                familyTree[chosenIndex].deathYear = yearOfDeath;
                alert('Death recorded, rest in RIP!');
                return;
            }

            alert('Invalid year!');
        } else alert('Person doesn\'t exsist or is already dead!');
    }
}

function CompanionInput(birthyear) {
    let indexChoice, person;

    while (indexChoice !== '') {
        indexChoice = prompt(
            `Insert number for companion\n${PrintTree(0, '')}`
        );
        person = familyTree[indexChoice];

        if (person) {
            if (person.companion)
                alert('Chosen person already has a companion');
            else if ('deathYear' in person)
                alert('Chosen person is dead!');
            else if(Math.abs(person.birthYear - birthyear) > 100)
                alert('Age difference too large');
            else return person;
        }

        else alert('Chosen person doesn\'t exsist');
    }
    return indexChoice === '' ? indexChoice : person;
}

function ChildParentInput(childBirthYear) {
    let indexChoice, person;

    while (indexChoice !== '') {
        indexChoice = prompt(`Insert number for parent\n${PrintTree(0, '')}`);
        person = familyTree[indexChoice];

        if (person && person.surname === root.surname) {
            if (!person.companion || ('deathYear' in person))
                alert('Chosen person either died or doesn\'t have a companion');
            else if(person.gender === person.companion.gender)
                alert('Companions with equal gender can\'t have children!');
            else if(childBirthYear - person.birthYear < 18 || childBirthYear - person.companion.birthYear < 18)
                alert('One of the parents are underaged')
            else
                return [person, person.companion];
        }

        if(!person) alert('Chosen person doesn\'t exsist');
        else alert('Cannot add a child to outsiders!');
    }
    
    return indexChoice;
}

function Statistics() {
    let menuChoice;

    while (menuChoice !== 0) {
        menuChoice = parseInt(
            prompt(
                'Choose statistics option:\n' +
                    '1 - Show ancestors\n' +
                    '2 - Show brothers and sisters\n' +
                    '3 - Average age by gender\n' +
                    '4 - Show table of names\n' +
                    '5 - Show family tree\n' +
                    '6 - Show person details\n' +
                    '0 - Exit statistics'
            )
        );

        switch (menuChoice) {
            case statMenuChoice.Ancestors:
                ShowGeneration(0);
                break;
            case statMenuChoice.Siblings:
                ShowSiblings();
                break;
            case statMenuChoice.AvgAge:
                AverageAgeByGender();
                break;
            case statMenuChoice.TableOfNames:
                NameTable();
                break;
            case statMenuChoice.TreePrint:
                alert(PrintTree(0, ''));
                break;
            case statMenuChoice.PersonDetails:
                PrintPersonDetails();
                break;
            case statMenuChoice.Exit:
                return;
            default:
                alert('Incorrect menu choice!');
                break;
        }
    }
}

function GenerationNumber(person, genNumber){

    if(person.parents){
        for(parent in person.parents)
            if(!parent.outsider)
                ancestor = parent;

        genNumber += GenerationNumber(parent, ++genNumber);
    }
        
    return genNumber;
}

function ShowGeneration(){
    let treeIndex, person;

    while (treeIndex !== '') {
        treeIndex = prompt(PrintTree(0, ''));
        person = familyTree[treeIndex];

        if (person) {
            alert(GenerationNumber(person, 0));
            return;
        }

        alert('Person doesn\'t exsist');
    }
}

function PrintPersonDetails() {
    let treeIndex, result, person;

    while (treeIndex !== '') {
        result = 'Details:\n';
        treeIndex = prompt(PrintTree(0, ''));
        person = familyTree[treeIndex];

        if (person) {
            for (let prop in person){
                switch(prop){
                    case 'parents', 'children':
                        result += `${prop}: `;
                        for(let item of person[prop])
                            result += `${item.name}, `;
                        result += '\n';
                        break;
                    case 'companion':
                        result += `${prop}: ${person[prop].name}\n`;
                        break;
                    case 'outsider':
                        break;
                    default:
                        result += `${prop}: ${person[prop]}\n`;
                        break;
                }

            }
        }
        if(treeIndex === '')return;

        alert(result);
    }
}

function NameTable() {
    const table = [];
    let result = '';

    for (let person of familyTree) {
        let tableIndex = table.find(
            (tableRow) => tableRow.name === person.name
        );

        if (tableIndex) {
            tableIndex.counter++;
        } else {
            let entry = { name: person.name, counter: 1 };
            table.push(entry);
        }
    }

    for (let row of table) result += `${row.name}: ${row.counter}\n`;

    alert(result);
}

function AverageAgeByGender() {
    let gender = GenderInput(), sum = 0.0, counter = 0.0, currentYear = new Date().getFullYear();
    if(gender === '')return;

    for (let person of familyTree) {
        if (!person.outsider && person.gender === gender) {

            if (person.deathYear) sum += person.deathYear - person.birthYear;
            else sum += currentYear - person.birthYear;

            counter++;
        }
    }

    alert(`Average age of all ${gender} family members is: ${parseFloat(sum / counter).toFixed(2)}`);
    return;
}

function ShowSiblings() {
    let treeIndex = prompt(PrintTree(0, ''));
    let parent = familyTree[treeIndex].parents[0];
    let result = 'Siblings:';

    for (let child of parent.children) {
        if(familyTree[treeIndex] !== child)
            result += `${child.name} ${child.surname}\n`;
    }

    alert(result);
    return;
}

function StringInput(inputType) {
    let result;

    while (result !== '') {
        result = prompt(
            `Insert ${inputType}, to cancel input leave field empty`
        );

        if (result !== ' ' && isNaN(result)) return result;

        alert('Incorrect input');
    }

    if (result === '') {
        alert('You canceled your input!');
        return result;
    }
}

function YearInput(yearType) {
    let result;

    while (result !== '') {
        result = prompt(
            `Insert ${yearType}, to cancel input leave field empty`
        );

        if (result !== ' ' && !isNaN(result)) return result;

        alert('Incorrect input');
    }

    if (result === '') {
        alert('You canceled your input!');
        return result;
    }
}

function GenderInput(){
    let result;

    while (result !== '') {
        result = prompt(
            `Insert gender as\nM for male\nF for female\nTo cancel input leave field empty.`
        );

        if(result === 'M' || result === 'F')return result === 'M' ? 'Male' : 'Female';

        alert('Incorrect input');
    }

    if (result === '') {
        alert('You canceled your input!');
        return result;
    }
}

function PrintTree(treeIndex, indent) {
    let result = '';
    indent += '    ';

    if (!familyTree[treeIndex]) return result;

    let person = familyTree[treeIndex];
    result += `${treeIndex} - ${person.name} ${person.surname}, ${person.birthYear} -`;

    if('deathYear' in person)result += ` ${person.deathYear}`;

    if (person.companion){
        let companion = person.companion;
        result += ` + ${familyTree.indexOf(companion)} - ${companion.name} ${companion.surname}, ${companion.birthYear} -`;

        if('deathYear' in companion)result += ` ${companion.deathYear}`;
    }
    result += '\n';

    if (familyTree[treeIndex].hasOwnProperty('children')) {
        for (let child of familyTree[treeIndex].children) {
            result += indent + PrintTree(familyTree.indexOf(child), indent);
        }
    }

    return result;
}