
var tit
var desc
var itemJsonAr
a = document.getElementById('add_btn')
function clr_db() {
    if (confirm("Do You Want To clear ?")) {
        localStorage.clear()
        tbody.innerHTML = ""
        document.getElementById('nolist').innerHTML = "List is Empty!"
    }
}
function update_db() {

    tit = document.getElementById('Tt_txt').value
    desc = document.getElementById('dsc_txt').value

    if (localStorage.itemJson == null) {
        document.getElementById('nolist').innerHTML = ""
        itemJsonAr = [] //new array generated
        if (tit == "" && desc == "") {
            alert('Please fill atleast one block')
            return
        }
        else {
            itemJsonAr.push([tit, desc]) //a new element is pushed within the array
            localStorage.setItem('itemJson', JSON.stringify(itemJsonAr))  //itemJsonAr is the stringfyed value assigned to the key itemjson
        }
    }
    else //if itemJson exists
    {
        document.getElementById('nolist').innerHTML = ""
        itemJsonArSTr = localStorage.getItem('itemJson')  //value being assigned to itemJsonArStr
        itemJsonAr = JSON.parse(itemJsonArSTr) //destringifying 
        if (tit == "" && desc == "") {
            alert('Please fill atleast one block')
            return
        }
        else {
            itemJsonAr.push([tit, desc]) //a new element is pushed within the array
            localStorage.setItem('itemJson', JSON.stringify(itemJsonAr))  //itemJsonAr is the stringfyed value assigned to the key itemjson
        }
    }

}

function populate_tbl() {
    itemJsonArSTr = localStorage.getItem('itemJson')  //value being assigned to itemJsonArStr
    itemJsonAr = JSON.parse(itemJsonArSTr) //destringifying 
    //getting JSONAR from the local storage
    //populate table , adding data to the table
    let tablebody = document.getElementById('tbody')
    let str = ""
    //foreach(function) is loop will run on e elements
    //for each has the abiliti not to run if itemJsonAr is empty
    //the at x index , there are 2 values in e element , element[0] title , element[1] description

    itemJsonAr.forEach((element, index) => {
        str += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td><button class="btn btn-primary btn-sml" onclick=item_del(${index})>Delete</button></td>
        </tr>
        `


    });
    document.getElementById('tbody').innerHTML = str

}

function click_btn() {
    update_db()
    populate_tbl()
}

function item_del(index_p) {

    itemJsonArSTr = localStorage.getItem('itemJson')  //value being assigned to itemJsonArStr
    itemJsonAr = JSON.parse(itemJsonArSTr) //destringifying 
    itemJsonAr.splice(index_p,1)
    localStorage.setItem('itemJson',JSON.stringify(itemJsonAr))
    populate_tbl()

}
a.addEventListener("click", click_btn)
if (localStorage.getItem('itemJson') != null)
    populate_tbl() // calling 1 time
else
    document.getElementById('nolist').innerHTML = "List is Empty!"

