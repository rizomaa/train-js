// BUDGET CONTROLLER - here we define data structure

var budgetController = (function() {
  
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    
     Expense.prototype.calcPercentage = function(totalIncome) { 
         
         if (totalIncome > 0) {
            this.percentage = Math.round (this.value / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
     };
     
     Expense.prototype.getPercentage = function () {
         return this.percentage;
     };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var calculateTotal = function(type) {
        var sum = 0;
        
        // type can be inc or exp
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;    
        });
        
        data.totals[type] = sum;

    }
    
    var data = {
        allItems: {
            exp: [],
            inc: [] 
        },
        totals: {
            exp: 0,
            inc: 0 
        },
        
        budget: 0,
        percentage: -1
    }
    
    
    return {
        addItem: function(type, des, val) {
            
            var newItem, ID;
                        
            //Create a new ID 
            
            if (data.allItems[type].length === 0) {
                ID = 0;   
            } else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            
            
            //Create a new item based on 'exp' or 'inc' types
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);    
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);    
            }
            
            //Push it our data structure 
            data.allItems[type].push(newItem);
            
            //Return a new element
            return newItem; 
             
        },
        
        deleteItem: function(type, id) {
            
            var ids, index;
            //data.allItems[type][id]
            
            // return array in new var
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
                        
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculateBudget: function() {
            
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //Calculate the budget  Income - Expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //Calculate percentage of the budget we have spent            
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);    
            } else {
                data.percentage = -1;
            }
            
            
        },
        
        calculatePercentages: function() {
             
             //foreach only go thro the array, map - can change
            data.allItems.exp.forEach(function (cur) {
                  cur.calcPercentage(data.totals.inc); 
            }); 
             
         },
        
        getPercentages: function() {
            
            var allPerc =  data.allItems.exp.map(function(cur) {
               return cur.getPercentage();
            });
            return allPerc;
             
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
})();


    

// UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        indputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    
    
    var formatNumber = function(num, type) {
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');

        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        return (type === 'exp'? '-':'+') + int + '.' + dec;
    };
    
   var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.indputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };            
        },
        
        addListItem: function(obj, type) {
            
            var html, newHtml, element;
            
            //Create HTML string with placeholder text
            
            if (type === 'inc') {
                
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            } else if (type === 'exp') {
                
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">---</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            }
            
            //Replace placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);            
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            
            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID);
            
            // we can only delete a child evement from parent element
            el.parentNode.removeChild(el);
        },
        
        clearFields: function() {
            
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.indputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = '';
                current.description = '';
            });
            
            //focus cursor on description
            fieldsArr[0].focus();
            
        },
        
        displayBudget: function(obj) {
            
            var type = obj.budget >= 0? 'inc':'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        
        displayPercentages: function(percentages) {
             
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';    
                } else {
                    current.textContent = '---';
                }
                
            });
            
            
        },
        
        displayMonth: function() {
          
            var now, year, month, day, months;
            now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            year = now.getFullYear();
            month = months[now.getMonth()];
            day = now.getDate();
            
            document.querySelector(DOMstrings.dateLabel).textContent = year + ' ' + month + ' ' + day;
            
        },
        
        changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.indputDescription + ',' + 
                DOMstrings.inputValue); // + '' + DOMstrings.inputBtn);


            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
            
        },
        
        getDOMstrings: function() {
               return DOMstrings;
        }
    }
     
})();



// GLOBAL APP CONTROLLER - will delegate functions to other controllers
var controller = (function(budgetCtrl, UICtrl) {
    
    
    
    var setupEventListeners = function() {
        
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);  
     
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();            
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
    }
    
    var updateBudget = function () {
        
        // 1. Calculate the budget 
        budgetCtrl.calculateBudget();
        
        // 2. Return budget 
        var budget = budgetCtrl.getBudget();
                
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
               
       // console.log(budget);
        
    };    
    
    var updatePercentage = function() {
        
        // 1. Calculate percentage
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentage from budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with a new percentage
        UICtrl.displayPercentages(percentages);
        console.log(percentages);
    }
  
       
    var ctrlAddItem = function() {
        
        var input, newItem;
        
        // Create TO-DO list here
        
        // 1. Get input data
        input = UICtrl.getInput();        
        
        // NaN = Not a Number 
        if (input.value !== 'NaN' && input.description !== '' && input.value > 0) {
        
            // 2. To add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add new item to the user interface
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();  

            //5. Calculate and update budget
            updateBudget(); 
            
            //6. Calculate and update percentage
            updatePercentage();
            
        }

    };
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentElement.id;
        
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. Delete Item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete Item from UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show of all items and budget
            updateBudget(); 
            
            //7. Calculate and update percentage
            updatePercentage();
        }
    };
    
    return {
        init: function() {
            console.log('Application has started.');
           
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);


    controller.init();