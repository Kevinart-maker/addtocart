import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://realtime-fe33b-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingList = ref(database, "shoppingList")

let input = document.querySelector('input');
let inputBtn = document.querySelector('button')
let parentList = document.querySelector('#shopping-list')

inputBtn.addEventListener('click', function(){
    let inputValue = input.value

    if(inputValue === ''){
        console.log("An error has occured")
    }else{
        push(shoppingList, inputValue)

        emptyInput();

        console.log(`${inputValue} has been added to cart`)
    }
})

onValue(shoppingList, function(snapshot){
    if(snapshot.exists()){
    clearShoppingListEl()
    let itemsArray = Object.entries(snapshot.val())
    for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            console.log(itemsArray[i])
            appendLists(currentItem)
        }
    }else {
        parentList.innerHTML = "No items here.. yet"
    }
    // console.log(snapshot.val())

})

function clearShoppingListEl(){
    parentList.innerHTML = '';
}
function emptyInput () {
    input.value = '';
}
function appendLists (item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li');

    newEl.textContent = itemValue
    newEl.addEventListener('click', function(){
        let exactItem = ref(database, `shoppingList/${itemID}`)
        remove(exactItem);
    })

    parentList.append(newEl)
}