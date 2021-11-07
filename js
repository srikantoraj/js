let dataBase;
function myFunction(arg) {
    dataBase=arg;
    const a = arg;
    document.getElementById("price").innerText=a;
}

let name
let count_product = 0

let dataId;
function productDetailView(db,id){
   // console.log(db[id]['imageURL']);
   
   dataBase=db;
   dataId=id;
//    console.log(dataBase);

   name = db[id]['name']
    let image = document.getElementById("product_image").innerHTML= "<img src='" + db[id]['imageURL'] + "' alt=''>"
    let brief = document.getElementById("product_brief").innerText = db[id]['title']
    let price = document.getElementById("product_price").innerText = db[id]['price']

    let features = db[id]['features']
    //console.log(features)
    let lowerBound = features.length-2
    features = features.slice(2,lowerBound)
    //console.log(features)
    let fet_list = features.split("\", \"" && "', '")
    let lists = ""
    for(let feature of fet_list){
        lists = lists + "<li>" + feature + "</li>"
    }
    document.getElementById("product_features").innerHTML = lists

    // document.getElementById("product_select").addEventListener('click',()=> productSelector(db[id], lists));
    
}

function productSelector(db){
    product_details = db[name]
    let features = product_details['features']
    let lowerBound = features.length-2
    features = features.slice(2,lowerBound)

    let fet_list = features.split("\", \"" && "', '")
    let lists = ""
    for(let feature of fet_list){
        list_fetures = lists + "<li>" + feature + "</li>"
    }

    let selectedList = document.getElementById("accordionsing").innerHTML;
    // selectedList.setAttribute()
    let card_fold = `<div class="card" >
                        <div class="card-header" id="">
                            <h5 class="d-flex align-items-center">
                                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse`+pad(count_product,2)+`" aria-expanded="false" aria-controls="collapse`+pad(count_product,2)+`">`+ product_details['name']+`</button>
                                <button onclick="deleteCard(event)" class="dlt-btn btn close_btn text-danger"><i class="ei ei-close"></i></button>

                            </h5>
                        </div>
                        <div id="collapse`+pad(count_product,2)+`" class="collapse" aria-labelledby="heading10" data-parent="#accordionsing" style="">
                            <div class="card-body">
                                <div class="product_details text-center">
                                    <div class="product_image p-0">
                                        <img src="`+ product_details['imageURL']+`" alt="">
                                    </div>
                                    <p>`+ product_details['title']+`</p>

                                    <div class="btn-group btn-block mb-3">
                                        <span class="btn btn-primary">Price: $`+ product_details['price']+`</span>
                                        <span class="btn btn-primary">Ratings:  ratings </span>
                                    </div>

                                    <ul class="text-left">
                                    `+ list_fetures +`
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`
    document.getElementById("accordionsing").innerHTML= selectedList + card_fold;

     count_product += 1
    // document.getElementById("numberOfSelecteds").innerText = count_product
    let childrenLenght= document.getElementById("accordionsing").children.length;
   document.getElementById("numberOfSelecteds").innerText=childrenLenght;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function deleteCard(event){
    let targetElement = event.target;
   let tempnode= targetElement.parentNode.parentNode.parentNode.parentNode.remove();
   let childrenLenght= document.getElementById("accordionsing").children.length;
   document.getElementById("numberOfSelecteds").innerText=childrenLenght;
}
   

document.getElementById("proceed").addEventListener('click',() =>{
    
var childOfAccordionsing = document.getElementById("accordionsing").children;
let  titleOfProducts1 =[];
let titleOfProducts2=[];
 for (var i = 0; i < childOfAccordionsing.length; i++) {
     titleOfProducts1[i] = childOfAccordionsing[i]?.children[0]?.children[0]?.children[0]?.innerText;
     titleOfProducts2[i] = childOfAccordionsing[i]?.children[0]?.children[0]?.children[0]?.innerText + " ";
}

let obj=dataBase;
let keys1=titleOfProducts1;
let keys2=titleOfProducts2;

function keysReduce (obj, keys) {
    return keys.reduce((acc, key) => {
      if(obj[key] !== undefined) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };
  
  function forInCompose (obj, keys) {
    const returnObj = {};
    for (const key in obj) {
      if(keys.includes(key)) {
        returnObj[key] = obj[key]
      }
    };
    return returnObj;
  };
  
   let  filterResults1= keysReduce(obj, keys1);   // contains title
   let filterResults2= forInCompose(obj, keys2); // contains title with extra space
let updatedObjects={...filterResults2,...filterResults1};
// console.log(filterResult);
postRequest(updatedObjects)


}
)

function postRequest(updatedObjects){
    const objectToString=JSON.stringify(updatedObjects);
document.getElementById("dataToBePosted").value=objectToString;
}
