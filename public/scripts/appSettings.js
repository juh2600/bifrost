
const setupCancelEventListeners = () => {
    document.querySelectorAll('.cancel').forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "/app";
        });
    });
}

setupCancelEventListeners();