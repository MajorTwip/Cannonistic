function sound(purpose) {
    switch (purpose) {

        case "fire":
            document.getElementById("fire_sound").play();
            return;

        case "explode":
            document.getElementById("expl_sound").play();
            return;
    }
}
