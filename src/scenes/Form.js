import axios from "axios";
import { Scene } from "phaser";

class Form extends Scene {
  constructor() {
    super({ key: "Form" });
  }

  preload() {
    this.load.html("form", "/assets/text/inputForm.html");
    this.load.image("stars", "/assets/menu/stars_background.png");
    this.load.image("main-menu", "/assets/menu/mainMenu_white.png");
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, "stars");
    const text = this.add.text(x - x / 4, y - y / 4, "TYPE FOUR LETTERS", {
      color: "white",
      fontFamily: "Arial",
      fontSize: "32px",
    });

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, "main-menu")
      .setScale(3);
    mainMenuButton.setInteractive();
    mainMenuButton.on("pointerup", () => {
      this.scene.switch("MainMenu");
    });

    const element = this.add.dom(x, y).createFromCache("form");

    element.setPerspective(300);
    element.addListener("change");

    element.on("change", async (evt) => {
      if (evt.target.name === "username") {
        let username = evt.target.value;
        text.setText("Welcome " + username);
        await axios.post("/api/scores", { name: username, score: 100 });
      }
    });
  }
}

export default Form;
