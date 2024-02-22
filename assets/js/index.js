// sc-main-banner
const mainBanner = new Swiper(".main-container", {
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
  slidesPerView: 4,
  navigation: {
    prevEl: ".btn-prev-contest",
    nextEl: ".btn-next-contest",
  },
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
                <div class="img-wrapper">
                  <img src="${element.cover.url}" alt />
                <span class="label-contest">콘테스트</span>
                </div>
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

$(".animation").each(function (_, element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "0% 100%",
      end: "100% 0%",
      toggleActions: "play none none reverse",
      // markers: true,
    },
    opacity: 0,
    y: 50,
  });
});

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
                    <img src="${element.prizes[0].portfolio.cover.url}" alt />
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

// sc-ing-contest
$(".sc-ing-contest button").click(function () {
  const className = $(this).attr("class");
  $(this).addClass("active").siblings().removeClass("active");

  if (className.includes("prize")) {
    $(".prize-list").show();
    $(".deadline-list").hide();
  } else {
    $(".deadline-list").show();
    $(".prize-list").hide();
  }
});

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
                <div class="img-wrapper">
                  <img src="${element.thumbnail.url}" alt="" />
                  <button class="like">
                    <span class="blind">좋아요 버튼</span>
                    <svg
                      class="sc-gKXOVf cAfwXx like-img"
                      type="heart24"
                      color="#fff"
                      filter="url(#dropShadow)"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7.996 5.6c-.754 0-1.475.177-2.139.524C4.466 6.855 3.6 8.241 3.6 9.738c0 .428.072.85.212 1.258a.78.78 0 0 1 .024.079c.629 2.684 5.767 6.36 8.166 7.852 2.396-1.493 7.531-5.168 8.161-7.852a.619.619 0 0 1 .024-.08c.141-.408.213-.83.213-1.257 0-1.497-.866-2.882-2.26-3.615A4.637 4.637 0 0 0 16 5.6c-1.32 0-2.557.551-3.397 1.511a.794.794 0 0 1-.6.276h-.001c-.231 0-.45-.1-.602-.274-.843-.96-2.084-1.513-3.404-1.513zm4.006 15.067a.794.794 0 0 1-.41-.114c-.852-.506-8.32-5.06-9.305-9.07A5.441 5.441 0 0 1 2 9.738c0-2.095 1.193-4.022 3.115-5.033A6.247 6.247 0 0 1 7.995 4c1.492 0 2.91.525 4.006 1.463A6.129 6.129 0 0 1 16 4a6.226 6.226 0 0 1 2.883.706C20.806 5.716 22 7.644 22 9.738c0 .591-.098 1.178-.29 1.745-.983 4.01-8.45 8.564-9.3 9.07a.793.793 0 0 1-.408.114z"
                      ></path>
                      <defs>
                        <filter id="dropShadow">
                          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                          <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          ></feColorMatrix>
                          <feOffset dy="1"></feOffset>
                          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                          <feComposite in2="hardAlpha" operator="out"></feComposite>
                          <feColorMatrix
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          ></feColorMatrix>
                          <feBlend in2="BackgroundImageFix" result="dropShadowEffect"></feBlend>
                          <feBlend
                            in="SourceGraphic"
                            in2="dropShadowEffect"
                            result="shape"
                          ></feBlend>
                        </filter>
                      </defs>
                    </svg>
                    <span>${element.marketInfo.likeCount}</span>
                  </button>
                </div>
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
  slidesPerView: 5,
  navigation: {
    prevEl: ".btn-prev-trend",
    nextEl: ".btn-next-trend",
  },
});

