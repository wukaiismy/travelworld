window.onload = function() {
  var vm = new Vue({
    el: "#app",
    data: {
      shoes: false,
      activeIndex: "",
      isFixed: false,
      scroll: 0,
      page: 0,
      data: [],
      totalpage: 0
    },
    mounted: function() {
      this.page = 1;
      window.addEventListener("scroll", this.handleScroll);
    },

    watch: {
      page: function() {
        var This = this;
        console.log("T:" + this.page);
        axios
          .get("/index/indexdata?page=" + This.page)
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
        // console.log(this.scroll);
        if (this.scroll >= 300) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      },
      ding: function($evnet, datas) {
        //   console.log(datas);
        //   console.log($evnet.target.previousElementSibling);
        $evnet.target.previousElementSibling.style.display = "block";
        axios
          .get("/index/ding?sid=" + datas)
          .then(function(response) {
            //   console.log(response.data.ding);
            var ding = response.data.ding;
            $evnet.target.previousElementSibling.previousElementSibling.innerHTML = ding;
            setTimeout(function() {
              $evnet.target.previousElementSibling.style.display = "none";
            }, 500);
          })
          .catch(function(err) {
            console.log(err);
          });
      },
      pages: function(val) {
        this.page = val;
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
