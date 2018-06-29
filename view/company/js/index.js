var vm = new Vue({
  el: "#app",
  data: {
    shoes: false,
    activeIndex: ""
  },
  methods: {
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
