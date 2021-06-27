var app = new Vue({
    el:"#app",
    delimiters: ['[[', ']]'],
    data:{
        categories: [],
    },
    mounted: function(){
        this.showCategory() 
    },
    methods:{
        showCategory() {
            var that = this;
            $.ajax({
                method: 'GET',
                url: 'product/api/categories',
            }).then(response =>{
                console.log(response);
                that.categories = response;
                console.log(that.categories);
            }).catch(error => {
                console.log(error);
            });
        }
        
    }
});

addToCart = function (prod_id,price){
  console.log('Product_ID:', prod_id);

  var data = { 'product_id': prod_id, 'update': false, 'quantity': 1 };
  store.commit('increment', 1);
  store.commit('changeTotalCost', parseFloat(price));
  fetch('/cart/api_add_to_cart/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': '{{ csrf_token }}'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
    .then((response) => {
      console.log(response);
      alert("Product added to Cart");
      this.showMeassage = true;
      setTimeout(() => {
        this.showMeassage = false
      }, 2000)
    })
    .catch(function (error) {
      console.log(error);
    })
}




