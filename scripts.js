// ====== FORMULÁRIO ======
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário submetido!');

    const form = this;
    const formData = new FormData(form);
    const popup = document.getElementById('successPopup');

    fetch('https://formspree.io/f/myzpqkge', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log('Resposta do Formspree:', response);
        if (response.ok) {
            // Salva os dados no localStorage
            const data = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                mensagem: formData.get('mensagem'),
                timestamp: new Date().toISOString()
            };
            let savedForms = JSON.parse(localStorage.getItem('sentForms') || '[]');
            savedForms.push(data);
            localStorage.setItem('sentForms', JSON.stringify(savedForms));

            popup.style.display = 'flex';
            console.log('Popup exibido!');
            setTimeout(() => {
                popup.style.display = 'none';
                form.reset();
                console.log('Popup fechado e formulário limpo!');
            }, 3000);
        } else {
            alert('Erro ao enviar o formulário. Tente novamente!');
            console.log('Erro na resposta:', response.status);
        }
    })
    .catch(error => {
        alert('Erro ao enviar o formulário. Tente novamente!');
        console.log('Erro no fetch:', error);
    });
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('successPopup').style.display = 'none';
    console.log('Popup fechado manualmente!');
});

// ====== NAVEGAÇÃO SUAVE (caso use dropdown) ======
document.addEventListener('DOMContentLoaded', function () {
    const navigation = document.getElementById('navigation');
    if (navigation) {
        navigation.addEventListener('change', function () {
            const targetSection = this.value;
            if (targetSection && targetSection !== '#') {
                const section = document.querySelector(targetSection);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});

// ====== CARROSSEL ======
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    if (slides && prevBtn && nextBtn) {
        const scrollAmount = slides.clientWidth * 0.9;

        prevBtn.addEventListener("click", () => {
            slides.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });
        });

        nextBtn.addEventListener("click", () => {
            slides.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        });
    }
});
