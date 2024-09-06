function toggleSection(button) {
    const content = button.nextElementSibling;

    if (content.classList.contains('collapsibleContent')) {
        content.classList.toggle('active');
    }
}

function showKillers() {
    const section = document.getElementById('killer');
    const collapsibleContent = section.querySelector('.collapsibleContent');
    
    if (collapsibleContent.style.display === 'none' || collapsibleContent.style.display === '') {
        collapsibleContent.style.display = 'block';
    }
}

function showSuvivors() {
    const section = document.getElementById('survivor');
    const collapsibleContent = section.querySelector('.collapsibleContent');
    
    if (collapsibleContent.style.display === 'none' || collapsibleContent.style.display === '') {
        collapsibleContent.style.display = 'block';
    }
}
