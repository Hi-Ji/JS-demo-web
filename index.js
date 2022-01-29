let data_list = [];
let price_list = [];
category ();
price ();
Render(rawdata);
var count_url = 0;


function category () {
  data_list = [];
  price_list = [];
  var category_value = document.getElementById("category").value;
  for (let i of rawdata) {
    if (category_value == 0) {
      data_list.push(i);
    }else {
      if (i.categoryId == category_value) {
        data_list.push(i);
      }
    }
  }
  Render(data_list);
  url_check('category',category_value);
}


function price () {
  price_list = [];
  var price_value = document.getElementById("price").value;
  for (let i of data_list) {
    if (price_value == 100 && i.price <= 100){
      price_list.push(i);
    }else if (price_value == 200 && 101 <= i.price && i.price <= 200) {
      price_list.push(i);
    }else if (price_value == 500 && 201 <= i.price && i.price <= 500) {
      price_list.push(i);
    }else if (price_value == 501 && i.price >= 501) {
      price_list.push(i);
    }
  }
  
  if (price_value != 0) {
    Render(price_list);
  }else {
    Render(data_list);
  }
  url_check("price",price_value);
}

function Alph_ascending() {
  let ascending_list = [];
  let name_list = [];
  let price_list_length = price_list.length;
  if (price_list_length == 0) {
    for (let i of data_list) {
      name_list.push(i.title);
    }
    name_list.sort();
    for (let i of name_list) {
      for (let l of data_list) {
        if (i == l.title) {
          ascending_list.push(l);
          break;
        }
      }
    }
  }else {
    for (let i of price_list) {
      name_list.push(i.title);
    }
    name_list.sort();
    for (let i of name_list) {
      for (let l of price_list) {
        if (i == l.title) {
          ascending_list.push(l);
          break;
        }
      }
    }
  }
  Render(ascending_list);
  url_check("sort","alph_ascending");
}


function Alph_decending() {
  let ascending_list = [];
  let name_list = [];
  let price_list_length = price_list.length;
  if (price_list_length == 0) {
    for (let i of data_list) {
      name_list.push(i.title);
    }
    name_list.sort().reverse();
    for (let i of name_list) {
      for (let l of data_list) {
        if (i == l.title) {
          ascending_list.push(l);
          break;
        }
      }
    }
    Render(ascending_list);
  }else {
    for (let i of price_list) {
      name_list.push(i.title);
    }
    name_list.sort().reverse();
    for (let i of name_list) {
      for (let l of price_list) {
        if (i == l.title) {
          ascending_list.push(l);
          break;
        }
      }
    }
    Render(ascending_list);
  }
  url_check("sort","alph_decending");
}

function Price_ascending() {
  let ascending_list = [];
  let price_list_length = price_list.length;
  if (price_list_length == 0) {
    for (let i of data_list) {
      ascending_list.push(i);
    }
    for (var n=0; n < ascending_list.length;n++){
      for (var m=0; m < ascending_list.length;m++){
        if (ascending_list[n].price < ascending_list[m].price){
          let temp = ascending_list[n];
          ascending_list[n] =ascending_list[m];
          ascending_list[m] = temp;
        }
      }
    }
  }else{
    for (let i of price_list) {
      ascending_list.push(i);
    }
    for (var n=0; n < ascending_list.length;n++){
      for (var m=0; m < ascending_list.length;m++){
        if (ascending_list[n].price < ascending_list[m].price){
          let temp = ascending_list[n];
          ascending_list[n] =ascending_list[m];
          ascending_list[m] = temp;
        }
      }
    }
  }
  Render(ascending_list);
  url_check("sort","pric_ascending");
}


function Price_decending() {
  let ascending_list = [];
  let price_list_length = price_list.length;
  if (price_list_length == 0) {
    for (let i of data_list) {
      ascending_list.push(i);
    }
    for (var n=0; n < ascending_list.length;n++){
      for (var m=0; m < ascending_list.length;m++){
        if (ascending_list[n].price > ascending_list[m].price){
          let temp = ascending_list[n];
          ascending_list[n] =ascending_list[m];
          ascending_list[m] = temp;
        }
      }
    }
  }else{
    for (let i of price_list) {
      ascending_list.push(i);
    }
    for (var n=0; n < ascending_list.length;n++){
      for (var m=0; m < ascending_list.length;m++){
        if (ascending_list[n].price > ascending_list[m].price){
          let temp = ascending_list[n];
          ascending_list[n] =ascending_list[m];
          ascending_list[m] = temp;
        }
      }
    }
  }
  url_check("sort","pric_decending");
  Render(ascending_list);
}

function url_check(url_name,url_num){
  var url_search = window.location.search;

  if (url_search.indexOf('?')==-1){
    url_add('?',url_name,url_num);

  }else{
    if (url_search.indexOf(url_name)==-1) {

      url_add('&',url_name,url_num);
    }else{
      replace_url(url_name,url_num);
      console.log(url_name)
    }
  }
}


function url_add(sign,name,num){
  var url = location.href + sign + name +'='+ num;
  history.pushState({},"",url);
}


function replace_url(url_name,url_num){
  var oUrl = this.location.href.toString();
  var re = eval('/('+url_name+'=)([^&]*)/gi');
  var nUrl = oUrl.replace(re,url_name+'='+url_num);
  console.log(nUrl);
  history.replaceState(0,0,nUrl);
  
}

function reset(){
  var url = window.location.href;
  var new_url1 = url.indexOf("?");
  var new_url = url.substring(0, new_url1);
  window.location.replace(new_url);
}




function Render(data_list){
  let infor = '';
  let count = 0;
  var type_id = document.getElementById("category").value;
  for (let i of data_list) {
    if (i.productMedia[0] && i.productMedia[0].url) {
      let imgAddre = "https://storage.googleapis.com/luxe_media/wwwroot/" + i.productMedia[0].url;
      let detailaddress = "./detail.html?prodId=" + i.prodId;
      count += 1;

      infor += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 fff" style="text-align: center;">
        <a href="${detailaddress}" style="color: grey;text-decoration:none;">
          <img src="${imgAddre}" style="max-width: 200px; width: 100%;  height: 150px;">
          <p>${i.title}</p>
          <p>$ ${i.price}</p>
        </a>
      </div>`
    }
  }
  if (count != 0) {
    document.getElementById('item').innerHTML = infor;
  }else{
    let sorry = `<div class="sorry">Sorry, cannot find the product.</div>`;
    document.getElementById('item').innerHTML = sorry;
  }
  
  
}


