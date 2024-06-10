document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-badge");

  skills.forEach((skill) => {
    const icon = skill.querySelector("img");
    const popup = skill.querySelector(".popup");
    icon.addEventListener("mouseenter", () => {
      popup.classList.add('popup-active');
    });
    skill.addEventListener("mouseleave", () => {
      popup.classList.remove('popup-active');
    });
  });
});