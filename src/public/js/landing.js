const navId = document.getElementById("nav_menu"),
    ToggleBtnId = document.getElementById("toggle_btn"),
    CloseBtnId = document.getElementById("close_btn");

// ==== SHOW MENU ==== //
ToggleBtnId.addEventListener("click", () => {
    navId.classList.add("show");
});

// ==== HIDE MENU ==== //
CloseBtnId.addEventListener("click", () => {
    navId.classList.remove("show");
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e);
        Swal.fire({
            title: "¿Estás seguro?",
            text: `Se eliminará a este contacto de forma permanente!`,
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
        }).then((value) => {
            if (value.isConfirmed) {
                form.submit();
            }
        });
    });
});
