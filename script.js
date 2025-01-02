const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 33}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    setTimeout(() => {
        dots[index].classList.add('active');
    }, 50); 
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    showSlide(currentIndex);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        showSlide(currentIndex);
    });
});

showSlide(currentIndex);
setInterval(autoSlide, 3000);

function showPopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("show");  
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }
document.addEventListener('DOMContentLoaded', () => {
    const slideInWindow = document.getElementById('slide-in');
    const closeBtn = document.getElementById('close-btn');
    const itemCards = document.querySelectorAll('.card');
    const itemName = document.getElementById('itemName');
    const itemImage = document.getElementById('itemImage');
  
const updateSlideInWindow = (itemData) => {
      itemName.textContent = itemData.name;
      itemImage.src = itemData.image;
      itemImage.alt = itemData.name;
      slideInWindow.classList.add('show');
    };
  
itemCards.forEach(card => {
      card.addEventListener('click', () => {
        const itemData = {
          name: card.dataset.name,
          image: card.dataset.image
        };
        updateSlideInWindow(itemData);
      });
    });
  
closeBtn.addEventListener('click', () => {
      slideInWindow.classList.remove('show');
    });
  });
    
const images = {
  watch: ['watches/watch 1.png','watches/watch 2.png','watches/watch 3.png','watches/watch 4.png'],
  tab: ['tab/tab 1 (1).png','tab/tab 1 (2).png','tab/tab 1 (3).png','tab/tab 1 (4).png'],
  inalsa: ['inalsa/inalsa 1 (1).png','inalsa/inalsa 1 (2).png','inalsa/inalsa 1 (3).png','inalsa/inalsa 1 (4).png'],
  iphone: ['iphone/iphone(1).png','iphone/iphone(2).png','iphone/iphone(3).png','iphone/iphone(4).png'],
  camera: ['camera/camera(1).png','camera/camera(2).png','camera/camera(3).png','camera/camera(4).png'],
  neckband: ['headphones/hp 1 (1).png','headphones/hp 1 (2).png','headphones/hp 1 (3).png','headphones/hp 1 (4).png']
}
