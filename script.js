let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}

//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 

// Obtener los elementos
const modal = document.getElementById("imageModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

// Abrir el modal
openBtn.addEventListener("click", () => {
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

document.getElementById("downloadCV").addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "./public/HV.docx.pdf"; 
    link.download = "HV_SantiagoSanchez.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });