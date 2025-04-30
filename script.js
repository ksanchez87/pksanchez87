let menuVisible = false;
let animacionesRealizadas = false;
let animatingStats = false;

// Efecto de typing para el título
function typeWriter(element, text, speed = 100, callback = null) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// Función para animar números con callback
function animateNumber(element, final, duration = 2000, callback = null) {
    if (!element) return;
    
    let start = parseInt(element.textContent) || 0;
    const increment = (final - start) / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= final) {
            element.textContent = Math.round(final) + '+';
            clearInterval(timer);
            if (callback) callback();
        } else {
            element.textContent = Math.round(start) + '+';
        }
    }, 16);
}

// Función para animar las estadísticas
function animateStats() {
    if (animatingStats) return;
    animatingStats = true;

    const stats = document.querySelectorAll('.stat-number');
    let completedAnimations = 0;

    stats.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-value') || stat.textContent);
        stat.setAttribute('data-value', finalValue);
        animateNumber(stat, finalValue, 2000, () => {
            completedAnimations++;
            if (completedAnimations === stats.length) {
                animatingStats = false;
            }
        });
    });
}

// Función para animar las cards de estadísticas
function animateStatCards() {
    const stats = document.getElementById("stats");
    if (!stats) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                let cards = entry.target.querySelectorAll(".stat-item");
                cards.forEach((card, index) => {
                    card.style.animation = `floatingAnimation 6s ease-in-out infinite ${index * -2}s`;
                });
                entry.target.classList.add('animated');
                resetAndAnimateStats();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(stats);
}

// Función para reiniciar las animaciones de las estadísticas
function resetAndAnimateStats() {
    if (animatingStats) return;
    
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-value'));
        stat.textContent = '0+';
    });
    
    // Pequeño retraso antes de iniciar la animación
    setTimeout(() => {
        animateStats();
    }, 100);
}

// Función para reiniciar el efecto typing del subtítulo
function resetAndTypeSubtitle() {
    const subtitleText = document.querySelector('.subtitle-text');
    if (subtitleText) {
        const subtitleContent = "Aplicaciones web - Desarrollo de software";
        typeWriter(subtitleText, subtitleContent, 100, () => {
            setTimeout(() => {
                resetAndTypeSubtitle();
            }, 5000);
        });
    }
}

//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList.remove("responsive");
        menuVisible = false;
    }else{
        document.getElementById("nav").classList.add("responsive");
        menuVisible = true;
    }
}

function seleccionar(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Ocultar menú en móvil
    document.getElementById("nav").classList.remove("responsive");
    menuVisible = false;

    // Remover clase active de todos los enlaces
    document.querySelectorAll('.contenedor-header nav ul li a').forEach(link => {
        link.classList.remove('active');
    });

    // Añadir clase active al enlace clickeado
    if (event && event.target) {
        event.target.classList.add('active');
        
        // Efecto de ripple
        const ripple = document.createElement('span');
        const rect = event.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size/2;
        const y = event.clientY - rect.top - size/2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        event.target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Scroll suave a la sección
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Función para actualizar el menú según la sección visible
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.contenedor-header nav ul li a[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.contenedor-header nav ul li a[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

// Detectar scroll para actualizar menú
window.addEventListener('scroll', updateActiveSection);

// Añadir estilos para la animación del ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300 && !animacionesRealizadas){
        let habilidades = document.querySelectorAll(".skill-card");
        habilidades.forEach((habilidad) => {
            const barra = habilidad.querySelector(".progress");
            const porcentaje = habilidad.querySelector(".percentage").textContent;
            if (barra) {
                barra.style.width = "0%";
                setTimeout(() => {
                    barra.style.width = porcentaje;
                }, 100);
            }
        });
        animacionesRealizadas = true;
    }
}

//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 

// Ejecutar también al cargar la página
window.addEventListener('load', efectoHabilidades);

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const nav = document.getElementById("nav");
    const navResponsive = document.querySelector(".nav-responsive");
    
    if (!nav.contains(event.target) && !navResponsive.contains(event.target) && menuVisible) {
        nav.classList.remove("responsive");
        menuVisible = false;
    }
});

document.getElementById("downloadCV").addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "./downloads/Kedin_Santiago_Sanchez_HV_2025.pdf"; 
    link.download = "Kedin_Santiago_Sanchez_HV_2025.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar el efecto typing solo para el subtítulo
    resetAndTypeSubtitle();

    // Configurar los valores iniciales de las estadísticas
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const value = stat.textContent.replace('+', '');
        stat.setAttribute('data-value', value);
        stat.textContent = '0+';
    });

    // Iniciar las animaciones
    animateStatCards();

    // Funcionalidad para el modal
    const modal = document.getElementById("imageModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");

    if (modal && openBtn && closeBtn) {
        // Abrir el modal
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = "flex";
        });

        // Cerrar el modal al hacer clic en la "X"
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Cerrar el modal si se hace clic fuera de la imagen
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Funcionalidad para las cards expandibles
    const items = document.querySelectorAll('.curriculum .fila .item');
    
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            // Evitar que el clic en botones o enlaces expanda/colapse la tarjeta
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || 
                e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            // Cerrar todas las demás cards
            items.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expandido')) {
                    otherItem.classList.remove('expandido');
                }
            });
            
            // Toggle la card actual
            this.classList.toggle('expandido');
        });
    });

    // Añadir event listeners a los enlaces del menú
    document.querySelectorAll('.contenedor-header nav ul li a').forEach(link => {
        link.addEventListener('click', seleccionar);
    });

    // Marcar la sección inicial como activa
    updateActiveSection();
});
  