// sc-main-banner
const mainBanner = new Swiper(".main-container", {
  wrapperClass: "main-wrapper",
  slideClass: "main-slide",
  slidesPerView: 1,
  loop: true,
  navigation: {
    prevEl: ".btn-prev-main",
    nextEl: ".btn-next-main",
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 유지
  },
});

// sc-loud-contest
const contestBanner = new Swiper(".contest-container", {
  wrapperClass: "contest-wrapper",
  slideClass: "contest-slide",
  slidesPerView: 4,
  loop: true,
  navigation: {
    prevEl: ".btn-prev-contest",
    nextEl: ".btn-next-contest",
  },
  autoplay: false,
});

function loudContestData() {
  fetch("assets/json/loudContestData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let html = ``;
      data.forEach((element, i) => {
        html += `
            <li class="swiper-slide contest-slide">
                <a href="">
                <img src="${element.cover.url}" alt="" />
                <div class="content-wrapper">
                    <span class="title">${element.title}</span>
                    <div class="tag-wrapper">
                        <span class="tag1">#${element.labels[0].name}</span>
                        <span class="tag2">${
                          element.labels[1] ? `#${element.labels[1].name}` : ""
                        }</span>
                    </div>
                </div>
                </a>
            </li>
        `;
      });

      $(".contest-wrapper").html(html);
    });
}
loudContestData();

// sc-design-contest
function formatPrize(money) {
  let prize = money / 10000; // 만 단위로 변환
  prize = Math.round(prize);
  return `${prize.toLocaleString()}만원`;
}

function winnerData() {
  fetch("assets/json/winnerData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let html = ``;
      data.forEach((element) => {
        const formattedPrize = formatPrize(element.totalPrize);
        html += `
            <li class="winner-item">
              <button>
                <div class="img-wrapper">
                    <img src="${element.prizes[0].portfolio.cover.url}" alt="" />
                </div>
                <div class="content-wrapper">
                  <span class="label">${element.label}</span>
                  <span class="title">${element.title}</span>
                  <span class="prize-money">총 상금 <strong>${formattedPrize}</strong></span>
                </div>
              </button>
            </li>
            `;
      });

      $(".winner-list").html(html);
    });
}
winnerData();

// sc-trend
function trendData() {
  fetch("assets/json/trendData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let html = ``;
      data.forEach((element) => {
        const formattedPrize = formatPrize(element.marketPrices[0].price);
        const label1 = element.labels ? element.labels[0].name : "";
        const label2 = element.labels ? (element.labels[1] ? element.labels[1].name : "") : "";

        html += `
          <li class="swiper-slide trend-slide">
            <a href="">
                <img src="${element.thumbnail.url}" alt="" />
                <div class="content-wrapper">
                <span class="title">${element.name}</span>
                <span class="nickname">${element.designer.nick}</span>
                <span class="period">작업일 ${element.marketPrices[0].workingDay}일</span>
                <span class="price">${formattedPrize} ~</span>
                <div class="label-wrapper">
                    ${label1 ? `<span class="label">${label1}</span>` : ""}
                    ${label2 ? `<span class="label">${label2}</span>` : ""}
                </div>
                </div>
            </a>
            </li>
          `;
      });

      $(".trend-wrapper").html(html);
    });
}
trendData();

const trendBanner = new Swiper(".trend-container", {
  wrapperClass: "trend-wrapper",
  slideClass: "trend-slide",
  slidesPerView: 5,
  loop: true,
  navigation: {
    prevEl: ".btn-prev-trend",
    nextEl: ".btn-next-trend",
  },
  autoplay: false,
});

// sc-sourcing
const sourcingBanner = new Swiper(".sourcing-container", {
  wrapperClass: "sourcing-wrapper",
  slideClass: "sourcing-slide",
  slidesPerView: 4,
  loop: true,
  navigation: {
    prevEl: ".btn-prev-sourcing",
    nextEl: ".btn-next-sourcing",
  },
  autoplay: false,
});

// sc-count
const counter = { counter: 0 };
function countUp(element, number, unit) {
  gsap.to(counter, {
    counter: number,
    duration: 2,
    scrollTrigger: {
      trigger: ".sc-count",
      start: "0% 100%",
      end: "100% 0%",
      toggleActions: "play none none reverse",
      // markers: true,
    },
    onUpdate: () => {
      if (counter.counter < number) {
        document.querySelector(element).innerHTML = Math.round(counter.counter) + unit;
      } else {
        document.querySelector(element).innerHTML = counter.counter + unit;
      }
    },
  });
}
countUp(".count-designer", 24, "만 명+");
countUp(".count-request", 4, "만 건+");
countUp(".count-satisfaction", 98.7, "%");
countUp(".count-domestic", 80, "%");

// sc-designer
function designerData() {
  fetch("assets/json/designerData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let html = ``;
      data.forEach((element) => {
        const formattedPrize = formatPrize(element.userInfo.totalPrice);
        const label1 = element.label ? element.label[0] : "";
        const label2 = element.label ? (element.label[1] ? element.label[1] : "") : "";

        html += `
          <li>
            <a href="">
              <div class="card-item">
                <div class="top-img-wrapper">
                  <div class="img-wrapper"><img src="${
                    element.portfolios[0].cover.url
                  }" alt="" /></div>
                  <div class="img-wrapper"><img src="${
                    element.portfolios[1].cover.url
                  }" alt="" /></div>
                  <div class="img-wrapper"><img src="${
                    element.portfolios[2].cover.url
                  }" alt="" /></div>
                </div>
                <div class="profile-img-wrapper"><img src="${
                  element.avatar ? element.avatar.url : "./assets/imgs/profile-1.webp"
                }" alt="${element.nick}의 프로필" class="profile-img" /></div>
                <div class="content-wrapper">
                  <div class="card-header">
                    <span class="id">${element.nick}</span>
                    <span class="follow">팔로우</span>
                  </div>
                  <p class="introduction">${
                    element.introduction ? element.introduction : "정보 없음"
                  }</p>
                  <div class="label-wrapper">
                    ${label1 ? `<span class="label">${label1}</span>` : ""}
                    ${label2 ? `<span class="label">${label2}</span>` : ""}
                  </div>
                  <div class="card-info">
                    <div>
                      <span class="title">총 수익</span>
                      <span class="value">${formattedPrize}</span>
                    </div>
                    <div>
                      <span class="title">우승</span>
                      <span class="value">${element.userLoudInfo.contestWinCount}회</span>
                    </div>
                    <div>
                      <span class="title">총 거래</span>
                      <span class="value">${element.userInfo.totalDealTaskCount}건</span>
                    </div>
                    <div>
                      <span class="title">리뷰</span>
                      <span class="value">${element.userLoudInfo.totalReviewCount}개
                        <span class="star">
                          <svg class="sc-gKXOVf iFpvod icon" viewBox="0 0 12 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9643 4.74338C10.8835 4.50089 10.6777 4.32673 10.4285 4.2884L7.79006 3.88509L6.60669 1.35936C6.38168 0.880213 5.61832 0.880213 5.39331 1.35936L4.20994 3.88509L1.57152 4.2884C1.32235 4.32673 1.11651 4.50089 1.03567 4.74338C0.954003 4.99004 1.01484 5.25836 1.19484 5.44252L3.11741 7.41577L2.66156 10.2073C2.61989 10.469 2.72656 10.7256 2.9424 10.8773C3.0574 10.9589 3.19074 10.9998 3.32408 10.9998C3.43492 10.9998 3.54492 10.9723 3.64576 10.9165L6 9.61401L8.35424 10.9165C8.57675 11.0398 8.84759 11.0264 9.0576 10.8773C9.27344 10.7256 9.38011 10.469 9.33761 10.2065L8.88259 7.41577L10.8052 5.44252C10.9852 5.25836 11.046 4.99004 10.9643 4.74338Z"></path><defs></defs></svg>
                          ${element.userLoudInfo.totalReviewRate.toFixed(1)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <div class="recommend"><span class="category">${
              element.userLoudInfo.representIndustryReviewCount
            }개의 식당/카페</span> 업종에서 추천했습니다.
              <svg class="sc-gKXOVf gnuELh icon" type="questionMark16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.182 7.891C10.059 8.067 9.822 8.291 9.471 8.565L9.125 8.833C8.937 8.98 8.812 9.151 8.75 9.346C8.711 9.47 8.69 9.662 8.687 9.922H7.364C7.383 9.372 7.435 8.993 7.52 8.783C7.604 8.573 7.822 8.33 8.171 8.057L8.527 7.779C8.644 7.691 8.738 7.595 8.81 7.491C8.94 7.312 9.004 7.115 9.004 6.9C9.004 6.653 8.932 6.427 8.787 6.224C8.643 6.02 8.379 5.918 7.995 5.918C7.619 5.918 7.352 6.044 7.195 6.294C7.037 6.545 6.958 6.806 6.958 7.076H5.547C5.586 6.148 5.911 5.491 6.519 5.103C6.903 4.856 7.375 4.732 7.935 4.732C8.67 4.732 9.282 4.908 9.769 5.259C10.255 5.611 10.498 6.132 10.498 6.822C10.498 7.245 10.393 7.602 10.182 7.891ZM7.329 12.002H8.789V10.591H7.329V12.002ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.419 16 16 12.418 16 8C16 3.582 12.419 0 8 0Z"></path><defs></defs></svg>
            </div>
          </li>
          `;
      });

      const designerList = document.querySelector(".designer-list");
      designerList.innerHTML = html;
      designerList.innerHTML += html;
      designerList.style.width = "200%";
    });
}
designerData();

// sc-review
function reviewData() {
  fetch("assets/json/reviewData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let html = ``;
      data.forEach((element) => {
        const star = Array(element.rates[0].originalRate)
          .fill(
            `<svg type="star24" color="#2656F6" viewBox="0 0 24 24" class="sc-gKXOVf cAfwXx"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.952 9.56083C21.8461 9.24417 21.5795 9.01667 21.2545 8.9675L15.4071 8.07583L12.788 2.505C12.6405 2.19417 12.3397 2 12.0006 2C11.6606 2 11.3597 2.19417 11.2123 2.50583L8.59315 8.07583L2.74498 8.9675C2.42165 9.01667 2.15416 9.24417 2.0475 9.56083C1.93917 9.885 2.01916 10.2375 2.25666 10.4808L6.50821 14.7808L5.49907 20.9592C5.44157 21.3042 5.58157 21.6425 5.86323 21.8408C6.01239 21.9467 6.18655 22 6.35988 22C6.50154 22 6.64487 21.9642 6.7757 21.8917L12.0006 19.0092L17.2246 21.8917C17.5154 22.0517 17.8662 22.0325 18.1371 21.8408C18.4179 21.6425 18.5587 21.3042 18.5004 20.96L17.4654 14.8558L21.7436 10.4808C21.9811 10.2375 22.0611 9.88583 21.952 9.56083Z"></path><defs></defs></svg>`
          )
          .join("");

        html += `
          <li>
            <a href="">
              <div class="card-header">
                <div class="left-area">
                  <img class="product-img" src="${
                    element.target.contest.prizes
                      ? element.target.contest.prizes[0].portfolio.cover.url
                      : "./assets/imgs/review-default.png"
                  }" alt="" />
                </div>
                <div class="right-area">
                  <div class="star">
                    <span>${star}</span>
                    ${element.rates[0].originalRate}점
                  </div>
                  <div class="profile">
                    <img class="profile-img" src="./assets/imgs/profile-1.webp" alt="" />
                    <span class="nickname">${element.user.nick}</span>
                    <span class="date">${element.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <p>${element.comment}</p>
              </div>
              <div class="card-bottom">
                <span class="label-contest">콘테스트</span>
                <span class="product">${element.product}</span>
                <span class="product-type">구매등급 : ${element.target.contest.product.name}</span>
              </div>
            </a>
          </li>
          `;
      });

      $(".review-list").html(html);
    });
}
reviewData();