// sc-sourcing
const sourcingBanner1 = new Swiper(".sourcing-container.tab-1", {
  slidesPerView: 4,
  navigation: {
    prevEl: ".btn-prev-sourcing1",
    nextEl: ".btn-next-sourcing1",
  },
});
const sourcingBanner2 = new Swiper(".sourcing-container.tab-2", {
  slidesPerView: 4,
  navigation: {
    prevEl: ".btn-prev-sourcing2",
    nextEl: ".btn-next-sourcing2",
  },
});
const sourcingBanner3 = new Swiper(".sourcing-container.tab-3", {
  slidesPerView: 4,
  navigation: {
    prevEl: ".btn-prev-sourcing3",
    nextEl: ".btn-next-sourcing3",
  },
});

$(".sc-sourcing .tab-list li").click(function () {
  const className = $(this).attr("class");
  const element = $(this).closest(".header").find("strong");
  const text = $(this).text();
  element.text(text);
  $(this).addClass("active").siblings().removeClass("active");
  $(`.sourcing-container.${className}`).show().siblings(".sourcing-container").hide();
  $(`.slider-btn.${className}`).show().siblings(".slider-btn").hide();
});

// sc-count
const counter = { counter: 0 };
function countUp(selector, value, unit) {
  const element = document.querySelector(selector);
  const isInteger = Number.isInteger(value);
  gsap.to(counter, {
    counter: value,
    duration: 2,
    scrollTrigger: {
      trigger: ".sc-count",
      start: "0% 100%",
      end: "100% 0%",
      // markers: true,
    },
    onUpdate: () => {
      element.innerHTML = isInteger
        ? counter.counter.toFixed() + unit
        : counter.counter.toFixed(1) + unit;
    },
  });
}
countUp(".count-designer", 24, "만 명+");
countUp(".count-request", 4, "만 건+");
countUp(".count-satisfaction", 98.7, "%");
countUp(".count-domestic", 80, "%");

// sc-designer
$(".sc-designer .tab-list li").click(function () {
  const tabIndex = $(this).index();
  const element = $(this).closest(".header").find("strong");
  const text = $(this).text();

  designerData(tabIndex, text);
  element.text(text);
  $(this).addClass("active").siblings().removeClass("active");
});

