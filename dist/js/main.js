"use strict"
var Photo = {
  Model: [],

  Init: function() {
    var parent = this,
        btn = document.getElementById('load-photo');
    btn.addEventListener('click', function() {
      VK.init({
        apiId: 5573044
      });

      VK.Auth.login(function(response) {
        if (response.session) {
          parent.Model.session = response.session
          parent.Load();
        }
        else
          console.error('Не удалось авторизоваться');
      }, 4);
    });
  },

  Load: function() {
    var parent = this;
    VK.api('photos.getAll', {'extended': '1', 'count': '50', 'version': '5.53'},
      function(response) {
        if (response.error)
          console.error(response.error.error_msg);
        else {
          parent.Model.photo = response.response;
          parent.Draw();
        }
    });
  },

  Draw: function() {
    var parent = this,
        data = this.Model.photo,
        user = this.Model.session.user,
        html ='', i;
    html += '<div class="main-container__title">' + user.first_name + ' ' + user.last_name + '</div>'
    html += '<div class="photo-container">'
    for (i = 1; i < data.length; i++) {
      html += '<div class="photo-container__item">'
        html += '<img class="photo-container__img" src="' + data[i].src_xbig + '">'
        html += '<div class="photo-footer">'
          html += '<img class="photo-footer__img" src="../dist/css/img/heart.png">'
          html += '<span class="photo-footer__count">' + data[i].likes.count + '</span>'
        html += '</div>'
      html += '</div>'
    }
    html += '</div>'
    document.querySelector('.main-container').innerHTML = html;
    console.log(data);
  }
}

Photo.Init();
