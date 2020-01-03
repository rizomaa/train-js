class cityObject {
    constructor (name, foundationDate) {
        this.name = name;
        this.foundationDate = foundationDate;
    }    
}

class Park extends cityObject {
    
    constructor(name, foundationDate, treesNumber, area) {
        super(name, foundationDate);
        this.area = area;
        this.treesNumber = treesNumber;
    }
    
    treeDensity(parksList, parkNumber = 3) {     
        
        const arrDensity = parksList.map(cur => {
            let rest = cur.treesNumber / cur.area;
            cur.density = rest.toFixed(2);
            return console.log(`${cur.name} has ${cur.density} density of trees.`);
        }) ;
    }
    
    averageAge(parksList, parkNumber = 3) {
        
        const dataNow = new Date().getFullYear();
        
        const sum = parksList.reduce((prev, cur) => prev + (dataNow - cur.foundationDate), 0);
       
    /*    let sum = 0;        
        for (const element of parksList) {
            sum += dataNow - element.foundationDate;
        } */
        return sum / parkNumber;
        
    }
    
    getParkName(parksList, maxLimit = 1000) {                
        parksList.forEach(cur => {
            cur.treesNumber > maxLimit ? console.log(`A park with more than 1000 trees is ${cur.name}.`) : ''
        });
    }   
    
}

class Street extends cityObject {
    constructor(name, foundationDate, length) {
       super(name, foundationDate);
       this.length = length;
    }
    
    totalLength(listStreets) {
        
        let sum = 0;  
        listStreets.forEach(cur => {
          typeof(cur.length) === 'number' ? sum += cur.length : cur.length = -1;
        });
        return sum;
    }
    
    averageLength(totalLength, streetNumber = 4) {        
        return totalLength / streetNumber;
    }
        
    classifyStreets(listStreets, defaulSize = 'normal') {
        
        listStreets.forEach(cur => {
            switch (typeof(cur.length) === 'number') {
                case (cur.length <= 1 && cur.length > 0):
                    cur.size = 'tiny';
                    break;
                case (cur.length > 1 && cur.length <= 2):
                    cur.size = 'small';
                    break;
                case (cur.length > 2 && cur.length <= 3):
                    cur.size = 'normal';
                    break;
                case (cur.length > 3 && cur.length <= 4):
                    cur.size = 'big';
                    break;
                case (cur.length > 4):
                    cur.size = 'huge';
                    break;
                default: cur.size = defaulSize; cur.length = '--';
            }
            console.log(`${cur.name} (built in ${cur.foundationDate}) is ${cur.size} and has length ${cur.length} kilometres.`);
        });
        
    }  
        
}
    
let listParks = [
    new Park('Central Park', 1925, 999, 2),
    new Park('Central Park2', 1965, 2500, 4),
    new Park('Central Park3', 1988, 600, 1)    
];

let listStreets = [
    new Street('Mahiliouskaja', 1900, 2),
    new Street('Aranskaja', 1905, 5),
    new Street('Zmitraka', 1922),
    new Street('Belskava', 1945, 3)
];

function reportPark(p) {
    console.log('-----------------Parks report----------------------');
    const repPark = new Park();
    
    // Density
    repPark.treeDensity(p);
    
    console.log(`Average age of all parks in the city is ${repPark.averageAge(p).toFixed(2)} years old.`);
    
    // more than 1000 trees
    repPark.getParkName(p);
}

function reportStreet(s) {
    console.log('-----------------Streets report----------------------');
    const repStreet = new Street();
    let totLength = repStreet.totalLength(s);
    console.log(`All streets in the city have ${totLength} kilometres.`);
    console.log(`Average length of them is ${repStreet.averageLength(totLength)} kilometres.`);
    repStreet.classifyStreets(s);
}

reportPark(listParks);
reportStreet(listStreets);