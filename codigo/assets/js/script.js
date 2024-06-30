document.addEventListener('DOMContentLoaded', function() {
    loadAds();

    document.getElementById('adForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const link = document.getElementById('link').value;
        const imageFile = document.getElementById('image').files[0];

        if (!imageFile) {
            alert('Por favor, selecione uma imagem.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const ad = {
                title: title,
                description: description,
                link: link,
                imageUrl: imageUrl
            };

            saveAd(ad);
            addAdToDOM(ad);

            document.getElementById('adForm').reset();
        };

        reader.readAsDataURL(imageFile);
    });

    document.getElementById('clearAdsButton').addEventListener('click', function() {
        clearAds();
    });
});

function saveAd(ad) {
    let ads = JSON.parse(localStorage.getItem('ads')) || [];
    ads.push(ad);
    localStorage.setItem('ads', JSON.stringify(ads));
}

function loadAds() {
    const ads = JSON.parse(localStorage.getItem('ads')) || [];
    ads.forEach(ad => addAdToDOM(ad));
}

function addAdToDOM(ad) {
    const adContainer = document.getElementById('adsContainer');

    const adElement = document.createElement('div');
    adElement.classList.add('ad');

    const adTitle = document.createElement('h3');
    adTitle.textContent = ad.title;

    const adDescription = document.createElement('p');
    adDescription.textContent = ad.description;

    const adLink = document.createElement('a');
    adLink.href = ad.link;
    adLink.textContent = 'Clique aqui para mais detalhes';
    adLink.target = '_blank'; 

    const adImage = document.createElement('img');
    adImage.src = ad.imageUrl;
    adImage.alt = ad.title;
    adImage.style.maxWidth = '100%';
    adImage.style.height = 'auto';

    adElement.appendChild(adTitle);
    adElement.appendChild(adDescription);
    adElement.appendChild(adLink);
    adElement.appendChild(adImage);

    adContainer.appendChild(adElement);
}

function clearAds() {
    localStorage.removeItem('ads'); 
    document.getElementById('adsContainer').innerHTML = ''; 
}
