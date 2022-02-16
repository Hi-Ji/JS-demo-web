let data_list = rawdata;
let temp_list = [];
var temp_num = 0;
var last_num_position = 0;

distribution();

function distribution() {
  last_num_position = 0;
  data_list = [];

  let category_list = [];
  let price_list = [];
  const params = new URLSearchParams(window.location.search);

  for (let i of rawdata) {
    category_list.push(i);
    price_list.push(i);
  }

  for (const param of params){
    if (param[0] == 'category'){
      if (param[1] != 0){
        category_list = category(param[1]);
      }
      var selId_category = document.getElementById('category');
      selId_category.value = param[1];
    }else if (param[0] == 'price'){
      if (param[1] != 0){
        price_list = price(param[1]);
      }
      var selId_price = document.getElementById('price');
      selId_price.value = param[1];
    }
  }
  
  for (let i of category_list){
    for (let l of price_list){
      if (i == l) {
        data_list.push(l);

        break;
      }
    }
  }

//----------------------------------------------------------
  for (const param of params){
    if (param[0] == 'sort'){
      if (param[1] == 'Alph_ascending'){
        data_list = Alph_ascending();
      }else if (param[1] == 'Alph_decending'){
        data_list = Alph_decending();
      }else if (param[1] == 'Price_ascending'){
        data_list = Price_ascending();
      }else if (param[1] == 'Price_decending'){
        data_list = Price_decending();
      }
    }
  }
  check_infor(data_list)
  dispatch();
  
}

function category (value) {
  let a_list = [];
  for (let i of rawdata) {
      if (i.categoryId == value) {
        a_list.push(i);
      }
  }
  return a_list;
}


function price (value) {
  let a_price_list = [];
  for (let i of rawdata) {
    if (value == 100 && i.price <= 100){
      a_price_list.push(i);
    }else if (value == 200 && 101 <= i.price && i.price <= 200) {
      a_price_list.push(i);
    }else if (value == 500 && 201 <= i.price && i.price <= 500) {
      a_price_list.push(i);
    }else if (value == 501 && i.price >= 501) {
      a_price_list.push(i);
    }
  }
  return a_price_list;
}


function Alph_ascending() {
  let ascending_list = [];
  let name_list = [];
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
  return(ascending_list);
}


function Alph_decending() {
  let decending_list = [];
  let name_list = [];
    for (let i of data_list) {
      name_list.push(i.title);
    }
    name_list.sort().reverse();
    for (let i of name_list) {
      for (let l of data_list) {
        if (i == l.title) {
          decending_list.push(l);
          break;
        }
      }
    }
     
    return(decending_list);
}

function Price_ascending() {
  let ascending_list = [];
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
    
  return(ascending_list);
}


function Price_decending() {
  let ascending_list = [];

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
  
  return(ascending_list);
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
  history.replaceState(0,0,nUrl);
  
}

function reset(){
  var url = window.location.href;
  var new_url1 = url.indexOf("?");
  var new_url = url.substring(0, new_url1);
  window.location.replace(new_url);
}


var last_num_position = 0;
var add_num = 0;
var check_num = 0;



function check_infor(list){
  temp_list = [];
  for (let i of list) {
    if (i.productMedia[0] && i.productMedia[0].url) {
      temp_list.push(i);
    }
  }
  
}

function num_per_page() {
  var div_with = Math.floor(document.body.clientWidth);
  var div_w;
  if(div_with<576){
    div_w = 1;
  }else if (div_with>=576 && div_with<768){
    div_w = 2;
  }else if (div_with>=768 && div_with<992){
    div_w = 3;
  }else if (div_with>=992 && div_with<1200){
    div_w = 4;
  }else if (div_with>=1200){
    div_w = 6;
  }
  var div_h = Math.floor(document.body.clientHeight*0.7/236);
  return(div_w*div_h);
}

function check_l_r(num){
  check_num = num;
  
}
//----------------------------------------------------------
function dispatch(){
  add_num = num_per_page();
  if (check_num == -1){
    console.log('-11111')
    last_num_position += add_num;
    Next_page(temp_list);
  }else if(check_num == -2){
    console.log('-22222')
    last_num_position -= add_num;
    Previous_page(temp_list);
  }else {
    Render(temp_list.slice(temp_num,temp_num+add_num));
    console.log('00000')
  }
  console.log("last_num_position="+last_num_position,"add_num="+add_num)

}
//----------------------------------------------------------
function Next_page(list){
  add_num = num_per_page();
  if(last_num_position < list.length-1){
    Render(list.slice(last_num_position,last_num_position+add_num));
    temp_num = last_num_position;
    console.log("next1111")
  }else{
    Render(list.slice(last_num_position-add_num,last_num_position))
    last_num_position -= add_num;
    console.log("next222")
  }
  check_num = 0;
}


function Previous_page(list){
  add_num = num_per_page();
  if(last_num_position >= add_num){
    Render(list.slice(last_num_position,last_num_position+add_num));
    temp_num = last_num_position-add_num;
    console.log("Previous111")
    console.log(last_num_position > add_num)
  }else{
    last_num_position = 0;
    console.log('Previous222')
    Render(list.slice(0,add_num))
    
  }
  check_num = 0;
}







function Render(data_list){
  let infor = '';
  let count = 0;

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