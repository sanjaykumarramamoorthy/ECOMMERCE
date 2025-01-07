document.addEventListener('DOMContentLoaded', () => {
    const slideInWindow = document.getElementById('slide-in');
    const closeBtn = document.getElementById('close-btn');
    const itemCards = document.querySelectorAll('.deal-item');
    const itemName = document.getElementById('itemName');
    const itemImage = document.getElementById('itemImage');
    const imageS1 = document.getElementById('image-s1');
    const imageS2 = document.getElementById('image-s2');
    const imageS3 = document.getElementById('image-s3');
    const imageS4 = document.getElementById('image-s4');
    const itemPrice = document.getElementById('itemPrice');
    
const updateSlideInWindow = (itemData,itemname) => {
      itemName.textContent = itemData.name;
      itemImage.src = itemData.image;
      itemImage.alt = itemData.name;
      imageS1.src = `../static/images/${itemname}/${itemname}1.png`;
      imageS2.src = `../static/images/${itemname}/${itemname}2.png`;
      imageS3.src = `../static/images/${itemname}/${itemname}3.png`;
      imageS4.src = `../static/images/${itemname}/${itemname}4.png`;
      itemPrice.value = itemData.price;
      console.log(itemData);
      slideInWindow.classList.add('show');
    };

itemCards.forEach(card => {
      card.addEventListener('click', () => {
        const itemData = {
          name: card.dataset.name,
          image: card.dataset.image,
          price : card.dataset.price
        };
        const itemname = card.getAttribute('name');
        console.log(card.dataset)
        updateSlideInWindow(itemData,itemname);
        console.log(card.getAttribute('name'));
      });
    });

closeBtn.addEventListener('click', () => {
      slideInWindow.classList.remove('show');
    });
  });
    
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
 
function prepareContent() {
      const itemName = document.getElementById('itemName').innerText;
      const itemImage = document.getElementById('itemImage').src; 
      document.getElementById('itemNameInput').value = itemName;
      document.getElementById('itemImageInput').value = itemImage;
      const imageS1 = document.getElementById('image-s1').src;
      const imageS2 = document.getElementById('image-s2').src;
      const imageS3 = document.getElementById('image-s3').src;
      const imageS4 = document.getElementById('image-s4').src;
      document.getElementById('itemImageInput2').value = imageS1;
      document.getElementById('itemImageInput3').value = imageS2;
      document.getElementById('itemImageInput4').value = imageS3;
      document.getElementById('itemImageInput5').value = imageS4;
      const itemprice = document.getElementById('itemPrice').value;
      document.querySelector('.price').textContent = itemprice;
}