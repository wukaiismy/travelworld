window.onload = function() {
  var vm = new Vue({
    el: "#app",
    data: {
      isFixed: false,
      scroll: 0,
      activeIndex: "",
      page: 0,
      data: [],
      totalpage: 0
    },
    mounted: function() {
      this.page = 1;
      // 开启滚动监听
      window.addEventListener("scroll", this.handleScroll);
    },
    watch: {
      page: function() {
        var This = this;
        console.log("T:" + this.page);
        axios
          .get("/index/strategydata?page=" + This.page)
          .then(function(response) {
            // console.log(response.data.lista.datalist);
            This.totalpage = response.data.lista.totalpage;

            This.data = response.data.lista.datalist;
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    methods: {
      pages: function(val) {
        this.page = val;
      },
      top: function() {
        var gotoTop = function() {
          var currentPosition =
            document.documentElement.scrollTop || document.body.scrollTop;
          currentPosition -= 10;
          if (currentPosition > 0) {
            window.scrollTo(0, currentPosition);
          } else {
            window.scrollTo(0, 0);
            clearInterval(timer);
            timer = null;
          }
        };
        var timer = setInterval(gotoTop, 1);
      },
      handleScroll: function() {
        this.scroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(this.scroll)
        if (this.scroll >= 300) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      }
    }
  });
  let imgs = $(".img li");
  let btn = $(".button li");
  btn.each(function(ind, el) {
    $(el).mouseover(function() {
      //链式操作
      imgs
        .hide()
        .eq(ind)
        .show();
      //先把所有的背景颜色改成白色
      btn
        .removeClass("btn_hover")
        .eq(ind)
        .addClass("btn_hover");
    });
  });
};
