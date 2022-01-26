function Details () {
     var url = location.search;
     var id_num = url.substring(1); 

     let detail_infor = '';
     for (let i of rawdata) {
       if (i.prodId == id_num) {
        let imgaddre = "https://storage.googleapis.com/luxe_media/wwwroot/" + i.productMedia[0].url;
        detail_infor += `
        <div class="row" style="margin:0">
          <div class="col-12 col-xl-6 img" style="width:360px; margin: 0 auto;">
            <img src="${imgaddre}" style="width: 100%;  height: 350px;">
          </div>
          <div class="col-12 col-xl-6 total_infor" style="text-align: center;margin: 0 auto;">
            <div class="title" style="margin: 0 auto;">${i.title}</div>
            <div class="description" style="max-width:450px;margin: 0 auto;">
              <p class="description1" style="color: gray;">Description:</p>
              <p class="description2" style="color: gray;">${i.description}</p>
            </div>
            <div class=" row price_discount" style="width: fit-content;margin: 20px auto;">
              <div class="price" style="width: fit-content;">Price: $${i.price}.</div>
              <div class="discount" style="width: fit-content;">Discount: $${i.discount}.</div>
            </div>
            <div class="total_stock" style="width: fit-content;margin: 20px auto;">
              <div class="stock_time" style="width: fit-content;;">
                <div class="stock" style="width: fit-content;">There is(are) ${i.totalStock} left in stock.</div>
              </div>
              <div class="row num">
                <div style="width: fit-content;">Rent quantity: <input type="text" style="width: 50px;"></div>
              </div>
            </div>
          </div>
        </div>
        `

       }
     }
     document.getElementById('main1').innerHTML = detail_infor;
}
Details ();