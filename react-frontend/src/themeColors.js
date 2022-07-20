export default function setThemeColors() {
    var root = document.querySelector(':root');
    root.style.setProperty("--primary_color", "#414DBA")
    root.style.setProperty("--secondary_color", "#2733A0")
    root.style.setProperty("--third_color", "#000000")
    root.style.setProperty("--fourth_color", "#F1F1F1")
    root.style.setProperty("--constrast_color", "#FFFA72")
    root.style.setProperty("--intermediate_color", "#B2A8A8");
    root.style.setProperty("--gradient", "linear-gradient(45deg,#CA4246 16.666%, #E16541 16.666%, #E16541 33.333%, #F18F43 33.333%, #F18F43 50%, #8B9862 50%, #8B9862 66.666%, #476098 66.666%, #476098 83.333%, #A7489B 83.333%)");
}