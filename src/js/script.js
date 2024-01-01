jQuery(function ($) { // この中であれば WordPress でも「$」が使用可能になる
  // ==========================================================================
  //  ハンバーガメニュー
  // ==========================================================================

  $(".js-hamburger").click(function () {
    // ハンバーガーメニューの表示状態を判定
    if ($(".js-hamburger").hasClass("is-show")) {
      // メニューがアクティブ状態の場合
      $(".js-hamburger").removeClass("is-show");
      $("body").removeClass("menu-open"); // スクロールを有効にするためのクラスを削除
    } else {
      // メニューが非アクティブ状態の場合
      $(".js-hamburger").addClass("is-show");
      $("body").addClass("menu-open"); // スクロールを無効にするためのクラスを追加
    }
  });

  // スクロール禁止のための関数を定義
  function スクロール禁止() {
    $("html, body").css("overflow", "hidden");
  }

  // スクロール有効化のための関数を定義
  function スクロール有効化() {
    $("html, body").css("overflow-y", "auto");
  }

  // ハンバーガーメニューが開かれた時にスクロールを禁止
  $(document).on("click", ".js-hamburger.is-show", function () {
    スクロール禁止();
  });

  // ハンバーガーメニューが閉じられた時にスクロールを有効化
  $(document).on("click", ".js-hamburger:not(.is-show)", function () {
    スクロール有効化();
  });

  // ナビゲーションリンクのクリックイベント
  $(".js-hamburger").click(function () {
    $(".nav").toggleClass('js-navactive'); //ナビゲーションにjs-navactiveクラスを付与
  });

  $("nav a").click(function () {
    // ナビゲーションのリンクがクリックされたら
    $(".nav").removeClass('js-navactive'); //ナビゲーションのjs-navactiveクラスも除去
  });

  // ==========================================================================
  //  Products,recommendのSwiper
  // ==========================================================================

  var products__swiper = new Swiper(".js-products-swiper", {
    loop: true,
    speed: 2000,
    slidesPerView: 1.39,
    spaceBetween: 24,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1.7,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 0,
      }
    },
    navigation: {
      nextEl: ".js-swiper-button-next",
      prevEl: ".js-swiper-button-prev",
    },
  });

  // ==========================================================================
  //  newpostのSwiper
  // ==========================================================================

  var products__swiper = new Swiper(".js-newpost-swiper", {
    loop: true,
    speed: 2000,
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1.7,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    navigation: {
      nextEl: ".js-newpost-swiper-button-next",
      prevEl: ".js-newpost-swiper-button-prev",
    },
  });

  // ==========================================================================
  // ギャラリー覧の拡大画像モーダル処理
  // ==========================================================================

  // ギャラリー画像モーダル表示イベント
  $(".js-modal img").click(function () {
    // まず、クリックした画像の HTML(<img>タグ全体)を#frayDisplay内にコピー
    $(".js-modal-event").html($(this).prop("outerHTML"));
    //そして、fadeInで表示する。
    $(".js-modal-event").fadeIn(200);
    // モーダル表示時に背景スクロール禁止
    $("body").css("overflow", "hidden");

    return false;
  });

  // ギャラリー画像モーダル非表示イベント
  // モーダル画像背景 または 拡大画像そのものをクリックで発火
  $(".js-modal-event").click(function () {
    // 非表示にする
    $(".js-modal-event").fadeOut(200);
    // モーダル非表示時に背景スクロール許可
    $("body").css("overflow-y", "auto");

    return false;
  });

  // ==========================================================================
  // お問い合わせフォームエラーメッセージ
  // ==========================================================================
  $(document).ready(function () {
    // ページ読み込み時に実行される関数
    $(".contact-form_error").hide(); // 最初はエラーメッセージを非表示に

    $("form").validate({
      // フォームのバリデーションを設定

      rules: {
        // 各フォームのルールを定義
        text_name: {
          required: true, // 名前が必須
        },
        mail_address: {
          required: true, // メールアドレスが必須
          email: true, // メールアドレスの形式チェック
        },
        tel: {
          required: false, // 電話番号が必須
        },
        contents: {
          required: false, // お問い合わせ内容が必須
        },
      },
      messages: {
        // 各ルールに対するエラーメッセージを定義
        text_name: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください.',
        },
        mail_address: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください.',
          email: "", // メールアドレスの形式エラー
        },
      },
      errorPlacement: function (err, elem) {
        // エラーメッセージの表示場所とスタイリングをカスタマイズ
        $(".js-error").html(err);
        elem.addClass("js-invalid");
        $(".contact-form_error").show(); // エラーメッセージを表示
      },
    });

    $("form").submit(function () {
      // フォームが送信されたときの処理
      if (!$("form").valid()) {
        // フォームがバリデーションを通過しない場合
        $(".js-error").show(); // エラーメッセージを表示
        return false; // フォーム送信を阻止
      }
    });
    $("form").submit(function () {
      if (!$("form").valid()) {
        return false;
      } else {
        window.location.href = "page-contact-Thanks.html"; // 送信成功時にリダイレクト
        return false; // フォームの送信を阻止
      }
    });
  });

  // ==========================================================================
  // 商品紹介の要素を一つずつ下からふわっとフェードするように
  // ==========================================================================


  $(function () {
    var elements = $(".inview");
    elements.one("inview", function (event, isInView) {
      if (isInView) {
        var index = 0;
        elements.each(function () {
          var $elem = $(this);
          setTimeout(function () {
            $elem.stop().addClass("is-show");
          }, 350 * index); // 500ミリ秒ごとに要素が表示されるようにする
          index++;
        });
      }
    });
  });

  // ==========================================================================
  // ローディングアニメーション
  // ==========================================================================

  // スクロール禁止用の関数
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  // セッションキー
  let sessionKey = "your_session_key_here"; // 適切なセッションキーを使用してください

  // ローディング要素の取得
  let loading = document.querySelector('.loading');
  let loadingBorder = document.querySelector('.loading__border');
  let topImage = document.querySelector(".loading__img-top");
  let bottomImage = document.querySelector(".loading__img-bottom");

  // 最終アクセス時刻の取得
  let lastAccessTime = Cookies.get("lastAccessTime");
  let isAnimationPlayed = sessionStorage.getItem("animationPlayed");

  // ローディングの表示制御
  function toggleLoadingDisplay(show) {
    const displayStyle = show ? "block" : "none";
    document.querySelectorAll(".loading").forEach((loading) => {
      loading.style.display = displayStyle;
    });
  }

  // アニメーション再生条件の確認と処理
  if (
    !isAnimationPlayed &&
    (!lastAccessTime || Date.now() - Number(lastAccessTime) >= 4)
  ) {
    disableScroll();

    gsap.to(loadingBorder, {
      width: '100%',
      duration: 2.2,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(loadingBorder, {
          width: 0,
          opacity: 0,
          duration: 0.1,
          delay: 0,
          onComplete: () => {
            loadingBorder.style.display = 'none';
            setTimeout(() => {
              document.body.style.overflow = '';
            }, 1500);
          },
        });
      },
    });

    // topImageのアニメーション
    gsap.fromTo(
      topImage, {
        y: 0
      }, {
        y: "-100%",
        duration: 2,
        delay: 2.2,
        ease: "power2.out",
        onComplete: () => {
          topImage.style.display = 'none';
        },
      }
    );

    // bottomImageのアニメーション
    gsap.fromTo(
      bottomImage, {
        y: "100%"
      }, {
        y: "200%",
        duration: 2,
        delay: 2.2,
        ease: "power2.out",
        onComplete: () => {
          bottomImage.style.display = 'none';
        },
      }
    );

    // loadingの制御
    if (!sessionStorage.getItem(sessionKey)) {
      toggleLoadingDisplay(true);
      sessionStorage.setItem(sessionKey, true);
    } else {
      toggleLoadingDisplay(false);
    }

    sessionStorage.setItem("animationPlayed", true);
    Cookies.set("lastAccessTime", Date.now());
  } else {
    toggleLoadingDisplay(false);
  }


});