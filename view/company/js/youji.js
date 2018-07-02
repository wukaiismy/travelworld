window.onload = function() {
  window.addEventListener("scroll", showsearch);
  window.addEventListener("scroll", showsearch2);
  var search = document.getElementById("first_head");
  var search2 = document.getElementById("little_r");
  //   console.log(search2);
  function showsearch() {
    //下拉距离达到300以上并且定时器还没有开启，高度为0的时候
    var top = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

    if (top > 200) {
      search.style.display = "block";
    } else if (top <= 200) {
      search.style.display = "none";
    }
  }
  function showsearch2() {
    var top = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

    if (top > 300) {
      search2.style.display = "block";
    } else if (top <= 300) {
      search2.style.display = "none";
    }
  }

  var vm = new Vue({
    el: "#app",
    data: {
      isFixed: false,
      scroll: 0,
      activeIndex: ""
    },
    mounted: function() {
      // 开启滚动监听
      window.addEventListener("scroll", this.handleScroll);
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
        // console.log(this.scroll)
        if (this.scroll >= 300) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      },
      //收藏点击事件发送请求
      shou: function($evnet, datas) {
        console.log($evnet.target);
        console.log(datas);
        this.$message({
          message: "成功将该文章收藏！",
          type: "success",
          duration: 2000
        });

        axios
          .get("/index/shou?sid=" + datas)
          .then(function(response) {
            //   console.log(response.data.ding);
            var shou = response.data.shouchang;
            $evnet.target.nextElementSibling.firstElementChild.innerHTML = shou;
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  });
};
