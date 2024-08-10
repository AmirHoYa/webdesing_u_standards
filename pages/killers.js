function toggleSection() {
    const content = document.getElementById('collapsibleContent');
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
}

function toggleDetails(imgElement) {
    let details = imgElement.nextElementSibling;

    if (details && details.classList.contains('details') && details.style.display === 'block') {
        details.style.display = 'none';
    } else {

        closeAllDetails();


        if (!details || !details.classList.contains('details')) {
            details = document.createElement('div');
            details.className = 'details';


            details.innerHTML = `
                <img src="img_detail1.jpg" alt="Detail Bild 1">
                <img src="img_detail2.jpg" alt="Detail Bild 2">
                <img src="img_detail3.jpg" alt="Detail Bild 3">
            `;


            imgElement.parentNode.insertBefore(details, imgElement.nextSibling);
        }


        details.style.display = 'block';
    }
}

function closeAllDetails() {
    const allDetails = document.querySelectorAll('.details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });
}

function showKillers() {
    const content = document.getElementById('collapsibleContent');
    if (content.style.display === 'none' || content.style.display === '') {
        toggleSection(); // Ruft die Funktion auf, um den Abschnitt aufzuklappen
    }
}