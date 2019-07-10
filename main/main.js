//const fixtures = require(".");

let allItems = loadAllItems();
let promotions = loadPromotions();

const getAllItemBarcode = () =>{
    let allItemBarcode = [];
    for(let i = 0; i < allItems.length; i++){
        allItemBarcode.push(allItems[i].barcode);
    }
    return allItemBarcode;
}

const isValid = (allItemBarcode,tags) => {
    for(let i = 0; i < tags.length; i++){
        if(tags[i].indexOf('-')!=-1){
            tags[i]=tags[i].split('-')[0];
        }
        if(allItemBarcode.indexOf(tags[i])==-1){
            console.log("false");
            return false;
        }
    }
    return true;
}

const getShopListIdCombineCount = (tags) => {
    let shopListIdCombineCount = [];
    tags.sort();
    var temp = {};
    for(let i = 0; i < tags.length; i++) {
        for(let j = 0; j < tags.length; j++) {
            for(let k=0;k<promotions.length;k++){
                temp.barcode = tags[i];
                temp.count = 1;
                if(tags[i] === tags[j]){
                    ++temp.count;
                }else{
                    shopListIdCombineCount.push(temp);
                    temp = {};
                }
            }
        }
    }
    return shopListIdCombineCount;
}

const printReciepe=(tags)=>{
    if(!isValid(allItemBarcode,tags)){
        return "errer";
    }
    var foodItemList=getShopListIdCombineCount(tags);
    var str = "";
    var total=0;
    var save=0;
    str += `***<没钱赚商店>收据***\n`;
    items.map((value) => {
        if(map.has(value.barcode)){
            str += `名称：${value.name}，数量：${value.unit.toFixed(2)}，单价：${value.price}(元)，小计：${(map.get(value.barcode) * value.price.toFixed(2))}(元)\n`;
            //....
        }
    });
    str += `----------------------
总计：${total.toFixed(2) }(元)
节省：${save.toFixed(2) }(元)
**********************`;

}