function designerData(tabIndex = 0, text) {
  const jsonFiles = [
    "assets/json/designerData1.json",
    "assets/json/designerData2.json",
    "assets/json/designerData3.json",
    "assets/json/designerData4.json",
  ];
  const jsonData = jsonFiles[tabIndex];

  fetch(jsonData)
    .then((res) => res.json())
    .then((json) => {
      const data = json.resultData;

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
                  <div class="img-wrapper">
                    <img src="${element.portfolios[0].cover.url}" alt="포트폴리오 이미지 첫번째" />
                  </div>
                  <div class="img-wrapper">
                    <img src="${element.portfolios[1].cover.url}" alt="포트폴리오 이미지 두번째" />
                  </div>
                  <div class="img-wrapper">
                    <img src="${element.portfolios[2].cover.url}" alt="포트폴리오 이미지 세번째" />
                  </div>
                </div>
                <div class="profile-img-wrapper">
                  <img src="${element.avatar ? element.avatar.url : "./assets/imgs/profile-1.webp"}"
                    alt="${element.nick}의 프로필 이미지" class="profile-img" />
                </div>
                <div class="content-wrapper">
                  <div class="card-header">
                    <span class="id">${element.nick}</span>
                    <span class="follow">팔로우</span>
                  </div>
                  ${
                    element.introduction
                      ? `<p class="introduction">${element.introduction}</p>`
                      : `<p class="introduction empty">정보 없음</p>`
                  }
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
                  <div class="designer-link">
                    <span class="profile">프로필 보기</span>
                    <span class="request">의뢰하기</span>
                  </div>
                </div>
              </div>
            </a>
            <div class="recommend"><span class="category">${
              element.userLoudInfo.representIndustryReviewCount
            }개의 ${text || "식당/카페"}</span>&nbsp;업종에서 추천했습니다.
              <span class="blind">물음표 아이콘</span>
              <svg class="sc-gKXOVf gnuELh icon" type="questionMark16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.182 7.891C10.059 8.067 9.822 8.291 9.471 8.565L9.125 8.833C8.937 8.98 8.812 9.151 8.75 9.346C8.711 9.47 8.69 9.662 8.687 9.922H7.364C7.383 9.372 7.435 8.993 7.52 8.783C7.604 8.573 7.822 8.33 8.171 8.057L8.527 7.779C8.644 7.691 8.738 7.595 8.81 7.491C8.94 7.312 9.004 7.115 9.004 6.9C9.004 6.653 8.932 6.427 8.787 6.224C8.643 6.02 8.379 5.918 7.995 5.918C7.619 5.918 7.352 6.044 7.195 6.294C7.037 6.545 6.958 6.806 6.958 7.076H5.547C5.586 6.148 5.911 5.491 6.519 5.103C6.903 4.856 7.375 4.732 7.935 4.732C8.67 4.732 9.282 4.908 9.769 5.259C10.255 5.611 10.498 6.132 10.498 6.822C10.498 7.245 10.393 7.602 10.182 7.891ZM7.329 12.002H8.789V10.591H7.329V12.002ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.419 16 16 12.418 16 8C16 3.582 12.419 0 8 0Z"></path><defs></defs></svg>
              <div class="tooltip">
                <p>디자이너에게 작성된 후기를 기준으로<br>만족도가 높았던 기업을 알려드려요.</p>
              </div>
            </div>
          </li>
          `;
      });

      const designerList = document.querySelector(".designer-list");
      designerList.innerHTML = html;
      designerList.innerHTML += html;
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
                  }" alt="작업물 이미지" />
                </div>
                <div class="right-area">
                  <div class="star">
                    <span class="blind">후기 별점</span>
                    <span>${star}</span>
                    ${element.rates[0].originalRate}점
                  </div>
                  <div class="profile">
                    <img class="profile-img" src="./assets/imgs/profile-1.webp" alt="기본 프로필 이미지" />
                    <span class="nickname">${element.user.nick}</span>
                    <span class="date">${element.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <p>${element.comment}</p>
              </div>
              <div class="card-bottom">
                <span class="badge">콘테스트</span>
                <span class="product">${element.product}</span>
                <span class="product-type">구매등급 : ${element.target.contest.product.name}</span>
              </div>
            </a>
          </li>
          `;
      });

      const reviewList = document.querySelector(".review-list");
      reviewList.innerHTML = html;
      reviewList.innerHTML += html;
    });
}
reviewData();

// sc-portfolio
function topPortfolioData() {
  fetch("assets/json/portfolioData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let topSlide = data.slice(0, 16);

      let html = ``;
      topSlide.forEach((element) => {
        html += `
          <li>
            <button>
              <div class="img-wrapper">
                <img src="${element.cover.url}" alt />
              </div>
              <div class="title">${element.loudInfo.contest.title}</d>
            </button>
          </li>
          `;
      });

      const portfolioList = document.querySelector(".top-portfolio-list");
      portfolioList.innerHTML = html;
      portfolioList.innerHTML += html;
    });
}
topPortfolioData();

function bottomPortfolioData() {
  fetch("assets/json/portfolioData.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.resultData;

      let bottomSlide = data.slice(16, 32);

      let html = ``;
      bottomSlide.forEach((element) => {
        html += `
          <li>
            <button>
              <div class="img-wrapper">
                <img src="${element.cover.url}" alt />
              </div>
              <div class="title">${element.loudInfo.contest.title}</d>
            </button>
          </li>
          `;
      });

      const portfolioList = document.querySelector(".bottom-portfolio-list");
      portfolioList.innerHTML = html;
      portfolioList.innerHTML += html;
    });
}
bottomPortfolioData();

$(".opacity").each(function (_, element) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "0% 100%",
      end: "100% 0%",
      toggleActions: "play none none reverse",
      // markers: true,
    },
    opacity: 0,
  });
});
