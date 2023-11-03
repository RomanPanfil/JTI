const FARBA = {
  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  }
};


document.addEventListener('DOMContentLoaded', () => {
  // Проверка localStorage на подтверждение возраста

  if (localStorage.getItem('age_confirm') && localStorage.getItem('age_confirm') === 'Y') {
    document.querySelector('.confirm').classList.add('enter')
    document.querySelector('.wrapper').classList.remove('non-scroll')
    setTimeout(()=> {
      document.querySelector('.confirm').remove()
    },750)
  } else {
    document.querySelector('.confirm').classList.add('visible')
  }

  // подтверждение возраста
  (function() {
    const confirmButton = document.querySelectorAll('.confirm-btn');  
   

    confirmButton.forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        if(ev.target.getAttribute('data-answer') === 'yes') {
          console.log('yes'); 
          document.querySelector('.confirm').classList.add('enter')
          document.querySelector('.wrapper').classList.remove('non-scroll')
          setTimeout(()=> {
            document.querySelector('.confirm').remove()
          },500)
          localStorage.setItem('age_confirm','Y')
        }       
      });
    })
  })();

  // переключение табов
  (function() {
    if (!document.querySelector('.ui-tab') || !document.querySelector('.ui-tabs-wrapper')) return

    const tabs = document.querySelectorAll('.ui-tab');
    const tabsPanel = document.querySelectorAll('.ui-tabs-wrapper');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        
        let tabId = this.getAttribute('data-tab');
        
        tabs.forEach(item => {
          item.classList.remove('active');
        });
        
        this.classList.add('active');

        tabsPanel.forEach(panel => {
        if(panel.id === tabId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      });
    });
  })();

  (function() {
    if (!document.querySelector('.product-slider')) return
  
    var swiper = new Swiper('.product-slider', {   
      grabCursor: true,    
      slidesPerView: 1.1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      autoplay: false,      
      navigation: {
        nextEl: ".product-slider-container .slider-next",
        prevEl: ".product-slider-container .slider-prev",
      },
      breakpoints: {             
        480: {
          slidesPerView: 2,   
          spaceBetween: 14,   
        },
        768: {
          slidesPerView: 3,       
          spaceBetween: 18,   
        },      
        1366: {
          slidesPerView: 4,
          spaceBetween: 20,       
        },        
      }   
    });  
  })();

  // загруженный файл в форме
  (function() {
    if (!document.querySelector('.ui-input-file')) return

    document.querySelector('.ui-input-file').addEventListener('change', function(e) {
      let fileName = e.target.files[0].name;
      document.querySelector('.ui-send span').textContent = fileName;
    });
  })();

  // маска ввода номера телефона
  function initMask() {
    const inputs = document.querySelectorAll('.ux-phonemask'); 
    if(!inputs.length) return

    inputs.forEach(element => {
      IMask(element, {
        mask: [
          {
            mask: '+{375} (00) 000 00 00',
            startsWith: '375',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+{7} (000) 000 00 00',
            startsWith: '7',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+0000000000000',
            startsWith: '',
            country: 'unknown'
          }
        ],
        dispatch: (appended, dynamicMasked) => {
          const number = (dynamicMasked.value + appended).replace(/\D/g,'');
      
          return dynamicMasked.compiledMasks.find(m => number.indexOf(m.startsWith) === 0);
        }
      })
    })
  };

  initMask();

  // стилизация чекбокса и радио-кнопки
  (function() {
    const elements = document.querySelectorAll('.ui-checkbox, .ui-radio');

    Array.from(elements).forEach(function(element) {
      $(element).styler();
    });
  })();

  // раскрытие фильтрации
  (function() {
    if (!document.querySelector('.characteristic-filter-title') || !document.querySelector('.characteristic-filter-positions')) return
    
    const title = document.querySelector('.characteristic-filter-title');
    const content = document.querySelector('.characteristic-filter-positions');
    
    title.addEventListener('click', () => {
      if (content.classList.contains('open')) {
        content.classList.remove('open');
        content.style.maxHeight = null;
        title.classList.remove('open')
      } else {
        content.classList.add('open');
        title.classList.add('open')
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  })();

  // main slider
  (function() {
    const mainSlider = new Swiper('.main-slider', {
      autoHeight: true,
      loop: true,    
      slidesPerView: 'auto',    
      navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
      },   
    });
  })();

  // добавление тугглера в nav
  (function() {
    if(!document.querySelector('.header-nav li')) return

    const lis = document.querySelectorAll('.header-nav li');

    lis.forEach(li => {
      const a = li.querySelector('a');

      if (a && li.querySelector('ul')) {
        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        a.insertAdjacentElement('afterend', icon);
      }
    });
    
  })();

  // cookies
  (function() {
    if (!document.querySelector('.cookies') || !document.querySelector('.cookies .ui-btn-cross')) return

    const cookiesBlock = document.querySelector('.cookies');
    const closeBtn = document.querySelector('.cookies .ui-btn-cross');

    closeBtn.addEventListener('click', closeCookiesBlock);

    function closeCookiesBlock() {
      cookiesBlock.classList.add('hidden');
    }
  })();

  // бургер-меню
  function toggleBurgerMenu() {
    
    if (document.querySelector('.header-nav ul') && document.querySelector('.burger-btn span')) {
      document.querySelector('.mobile-menu').classList.toggle('active');
      document.querySelector('.burger-btn span').classList.toggle('active');        

      document.body.style.overflow =  document.querySelector('.mobile-menu.active') ? 'hidden' : '';
      
      document.querySelector('.header').classList.toggle('header__white');
      
      function toggleLogo() {
        const logoImg = document.querySelector('.header__main .header-logo img');
      
        if (logoImg) {      
          const mobileMenu = document.querySelector('.mobile-menu');
      
          logoImg.src = mobileMenu.classList.contains('active')
            ? './images/logo.svg' 
            : './images/logo-white.svg';      
        }      
      }
      
      toggleLogo();
    }  
  };

  (function() {
    if(!document.querySelector('.burger-btn') || !document.querySelector('.header-nav ul')) return

    const menuBtn = document.querySelector('.burger-btn');   

    menuBtn.addEventListener('click', toggleBurgerMenu);  
  })();


  // клонирование и вставки навигации для мобильного отображаения
  (function() {
    if (!document.querySelector('.header-nav__left > ul > li') || !document.querySelector('.header-nav__right > ul > li') || !document.querySelector('.mobile-nav')) return

    const leftNav = document.querySelectorAll('.header-nav__left > ul > li');
    const rightNav = document.querySelectorAll('.header-nav__right > ul > li');
    const mobileNav = document.querySelector('.mobile-nav ul');

    leftNav.forEach(li => {
        const clone = li.cloneNode(true);
        mobileNav.appendChild(clone);
    });

    rightNav.forEach(li => {
        const clone = li.cloneNode(true);
        mobileNav.appendChild(clone);
    });
  })();

    // открытие подменю mobile
    (function() {
      if(!document.querySelector('.mobile-nav li .icon')) return
  
      document.querySelectorAll('.mobile-nav li .icon').forEach(el => {
        el.addEventListener('click', () => {
          el.parentNode.classList.toggle('opened');
        })
      });
    })();

});

// Открытие попапа
$(document).on("click", ".mfp-link", function () {
  var a = $(this);
  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function(){
          $('.mfp-wrap').addClass('not_delay');
          $('.mfp-popup').addClass('not_delay');
        },700);

        document.documentElement.style.overflow = 'hidden'
      },

      close: function() {
        document.documentElement.style.overflow = ''
      }
    }
  });
  return false;
});