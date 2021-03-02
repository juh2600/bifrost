
const setupCancelEventListeners = () => {
    document.querySelectorAll('.cancel').forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "/app";
        });
    });

    document.querySelectorAll(".reload").forEach(button => {
        button.addEventListener("click", () => {
            location.reload();
        });
    })
}

setupCancelEventListeners();