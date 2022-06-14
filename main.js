/**Step by Step to do
 * 1. Render song
 * 2. Scroll top
 * 3. Play/ Pause/ seek
 * 4. Cd rotate
 * 5. Next/ prev
 * 6. Random song
 * 7. Next/ repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when clicked
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//get DOM element
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const clickPlaySong = $('.btn-toggle-play');
const playing = $('.player');
const cd = $('.cd');
const seek = $('#progress');
const nextButton = $('.btn-next');
const prevButton = $('.btn-prev');
const randomButton = $('.btn-random');
const repeatButton = $('.btn-repeat');
const playList = $('.playlist');
const apiSongs = 'http://localhost:3000/songs';

// fetch(apiSongs)
//   .then(function (respond) {
//     return respond.json();
//   })
//   .then(function (songs) {
//     const htmls = songs.map(function (song, index) {
//       //   return `
//       // <div class="song ${
//       //   index === app.currentIndex ? 'active' : ''
//       // }" data-index="${index}">
//       //     <div
//       //     class="thumb"
//       //     style="
//       //         background-image: url('${song.image}');
//       //     "
//       //     ></div>
//       //     <div class="body">
//       //     <h3 class="title">${song.name}</h3>
//       //     <p class="author">${song.singer}</p>
//       //     </div>
//       //     <div class="option">
//       //     <i class="fas fa-ellipsis-h"></i>
//       //     </div>
//       // </div>`;
//     });
//     playList.innerHTML = htmls.join('');
//   });
//check
//Data
const app = {
  // Đặt trạng thái nhạc hoạt động
  isPlaying: false,
  // Đặt vị trí hiện tại:
  currentIndex: 0,
  // Đặt trạng thái random button
  isRandom: false,
  //Đặt trạng thái repeat button
  isRepeat: false,

  //data
  songs: [
    {
      name: 'Fallacy',
      singer: 'Cxdy',
      path: './assets/music/Cxdy  Fallacy.mp3',
      image:
        'https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg',
    },
    {
      name: "Don't Worry Bout Me",
      singer: 'Zara Larsson',
      path: './assets/music/Zara Larsson  Dont Worry Bout Me Official Music Video.mp3',
      image:
        'https://th.bing.com/th/id/OIP.a5ZkjvAIGEH1HOZztY01FQHaH9?w=172&h=185&c=7&r=0&o=5&pid=1.7',
    },
    {
      name: "Don't Worry About Me",
      singer: 'Frances',
      path: './assets/music/Frances  Dont Worry About Me Official Video.mp3',
      image:
        'https://th.bing.com/th/id/OIP.2qqXVM-ZJaR5qoM7c5wNoAHaHa?w=170&h=180&c=7&r=0&o=5&pid=1.7',
    },
    {
      name: 'Older',
      singer: 'Sasha Sloan',
      path: './assets/music/Sasha Sloan  Older Lyric Video.mp3',
      image:
        'https://th.bing.com/th/id/OIP.PWDnil9BDhOne8cfB5xHhgHaEK?w=318&h=180&c=7&r=0&o=5&pid=1.7',
    },
    {
      name: 'Dusk Till Dawn',
      singer: 'ZAYN',
      path: './assets/music/ZAYN  Dusk Till Dawn ft Sia Official Music Video.mp3',
      image:
        'https://th.bing.com/th/id/OIP.ixj3GeQ7OB1IhqysXInviQHaHa?w=225&h=220&c=7&r=0&o=5&pid=1.7',
    },
    {
      name: 'Beautiful',
      singer: 'Cain',
      path: './assets/music/Cain  Gh p ft LCKing Official Audio.mp3',
      image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
    },

    {
      name: 'HandUps',
      singer: 'Tri',
      path: './assets/music/Put Ur Hands.mp3',
      image: 'https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg',
    },
    {
      name: 'Frog',
      singer: 'Beats',
      path: './assets/music/FREE Freestyle Type Beat Frog   Free Type Beat   Rap Trap Beats lhm6sWjZU4E.mp3',
      image: 'https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg',
    },
  ],

  // Push render func to start func để khi app chạy chỉ để 1 func chạy > đơn giản hơn
  // Render func: xuất dữ liệu ra web interface
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `
      <div class="song ${
        index === app.currentIndex ? 'active' : ''
      }" data-index="${index}">
          <div
          class="thumb"
          style="
              background-image: url('${song.image}');
          "
          ></div>
          <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
          </div>
          <div class="option">
          <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>`;
    });
    playList.innerHTML = htmls.join('');
  },

  //Đặt ra 1 thuộc tính bằng defineProperties : Object.defineProperties(obj cần đặt thuộc, 'name',{method: get.vvv })
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  // func to load infor of song playing
  loadCurrentSong: function () {
    heading.innerHTML = this.currentSong.name;

    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;

    audio.src = `${this.currentSong.path}`;
    this.scrollToView();
  },

  //Func next song when click next button
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToView();
  },

  //Func prev song when click prev button
  prevSong: function () {
    this.currentIndex--;
    console.log(this.currentIndex, this.songs.length);
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToView();
  },

  //Func active mode random song
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  //func to active the scroll in To Viewer
  scrollToView: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    }, 500);
  },

  // Xử lí sự kiện ở trong app
  handleEvent: function () {
    //Autoplay song wwhen open app
    // Cd rotate when play and pause when music pause
    // Element.animate([]) is an methods to creat new a animation, applies to element and play the animation
    // Forrm: Elemant.animate([{keyframes}],{ options})
    const cdRotate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdRotate.pause();

    //Define it to use with value in smaller function
    const _this = this;

    // lấy ra chiều cao của cd qua DOM attribute
    const cdWidth = cd.clientWidth;
    // console.log(cdWidth);
    // bắt sự kiện cuộn màn hình
    document.onscroll = function () {
      //window: màn hình trình duyệt, scrollY: trục dọc màn hình
      //console.log(window.scrollY || document.documentElement.scrollTop);
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Chiều cao của cd bị thu lại khi user scroll
      const newCdWidth = cdWidth - scrollTop;

      // thay đổi chiều cao và opacity của cd cùng điều kiện
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //Auto play music when reload

    // sự kiện click play
    clickPlaySong.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      //  When song is played
      audio.onplay = function () {
        _this.isPlaying = true;
        playing.classList.add('playing');
        cdRotate.play();
      };

      // When song is stopped
      audio.onpause = function () {
        _this.isPlaying = false;
        playing.classList.remove('playing');
        cdRotate.pause();
      };

      //when song was seeked
      audio.ontimeupdate = function () {
        // currentTime:  trả về thời gian của audio && ducation: tổng thời gian của bài hát
        // console.log((audio.currentTime / audio.duration) * 100);
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          seek.value = progressPercent;
        }
      };

      // Solve song when was seeked : lấy e để xét target
      seek.oninput = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
        // Play music at this time user seek music
        if (seekTime) {
          audio.play();
        }
      };

      //next song when click next button
      nextButton.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
          _this.scrollToView();
        }
        if (_this.isRepeat) {
          audio.play();
        } else {
          _this.nextSong();
        }
        audio.play();
        _this.render();
      };

      // next song when click next button
      prevButton.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
          _this.scrollToView();
        }
        if (_this.isRepeat) {
          audio.play();
        } else {
          _this.prevSong();
        }
        audio.play();
        _this.render();
      };

      // click random btn
      randomButton.onclick = function () {
        _this.isRandom = !_this.isRandom;
        // randomButton.classList.toggle('active', _this.isRandom);
        if (randomButton.classList.toggle('active', _this.isRandom)) {
          repeatButton.classList.remove('active');
        }
      };
      //click active repeat button
      repeatButton.onclick = function () {
        _this.isRepeat = !_this.isRepeat;
        // repeatButton.classList.toggle('active', _this.isRepeat);
        if (repeatButton.classList.toggle('active', _this.isRepeat)) {
          randomButton.classList.remove('active');
        }
      };

      //Auto next song when song finised
      audio.onended = function () {
        if (_this.isRepeat) {
          audio.play();
        } else {
          nextButton.click();
          _this.render();
        }
      };

      //CLick in playlist to change song
      playList.onclick = function (e) {
        const songNode = e.target.closest('.song:not(.active)');
        //closest : lấy các giá trị theo hướng ngược DOM tree
        if (songNode || e.target.closest('.option')) {
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          }
        }
      };
    };
  },

  start: function () {
    // Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    //Lắng nghe các thao tác và xử lí các sự kiện
    this.handleEvent();

    // Render playlist
    this.render();

    // Tải thông tin bài hát đầu tiên vào User Interface khi chạy ứng dụng
    this.loadCurrentSong();
  },
};
console.log(app.songs);

app.start();
