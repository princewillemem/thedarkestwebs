function SliderProject() {
    new Swiper(".slider-project .swiper-container", { slidesPerView: "auto", spaceBetween: 60, navigation: { nextEl: ".slider-button-next", prevEl: ".slider-button-prev" }, pagination: { el: ".swiper-pagination", type: "fraction" } });
}
function data_overlay() {
    $("[data-overlay-color]").each(function (e) {
        var t = $(this),
            n = dsnGrid.removeAttr(t, "data-overlay-color");
        t.addClass("dsn-overlay-" + e), $("body").append("<style>.dsn-overlay-" + e + "[data-overlay]:before{background: " + n + ";}</style>");
    });
}
function background() {
    $(".cover-bg, section , [data-image-src]").each(function () {
        var e = $(this).attr("data-image-src");
        void 0 !== e && !1 !== e && $(this).css("background-image", "url(" + e + ")");
    });
}
function slick_client(e) {
    var t = $(".client-curs");
    t.length > 0 &&
        (t.slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !0, infinite: !0, nextArrow: '<i class="fas fa-angle-right"></i>', prevArrow: '<i class="fas fa-angle-left"></i>', cssEase: "cubic-bezier(.9, .03, .41, .49)", speed: 700 }),
            e.width() > 991 && (dsnGrid.parallaxMoveElemnt(t.find(".fas.fa-angle-right"), 25), dsnGrid.parallaxMoveElemnt(t.find(".fas.fa-angle-left"), 25)));
}
function contactValidator() {
    var e = $("#contact-form");
    e < 1 ||
        (e.validator(),
            e.on("submit", function (t) {
                if (!t.isDefaultPrevented()) {
                    return (
                        $.ajax({
                            type: "POST",
                            url: "contact.php",
                            data: $(this).serialize(),
                            success: function (t) {
                                var n = "alert-" + t.type,
                                    a = t.message,
                                    i = '<div class="alert ' + n + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + a + "</div>";
                                n && a && (e.find(".messages").html(i), e[0].reset());
                            },
                        }),
                        !1
                    );
                }
            }));
}
function initMap() {
    var e = document.getElementById("map"),
        t = document.getElementById("map_api");
    if (null !== e) {
        if (null === t) {
            var n = document.createElement("script");
            (n.type = "text/javascript"), (n.id = "map_api"), (n.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxsUL270Mt2WWJC1pWZwFM667TMrUXgT4"), document.body.appendChild(n);
        }
        setTimeout(function () {
            try {
                var t = $("#map"),
                    n = t.data("dsn-lat"),
                    a = t.data("dsn-len"),
                    i = t.data("dsn-zoom"),
                    o = new google.maps.LatLng(n, a),
                    s = new google.maps.Map(e, {
                        center: { lat: n, lng: a },
                        zoom: i,
                        styles: [
                            { featureType: "all", elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }] },
                            { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }] },
                            { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                            { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 20 }] },
                            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }] },
                            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 20 }] },
                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 21 }] },
                            { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 17 }] },
                            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: 0.2 }] },
                            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 18 }] },
                            { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 16 }] },
                            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 19 }] },
                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 17 }] },
                        ],
                    });
                google.maps.event.addDomListener(window, "resize", function () {
                    var e = s.getCenter();
                    google.maps.event.trigger(s, "resize"), s.setCenter(e);
                });
                new google.maps.Marker({ position: o, animation: google.maps.Animation.BOUNCE, icon: "assets/img/map-marker.png?gh", title: "ASL", map: s });
            } catch (e) {
                console.log(e);
            }
        }, 1e3);
    }
}
!(function (e) {
    "use strict";
    function t(r) {
        data_overlay(),
            (function () {
                if (e('[data-dsn-temp="light"]').length > 0) {
                    i.addClass("v-light");
                    let t = e('[data-dsn-header="project"]');
                    t.length <= 0 ? i.addClass("menu-light") : t.hasClass("header-hero-2") && i.addClass("menu-light");
                } else i.removeClass("v-light");
            })(),
            background(),
            initMap(),
            (function () {
                const t = e(".filtering");
                var n = e(".gallery").isotope({ itemSelector: ".item", transitionDuration: "0.5s" });
                t.on("click", "button", function () {
                    var t = e(this).attr("data-filter");
                    n.isotope({ filter: t });
                }),
                    t.on("click", "button", function () {
                        e(this).addClass("active").siblings().removeClass("active");
                        let t = a;
                        s.isScroller(!0) && (t = s.getScrollbar()),
                            setTimeout(function () {
                                TweenLite.to(t, 1.5, { scrollTo: n.offset().top - 150, ease: Expo.easeInOut });
                            }, 500);
                    }),
                    n.find("video").each(function () {
                        this.pause();
                        e(this)
                            .parents(".item")
                            .find("> a")
                            .on("mouseenter", function () {
                                e(this).parents(".item").find("video")[0].play();
                            })
                            .on("mouseleave", function () {
                                e(this).parents(".item").find("video")[0].pause();
                            });
                    });
            })(),
            SliderProject(),
            slick_client(a),
            (function (s) {
                const r = "dsn-effect-animate",
                    l = '[data-dsn-ajax="img"]';
                var d = !0;
                return {
                    main_root: e("main.main-root"),
                    ajax_click: e("a.effect-ajax "),
                    isEffectAjax: function () {
                        return !i.hasClass("dsn-ajax");
                    },
                    ajaxLoad: function () {
                        var t = this;
                        s && this.ajax_click.off("click"),
                            this.ajax_click.on("click", function (a) {
                                if (!t.isEffectAjax()) {
                                    a.preventDefault();
                                    var i = e(this),
                                        o = i.attr("href"),
                                        s = i.data("dsn-ajax");
                                    o.indexOf("#") >= 0 ||
                                        void 0 === o ||
                                        (d &&
                                            ((d = !1),
                                                n().locked(),
                                                t.ajaxLoaderElemnt(!0),
                                                "slider" === s
                                                    ? t.ajaxSlider(i, o)
                                                    : "list" === s
                                                        ? t.ajaxList(i, o)
                                                        : "next-project" === s
                                                            ? t.ajaxNextProject(i, o)
                                                            : "blog" === s
                                                                ? t.ajaxBlog(i, o)
                                                                : "next" === s
                                                                    ? t.ajaxNext(i, o)
                                                                    : "work" === s
                                                                        ? t.ajaxWork(i, o)
                                                                        : t.ajaxNormal(o)));
                                }
                            });
                    },
                    ajaxSlider: function (t, n) {
                        let a = this,
                            i = t.parents(".slide-content").data("dsn-id"),
                            o = e('.dsn-slider .slide-item[data-dsn-id="' + i + '"] .cover-bg').first(),
                            s = n;
                        void 0 !== s &&
                            TweenMax.to(".project-metas , .nav-slider ,.footer-slid ,.view-all , .dsn-all-work ", 0.8, {
                                autoAlpha: 0,
                                scale: 0.8,
                                onComplete: function () {
                                    o.removeClass("hidden"), o.find("img").addClass("hidden"), a.createElement(o, s, e(".dsn-root-slider"));
                                },
                            });
                    },
                    ajaxList: function (t, n) {
                        let a = this,
                            o = e(".nav-work-img-box img.dsn-active").first(),
                            s = n;
                        void 0 !== s &&
                            TweenMax.to(".nav-work-box .list-main", 0.8, {
                                autoAlpha: 0,
                                onComplete: function () {
                                    a.createElement(o, s),
                                        setTimeout(function () {
                                            i.removeClass("dsn-show-work");
                                        }, 1e3);
                                },
                            });
                    },
                    ajaxNextProject: function (e, t) {
                        let n = this,
                            a = e.parents(".next-project"),
                            i = a.find(".bg-image").first(),
                            o = t;
                        void 0 !== o &&
                            (TweenMax.to("footer", 0.8, { autoAlpha: 0, y: -50 }),
                                TweenMax.staggerTo(a.find(".project-title").find("span , h5"), 0.8, { autoAlpha: 0, y: -50 }, 0.1, function () {
                                    n.createElement(i, o, a.find(".bg"));
                                }));
                    },
                    ajaxBlog: function (e, t) {
                        let n = this,
                            a = e.parents(".post-list-item").find(".bg").first(),
                            i = t;
                        void 0 !== i &&
                            (TweenMax.to(a.find("img"), 0.8, { scale: 1, height: "100%", top: 0, y: "0%" }),
                                TweenMax.to(".post-list-item-content", 0.8, {
                                    autoAlpha: 0,
                                    scale: 0.8,
                                    onComplete: function () {
                                        n.createElement(a.find("img"), i);
                                    },
                                }));
                    },
                    ajaxWork: function (e, t) {
                        let n = e.find("img");
                        n.removeClass("hidden");
                        let a = this;
                        TweenMax.to(n, 0.8, {
                            scale: 1,
                            height: "100%",
                            top: 0,
                            y: "0%",
                            onComplete: function () {
                                a.createElement(n, t);
                            },
                        });
                    },
                    createElement: function (a, o, s, d, c) {
                        let u = this,
                            f = e('<div class="active-ajax-e"></div>');
                        f.css({ position: "fixed", width: "100%", height: "100%", top: 0, left: 0, zIndex: 999, visibility: "hidden", opacity: 0 }), f.css("background-color", i.css("background-color"));
                        var h = u.addElement(f, a, s);
                        i.append(f);
                        let g = 0,
                            m = 0.5;
                        TweenMax.to(f, 1, {
                            autoAlpha: 1,
                            ease: Power4.easeInOut,
                            onComplete: function () {
                                i.removeClass(r),
                                    u.loader(o, function (a, o, s) {
                                        var d = e(l);
                                        if (d.length <= 0)
                                            return (
                                                TweenMax.to([f, h], 1, {
                                                    width: 0,
                                                    autoAlpha: 0,
                                                    delay: 1,
                                                    ease: Expo.easeIn,
                                                    onStart: function () {
                                                        n().unlocked(), t();
                                                    },
                                                    onComplete: function () {
                                                        i.addClass(r),
                                                            setTimeout(function () {
                                                                f.remove();
                                                            }, 500);
                                                    },
                                                }),
                                                !1
                                            );
                                        var c = (d = d.first()).offset();
                                        void 0 === c && (c = { top: 0, left: 0 }),
                                            (g = 0.8),
                                            (m = 1),
                                            TweenMax.to(h, 1, {
                                                top: c.top,
                                                left: c.left,
                                                width: d.width(),
                                                height: d.height(),
                                                objectFit: "cover",
                                                borderRadius: 0,
                                                onComplete: function () {
                                                    TweenMax.to(f, m, {
                                                        height: 0,
                                                        onComplete: function () {
                                                            n().unlocked(), u.showAnimate();
                                                        },
                                                    }),
                                                        TweenMax.to(h, m, {
                                                            autoAlpha: 0,
                                                            delay: g,
                                                            onComplete: function () {
                                                                f.remove();
                                                            },
                                                        });
                                                },
                                            });
                                    });
                            },
                        });
                    },
                    addElement: function (e, t, n) {
                        if (void 0 === t || t.length <= 0) return;
                        (void 0 === n || n.length <= 0) && (n = t);
                        let a = t.clone(),
                            i = n[0].getBoundingClientRect();
                        return void 0 === i && (i = { left: 0, top: 0 }), a.css({ position: "absolute", display: "block", transform: "", transition: "", objectFit: "cover" }), a.css(dsnGrid.getBoundingClientRect(n[0])), e.append(a), a;
                    },
                    ajaxNormal: function (t) {
                        var o = this,
                            s = e('<div class="class-ajax-loader"></div>');
                        s.css({
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#1b1b1b",
                            zIndex: 900199,
                            "-webkit-transform": "translateY(100%)",
                            "-ms-transform": "translateY(100%)",
                            transform: "translateY(100%)",
                        }),
                            i.append(s);
                        var r = e(document).height() - a.height() - 150;
                        a.scrollTop() < r && TweenMax.fromTo(this.main_root, 1, { y: 0 }, { y: -150, ease: Expo.easeIn }),
                            TweenMax.to(s, 1, {
                                y: 0,
                                ease: Expo.easeIn,
                                onComplete: function () {
                                    o.loader(t, function () {
                                        dsnGrid.scrollTop(0, 1), n().unlocked();
                                    });
                                },
                            });
                    },
                    hideAnimate: function () {
                        TweenMax.set(e(o.animateTextAjax), { autoAlpha: 0, y: -50 });
                    },
                    showAnimate: function () {
                        TweenMax.staggerTo(e(o.animateTextAjax), 1, { autoAlpha: 1, y: 0 }, 0.2);
                    },
                    loader: function (t, n) {
                        var a = this;
                        i.removeClass("dsn-effect-animate"),
                            this.main_root.load(t + " main.main-root > *", function (i, o, s) {
                                var r = e(this);
                                a.hideAnimate(),
                                    "error" !== o
                                        ? (a.ajaxTitle(t),
                                            history.pushState(null, null, t),
                                            setTimeout(function () {
                                                a.animateAjaxEnd(), void 0 !== n && n(r, i, s), (d = !0);
                                            }, 500))
                                        : (window.location = t);
                            });
                    },
                    animateAjaxEnd: function () {
                        var n = this;
                        n.main_root.css("transform", "");
                        let a = e(".class-ajax-loader");
                        TweenMax.fromTo(
                            a,
                            1,
                            { y: "0%" },
                            {
                                y: "-100%",
                                ease: Expo.easeIn,
                                onComplete: function () {
                                    a.remove(), n.ajaxLoaderElemnt(), n.showAnimate();
                                },
                                delay: 1,
                            }
                        ),
                            t(!0);
                    },
                    ajaxNext: function (t, n) {
                        var a = e('.dsn-imgs[data-dsn-next="blog"]'),
                            i = this;
                        a.length <= 0
                            ? i.ajaxNormal(n)
                            : (TweenMax.set(a, { autoAlpha: 1, zIndex: 99999999 }),
                                TweenMax.to(a, 1, {
                                    top: 0,
                                    ease: Expo.easeInOut,
                                    onComplete: function () {
                                        e('[data-dsn-header="blog"]').css("width", "100%"), i.createElement(a, n);
                                    },
                                }));
                    },
                    ajaxTitle: function (t) {
                        e("title").load(t + " title", "", function (t) {
                            document.title = e(this).text();
                        });
                        var n = e("#wpadminbar");
                        n.length > 0 &&
                            n.load(t + " #wpadminbar", "", function (t) {
                                n.html(e(this).html());
                            });
                    },
                    ajaxLoaderElemnt: function (e) {
                        e ? i.addClass("dsn-ajax-effect") : i.removeClass("dsn-ajax-effect");
                    },
                };
            })(r).ajaxLoad(),
            (function (t) {
                function n() {
                    dsnGrid.elementHover(a, "a , .to-prev , .to-next , .fas.fa-angle-right , .fas.fa-angle-left , .hero__down , .link-click , .filter-btn , .icon__fixed , .t-link , .button-next , .toggle , input", "custom-cursor-link"),
                        dsnGrid.elementHover(a, ".dsn-video , .projs-item-img-container , .close-filters", "hidden");
                }
                var a = ".global-cursor .custom-cursor";
                if (void 0 !== t && !0 === t) return void n();
                if (e("body").hasClass("dsn-large-mobile")) return;
                dsnGrid.mouseMove(a, {
                    onComplete: function (e, t) {
                        t.hasClass("effect-cursor") || t.addClass("effect-cursor");
                    },
                    onUpdate: function (e, t, n, a) {
                        a.hasClass("effect-cursor") && a.removeClass("effect-cursor");
                    },
                }),
                    n();
            })(r),
            e(".client-see .slick-slider  ").slick({ infinite: !0, slidesToShow: 1, arrows: !1, dots: !0, fade: !0, cssEase: "linear" }),
            e(' .our-news .slick-slider , .our-team .slick-slider , [data-dsn-col="2"] .slick-slider').slick({
                infinite: !0,
                slidesToShow: 2,
                arrows: !1,
                dots: !0,
                responsive: [{ breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } }],
            }),
            e('[data-dsn-col="3"] .slick-slider').slick({
                infinite: !0,
                slidesToShow: 3,
                arrows: !1,
                dots: !0,
                responsive: [
                    { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            }),
            e(".gallery-col .box-im .image-zoom").magnificPopup({
                delegate: "a",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                gallery: { enabled: !0 },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function (e) {
                        return e.find("img");
                    },
                },
            }),
            (function () {
                var t = e(".gallery-portfolio");
                if (t.length < 1) return;
                t.justifiedGallery({ rowHeight: 300, margins: 15 }),
                    t.magnificPopup({
                        delegate: "a",
                        type: "image",
                        closeOnContentClick: !1,
                        closeBtnInside: !1,
                        mainClass: "mfp-with-zoom",
                        gallery: { enabled: !0 },
                        zoom: {
                            enabled: !0,
                            duration: 300,
                            easing: "ease-in-out",
                            opener: function (e) {
                                return e.find("img");
                            },
                        },
                        callbacks: {
                            open: function () {
                                e("html").css({ margin: 0 });
                            },
                            close: function () { },
                        },
                    });
            })(),
            (function () {
                const t = e(".view-all");
                if (t.length <= 0) return;
                t.on("click", function () {
                    i.toggleClass("dsn-show-work");
                });
                const n = e(".nav-work-box").find(".work-item"),
                    a = e(".nav-work-img-box");
                n.each(function (t) {
                    let n = e(this);
                    n.attr("data-dsn-id", t);
                    let i = n.find("img");
                    i.attr("data-dsn-id", t), n.hasClass("dsn-active") && i.addClass("dsn-active"), a.append(i);
                }),
                    n.on("mouseenter", function () {
                        let t = (function (e) {
                            let t = e.data("dsn-id");
                            return a.find('img[data-dsn-id="' + t + '"]');
                        })(e(this));
                        if (t.hasClass("dsn-active") || i.hasClass("dsn-ajax-effect")) return;
                        n.removeClass("dsn-active"), e(this).addClass("dsn-active");
                        let o = a.find(".dsn-active");
                        a.find("img").removeClass("dsn-active").removeClass("dsn-active-enter").removeClass("dsn-active-leve"), o.addClass("dsn-active-leve"), t.addClass("dsn-active dsn-active-enter");
                    });
            })(),
            (function () {
                const t = e(".dsn-slider"),
                    n = 1.2;
                return {
                    initSlider: function () {
                        const n = t.find(".slide-item"),
                            a = t.find(".dsn-slider-content");
                        n.each(function (t) {
                            e(this).attr("data-dsn-id", t);
                            let n = e(this).find(".slide-content");
                            n.attr("data-dsn-id", t), 0 === t && n.addClass("dsn-active dsn-active-cat"), a.append(n);
                            let i = n.find(".title-text-header-inner a");
                            dsnGrid.convertTextLine(i, i);
                        });
                    },
                    progress: function (e) {
                        e.on("progress", function () {
                            let e = this;
                            for (let t = 0; t < e.slides.length; t++) {
                                let n = e.slides[t].progress,
                                    a = 0.5 * e.width,
                                    i = n * a;
                                e.slides[t].querySelector(".image-bg").style.transform = "translateX(" + i + "px) ";
                            }
                        });
                    },
                    slideChange: function (a) {
                        var i = this;
                        a.on("slideChangeTransitionStart", function () {
                            let o = t.find(".dsn-slider-content .dsn-active"),
                                s = o.data("dsn-id");
                            let r = e(a.slides[a.activeIndex]).data("dsn-id");
                            if (s === r) return;
                            t.find('[data-dsn="video"] video').each(function () {
                                this.pause();
                            });
                            let l = e(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                            l.length > 0 && l[0].play();
                            let d = o.find(".dsn-chars-wrapper");
                            o.removeClass("dsn-active-cat");
                            let c = t.find('.dsn-slider-content [data-dsn-id="' + r + '"]'),
                                u = c.find(".dsn-chars-wrapper"),
                                f = s > r,
                                h = new TimelineLite();
                            h.staggerFromTo(dsnGrid.randomObjectArray(d, 0.3), 0.3, i.showText().title, i.hideText(f).title, 0.1, 0, function () {
                                t.find(".dsn-slider-content .slide-content").removeClass("dsn-active"), t.find(".dsn-slider-content .slide-content").removeClass("dsn-active-cat"), c.addClass("dsn-active"), c.addClass("dsn-active-cat");
                            }),
                                h.staggerFromTo(dsnGrid.randomObjectArray(u, n), n, i.hideText(f).title, i.showText().title, 0.1, "-=.8");
                        });
                    },
                    showText: function () {
                        return { title: { autoAlpha: 1, x: "0%", scale: 1, rotation: 0, ease: Elastic.easeInOut, yoyo: !0 }, subtitle: { autoAlpha: 1, y: "0%", ease: Elastic.easeOut } };
                    },
                    hideText: function (e) {
                        let t = "-90%";
                        return e && (t = "90%"), { title: { autoAlpha: 0, x: t, rotation: 8, scale: 1.2, ease: Elastic.easeOut, yoyo: !0 }, subtitle: { autoAlpha: 0, y: t, ease: Elastic.easeOut } };
                    },
                    touchStart: function (e) {
                        e.on("touchStart", function () {
                            let e = this;
                            for (let t = 0; t < e.slides.length; t++) e.slides[t].style.transition = "";
                        });
                    },
                    setTransition: function (e) {
                        e.on("setTransition", function (e) {
                            let t = this;
                            for (let n = 0; n < t.slides.length; n++) (t.slides[n].style.transition = e + "ms"), (t.slides[n].querySelector(".image-bg").style.transition = e + "ms");
                        });
                    },
                    swiperObject: function () {
                        return new Swiper(".dsn-slider .slide-inner", {
                            speed: 1500,
                            allowTouchMove: !0,
                            resistanceRatio: 0.65,
                            navigation: { nextEl: ".dsn-slider .control-nav .next-container", prevEl: ".dsn-slider .control-nav .prev-container" },
                            pagination: {
                                el: ".dsn-slider .footer-slid .control-num span",
                                type: "custom",
                                clickable: !0,
                                renderCustom: function (e, t, n) {
                                    return dsnGrid.numberText(t);
                                },
                            },
                            on: {
                                init: function () {
                                    this.autoplay.stop(),
                                        t.find('[data-dsn="video"] video').each(function () {
                                            this.pause();
                                        });
                                },
                                imagesReady: function () {
                                    let t = e(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                                    t.length > 0 && t[0].play();
                                },
                            },
                        });
                    },
                    run: function () {
                        if (t.length <= 0) return;
                        this.initSlider();
                        var n = this.swiperObject();
                        if ((this.progress(n), this.touchStart(n), this.setTransition(n), this.slideChange(n), e(".nav-slider").length <= 0)) return;
                        let a = new Swiper(".nav-slider", { speed: 1500, slidesPerView: 3, centeredSlides: !0, touchRatio: 0.2, slideToClickedSlide: !0, direction: "vertical", resistanceRatio: 0.65 });
                        (n.controller.control = a), (a.controller.control = n);
                    },
                };
            })().run(),
            e("a.vid").YouTubePopUp();
    }
    function n() {
        const t = window.Scrollbar;
        var n = document.querySelector("#dsn-scrollbar");
        return {
            isMobile: function () {
                return !!(
                    navigator.userAgent.match(/Android/i) ||
                    navigator.userAgent.match(/webOS/i) ||
                    navigator.userAgent.match(/iPhone/i) ||
                    navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/iPod/i) ||
                    navigator.userAgent.match(/BlackBerry/i) ||
                    navigator.userAgent.match(/Windows Phone/i) ||
                    navigator.userAgent.match(/Edge/i) ||
                    navigator.userAgent.match(/MSIE 10/i) ||
                    navigator.userAgent.match(/MSIE 9/i)
                );
            },
            isMobiles: function () {
                return !!(
                    navigator.userAgent.match(/Android/i) ||
                    navigator.userAgent.match(/webOS/i) ||
                    navigator.userAgent.match(/iPhone/i) ||
                    navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/iPod/i) ||
                    navigator.userAgent.match(/BlackBerry/i) ||
                    navigator.userAgent.match(/Windows Phone/i) ||
                    navigator.userAgent.match(/Edge/i) ||
                    navigator.userAgent.match(/MSIE 10/i) ||
                    navigator.userAgent.match(/MSIE 9/i) ||
                    a.width() <= 991
                );
            },
            isScroller: function (e) {
                e && (n = document.querySelector("#dsn-scrollbar"));
                let t = !i.hasClass("dsn-effect-scroll") || this.isMobile() || null === n;
                return t && e && i.addClass("dsn-mobile"), !t;
            },
            locked: function () {
                if ((i.addClass("locked-scroll"), this.isScroller())) {
                    let e = this.getScrollbar();
                    void 0 !== e && e.destroy();
                }
            },
            unlocked: function () {
                i.removeClass("locked-scroll"), this.start(), r.allInt(), dsnGrid.progressCircle(s);
            },
            getScrollbar: function (e) {
                return void 0 === e ? t.get(n) : t.get(document.querySelector(e));
            },
            getListener: function (e) {
                if (void 0 !== e) {
                    var t = this;
                    t.isScroller(!0) ? t.getScrollbar().addListener(e) : a.on("scroll", e);
                }
            },
            start: function () {
                if (
                    (dsnGrid.scrollTop(0, 1),
                        e(".scroll-to").on("click", function (t) {
                            t.preventDefault();
                            let n = a;
                            s.isScroller(!0) && (n = s.getScrollbar()), TweenLite.to(n, 1.5, { scrollTo: e(".wrapper").offset().top, ease: Expo.easeInOut });
                        }),
                        !this.isScroller(!0))
                )
                    return;
                let i = 0.05;
                this.isMobiles() && (i = 0.02), t.init(n, { damping: i }), this.workScroll();
            },
            sliderScroll: function () {
                t.init(document.querySelector(".slider .main-slider .slider-nav-list"), { damping: 0.05 });
            },
            menuScroll: function () {
                t.init(document.querySelector(".nav__content"), { damping: 0.05 });
            },
            commentScroll: function () {
                const e = document.querySelector(".comment-modal .comment-modal-container");
                null !== e && t.init(e, { damping: 0.05 });
            },
            sidebarScroll: function () {
                const e = document.querySelector(".dsn-sidebar .sidebar-single");
                null !== e && t.init(e, { damping: 0.05 });
            },
            workScroll: function () {
                const e = document.querySelector(".dsn-all-work .dsn-work-scrollbar");
                null !== e && t.init(e, { damping: 0.05 });
            },
        };
    }
    const a = e(window),
        i = e("body"),
        o = { animateTextAjax: '.dsn-nav-bar , .headefr-fexid .project-title .title-text-header .cat ,[data-dsn-animate="ajax"] , footer, .next-project , .root-project' };
    !(function () {
        var t = e(".preloader"),
            n = t.find(".preloader-block"),
            i = n.find(".percent"),
            o = n.find(".title"),
            s = n.find(".loading"),
            r = t.find(".preloader-bar"),
            l = r.find(".preloader-progress"),
            d = t.find(".preloader-after"),
            c = t.find(".preloader-before"),
            u = dsnGrid.pageLoad(0, 100, 300, function (e) {
                i.text(e), l.css("width", e + "%");
            });
        a.on("load", function () {
            clearInterval(u),
                TweenMax.fromTo(
                    l,
                    0.5,
                    { width: "95%" },
                    {
                        width: "100%",
                        onUpdate: function () {
                            var e = (l.width() / l.parent().width()) * 100;
                            i.text(parseInt(e, 10));
                        },
                        onComplete: function () {
                            TweenMax.to(r, 0.5, { left: "100%" }),
                                TweenMax.to(o, 1, { autoAlpha: 0, y: -100 }),
                                TweenMax.to(s, 1, { autoAlpha: 0, y: 100 }),
                                TweenMax.to(i, 1, { autoAlpha: 0 }),
                                TweenMax.to(c, 1, { y: "-100%", delay: 0.7 }),
                                TweenMax.to(d, 1, {
                                    y: "100%",
                                    delay: 0.7,
                                    onComplete: function () {
                                        t.addClass("hidden");
                                    },
                                });
                        },
                    }
                );
        });
    })(),
        (function () {
            var t = e(".menu-icon");
            e(".site-header .custom-drop-down > a").on("click", function () {
                return !1;
            }),
                a.on("load", function () {
                    const n = e(".site-header nav > ul");
                    if (n.length <= 0) return;
                    let a = n[0].outerHTML;
                    (a = e(a)).attr("class", "nav__list"), a.find("li.custom-drop-down").attr("class", "nav__list-dropdown"), a.find("li").addClass("nav__list-item");
                    let o = e(".header-top .nav .nav__content");
                    void 0 !== o && o.prepend(a),
                        t.on("click", function () {
                            i.toggleClass("nav-active");
                        }),
                        e(".nav__list-item:not(.nav__list-dropdown) ").on("click", function () {
                            i.removeClass("nav-active");
                        }),
                        e(".nav__list-dropdown > a").on("click", function (t) {
                            t.preventDefault();
                            var n = e(this).parent(),
                                a = n.find("ul").css("display");
                            e(".nav__list-dropdown").find("ul").slideUp("slow"), "block" !== a && n.find("ul").slideDown("slow");
                        });
                }),
                a.on("scroll", function () {
                    var t = a.scrollTop(),
                        n = e(".site-header , .header-top"),
                        i = e(".page-content").offset(),
                        o = 70;
                    void 0 !== i && (o = i.top), t > o ? (n.addClass("header-stickytop"), e(".sections").addClass("body-pt")) : (n.removeClass("header-stickytop"), e("body").css("paddingTop", 0));
                });
            var n = e(".header-top .header-container .menu-icon .text-menu");
            if (!(n.length <= 0)) {
                var o = n.find(".text-button"),
                    s = n.find(".text-open"),
                    r = n.find(".text-close");
                dsnGrid.convertTextWord(o, o, !0), dsnGrid.convertTextWord(s, s, !0), dsnGrid.convertTextWord(r, r, !0);
            }
        })();
    var s = n(),
        r = (function () {
            var t = new ScrollMagic.Controller();
            const n = '[data-dsn-header="project"]',
                o = '[data-dsn-footer="project"]';
            return {
                clearControl: function () {
                    t = new ScrollMagic.Controller();
                },
                isElemntId: function (e) {
                    return null !== document.getElementById(e);
                },
                headerProject: function () {
                    if (e(n).length <= 0) return !1;
                    let a = e("#dsn-hero-parallax-img"),
                        o = e("#dsn-hero-parallax-title"),
                        s = e("#dsn-hero-parallax-fill-title"),
                        r = e("#descover-holder"),
                        l = 1.2;
                    a.hasClass("parallax-move-element") && dsnGrid.parallaxMoveElemnt({ target: e(n), element: a.find(".cover-bg") }, 5, 1);
                    var d = new TimelineMax();
                    if (a.length > 0) {
                        let e = a.hasClass("has-top-bottom") ? 1 : 1.08;
                        d.to(a, 1, { force3D: !0, y: "30%", scale: e }, 0);
                    }
                    if (
                        (o.length > 0 && (o.hasClass("project-title") && (l = 1), d.to(o, 0.8, { force3D: !0, top: "30%", autoAlpha: 0, scale: l }, 0)),
                            s.length > 0 && d.to(s, 1, { force3D: !0, height: 80 }, 0).to("#dsn-hero-parallax-fill-title h1", 1, { force3D: !0, top: 0 }, 0).to(o.find(".slider-header.slider-header-top"), 1, { force3D: !0, height: 0 }, 0),
                            r.length > 0 && d.to(r, 0.8, { force3D: !0, bottom: "-10%", autoAlpha: 0 }, 0),
                            d._totalDuration <= 0)
                    )
                        return !1;
                    var c = new ScrollMagic.Scene({ triggerElement: n, triggerHook: 0, duration: "100%" }).setTween(d).addTo(t);
                    let u = a.find("video");
                    return (
                        (u.length > 0 || i.hasClass("v-light")) &&
                        (c.on("enter", function () {
                            u.length > 0 && u.get(0).play(), i.hasClass("v-light") && !e(n).hasClass("header-hero-2") && i.removeClass("menu-light");
                        }),
                            c.on("leave", function () {
                                u.length > 0 && u.get(0).pause(), i.hasClass("v-light") && !e(n).hasClass("header-hero-2") && i.addClass("menu-light");
                            })),
                        c
                    );
                },
                nextProject: function () {
                    let n = e("#dsn-next-parallax-img"),
                        a = e("#dsn-next-parallax-title"),
                        r = !(n.length <= 0) && new ScrollMagic.Scene({ triggerElement: o, triggerHook: 1, duration: "100%" }).setTween(TweenMax.to(n, 1, { force3D: !0, y: "30%", scale: 1 }, 0)).addTo(t),
                        l = !(a.length <= 0) && new ScrollMagic.Scene({ triggerElement: o, triggerHook: 0.5, duration: "55%" }).setTween(TweenMax.to(a, 1, { force3D: !0, top: "0%", opacity: 1, ease: Power0.easeNone }, 0)).addTo(t);
                    s.getListener(function (e) {
                        !1 !== r && r.refresh(), !1 !== l && l.refresh();
                    }),
                        !1 !== l &&
                        i.hasClass("v-light") &&
                        l.on("progress", function (e) {
                            e.progress > 0.8 ? i.removeClass("menu-light") : i.addClass("menu-light");
                        });
                },
                parallaxImg: function () {
                    e('[data-dsn-grid="move-up"]').each(function () {
                        let n = e(this);
                        n.attr("data-dsn-grid", "moveUp");
                        let a = n.find("img:not(.hidden) , video"),
                            i = dsnGrid.getUndefinedVal(n.data("dsn-triggerhook"), 1),
                            o = dsnGrid.getUndefinedVal(n.data("dsn-duration"), 1 !== i ? "100%" : "200%");
                        if (a.length > 0) {
                            var r;
                            if (a.hasClass("has-top-bottom")) {
                                let e = dsnGrid.getUndefinedVal(a.data("dsn-move"), "15%");
                                r = TweenMax.to(a, 0.8, { force3D: !0, y: e, ease: Power0.easeNone });
                            } else {
                                let e = dsnGrid.getUndefinedVal(a.data("dsn-y"), "10%"),
                                    t = dsnGrid.getUndefinedVal(a.data("dsn-scale"), 1.1);
                                1 !== i ? (a.css("top", 0), (r = TweenMax.to(a, 2, { force3D: !0, scale: t, y: e }))) : (r = TweenMax.to(a, 1, { force3D: !0, scale: t, y: e, ease: Power0.easeNone }));
                            }
                            var l = new ScrollMagic.Scene({ triggerElement: this, triggerHook: i, duration: o }).setTween(r).addTo(t);
                            s.getListener(function () {
                                l.refresh();
                            });
                        }
                    });
                },
                moveSection: function () {
                    e('[data-dsn-grid="move-section"]').each(function () {
                        let n = e(this);
                        n.removeAttr("data-dsn-grid"), n.addClass("dsn-move-section");
                        let i = dsnGrid.getUndefinedVal(n.data("dsn-move"), -100),
                            o = dsnGrid.getUndefinedVal(n.data("dsn-triggerhook"), 1),
                            r = dsnGrid.getUndefinedVal(n.data("dsn-opacity"), n.css("opacity")),
                            l = dsnGrid.getUndefinedVal(n.data("dsn-duration"), "150%");
                        if ("tablet" === n.data("dsn-responsive") && a.width() < 992) return;
                        let d = TweenMax.to(n, 2, { y: i, autoAlpha: r, ease: Power0.easeNone });
                        var c = new ScrollMagic.Scene({ triggerElement: this, triggerHook: o, duration: l }).setTween(d).addTo(t);
                        s.getListener(function () {
                            c.refresh();
                        });
                    });
                },
                parallaxImgHover: function () {
                    const t = e('[data-dsn="parallax"]');
                    0 === t.length ||
                        a.width() < 992 ||
                        t.each(function () {
                            var t = e(this),
                                n = (dsnGrid.removeAttr(t, "data-dsn"), dsnGrid.removeAttr(t, "data-dsn-speed")),
                                a = dsnGrid.removeAttr(t, "data-dsn-move"),
                                i = !1;
                            t.hasClass("image-zoom") && (i = !0), dsnGrid.parallaxMoveElemnt(t, a, n, void 0, i);
                        });
                },
                changeColor: function () {
                    const n = "v-light";
                    var a = i.hasClass(n);
                    e('[data-dsn="color"]').each(function () {
                        let o = dsnGrid.getUndefinedVal(e(this).data("dsn-duration"), e(this).outerHeight() + 70);
                        var r = new ScrollMagic.Scene({ triggerElement: this, triggerHook: 0.05, duration: o }).addTo(t);
                        r.on("enter", function () {
                            a ? i.removeClass(n) : i.addClass(n);
                        }),
                            r.on("leave", function () {
                                a ? i.addClass(n) : i.removeClass(n);
                            }),
                            s.getListener(function () {
                                r.refresh();
                            });
                    });
                },
                animateText: function () {
                    e('[data-dsn-animate="text"] , [data-dsn-animate="up"]').each(function () {
                        let n = e(this),
                            a = 1;
                        "text" === n.data("dsn-animate") ? (dsnGrid.convertTextWord(n, n), n.attr("data-dsn-animate", "animate")) : (a = 0.8);
                        var i = new ScrollMagic.Scene({ triggerElement: this, reverse: !1, triggerHook: a }).setClassToggle(this, "dsn-active").addTo(t);
                        s.getListener(function () {
                            i.refresh();
                        });
                    });
                },
                headerBlog: function () {
                    const n = e('[data-dsn-header="blog"]');
                    if (!(n.length <= 0 || a.width() < 992)) {
                        var i = new ScrollMagic.Scene({ triggerElement: ".header-single-post", triggerHook: 0, duration: "100%" }).setTween(TweenMax.fromTo(n, 1, { width: "100%" }, { width: "80%" })).addTo(t);
                        s.getListener(function () {
                            i.refresh();
                        });
                    }
                },
                allInt: function () {
                    this.clearControl();
                    let e = this.headerProject();
                    s.getListener(function (t) {
                        !1 !== e && e.refresh();
                    }),
                        this.nextProject(),
                        this.parallaxImgHover(),
                        this.parallaxImg(),
                        this.moveSection(),
                        this.animateText(),
                        this.changeColor();
                },
            };
        })();
    s.start(),
        r.allInt(),
        t(),
        a.on("popstate", function (a) {
            e("main.main-root").load(document.location + " main.main-root > *", function () {
                t(!0), n().unlocked();
            });
        });
})(jQuery);
