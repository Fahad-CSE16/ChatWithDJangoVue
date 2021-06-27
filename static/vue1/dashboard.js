var app = new Vue({
    el:"#app",
    delimiters: ['[[', ']]'],
    data:{
        categories: [],
        products: [],
        selected_category:'',
        selected_file: null,
        message: '',
        update_category:{},
       
        category:{
            title: '',
        },
        product:{
            name: 'ASus',
            old_price: 20,
            price: 30,
            quantity: 12,
            preview_text: 'jkdsho',
            preview_details: 'jkdnfk',
            status: false,
            
        },

    },
    mounted: function(){
        this.showCategory()
        this.showProduct()
    },
    methods:{
        showCategory: function() {
            var that = this;
            $.ajax({
                method: 'GET',
                url: 'api/categories',
            }).then(response =>{
                console.log(response);
                that.categories = response;
                console.log(that.categories);
            }).catch(error => {
                console.log(error);
            });
        },
        showProduct: function() {
            var that = this;
            $.ajax({
                method: 'GET',
                url: 'api/products',
            }).then(response =>{
                console.log(response);
                that.products = response;
                console.log(that.products);
            }).catch(error => {
                console.log(error);
            });
        },
        
        
        addCategory: function(){
            var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
            var formData = {}
            formData.title = this.category.title
            $.ajax({
                method: 'POST',
                url: 'api/categories',
                data: JSON.stringify(formData),
                contentType: 'Application/json',
                headers:{"X-CSRFToken": $crf_token},
            }).then(response =>{
                console.log(this.category.title)
                this.category.title = '';
                this.showCategory();
                
            }).catch(error =>{
                console.log(error);
            });
        },
        addProduct: function(){
            var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
            var formData = new FormData();  
            formData.name = this.product.name;
            formData.append('product_image', this.selected_file);
            formData.old_price = this.product.old_price;
            formData.price = this.product.price;
            formData.quantity = this.product.quantity;
            formData.preview_text = this.product.preview_text;
            formData.preview_details = this.product.preview_details;
            formData.status = this.product.status;
            formData.category = this.selected_category;
            console.log(formData);
            
            $.ajax({
                method: 'POST',
                url: 'api/products',
                data: JSON.stringify(formData),
                headers: {
                    "X-CSRFToken": $crf_token,
                    
                },
            }).then(response =>{
                this.message = "Successfully saved";
                this.product.name = '';
                this.product.old_price = null;
                this.product.price = null;
                this.product.quantity = null;
                this.product.preview_text = '';
                this.product.preview_details = '';
                this.selected_file = null;
                this.product.status = false;
                this.showProduct();
            }).catch(error =>{
                console.log(error);
            })            
        },
        onFileChange:function(){
            const files = this.$refs.image.files[0];
            this.selected_file = files.name;
            console.log(this.selected_file);
        },
        getCategory: function(cat_id){
            var that = this;
            console.log(cat_id);
            $.ajax({
                method: 'GET',
                url:'api/categories/' + cat_id,
                success:function(Response){
                    console.log('check');
                    that.update_category = Response;
                }
            });
        },

        editCategory: function(update_category){
            let form_data = {};
            form_data.title = update_category.title;
            $.ajax({
                method: 'PUT',
                url: 'api/categories/' + update_category.id,
                data: JSON.stringify(form_data),
                contentType: 'Application/json',
            }).then(response =>{
                this.message = "Successfully Updated";
                this.showCategory();
            }).catch(error =>{
                console.log(error);
            }) 
        },
        deleteCategory: function(cat_id){
            $.ajax({
                method:'DELETE',
                url: 'api/categories/' + cat_id,
                contentType: 'Application/json',
            }).then(response =>{
                this.showCategory();

            }).catch( error =>{
                console.log(error);
            })
        },
        deleteProduct: function(prod_id){
            $.ajax({
                method:'DELETE',
                url: 'api/products/' + prod_id,
            }).then(response =>{
                this.showProduct();

            }).catch( error =>{
                console.log(error);
            })
        },   
    },
})