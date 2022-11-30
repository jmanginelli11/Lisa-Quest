import { Scene } from "phaser";

class Form extends Scene {
  constructor() {
    super({ key: "Form" });
  }

  preload() {
    this.load.html("form", "/assets/text/inputForm.html");
    this.load.image("stars", "/assets/menu/stars_background.png");
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, "stars");
    const text = this.add.text(x - x / 5, y - y / 4, "TYPE YOUR NAME", {
      color: "white",
      fontFamily: "Arial",
      fontSize: "32px",
    });

    // const element = document.getElementById("form");
    const element = this.add.dom(x, y).createFromCache("form");

    element.setPerspective(300);
    element.addListener("click");

    element.on("click", (evt) => {
      if (evt.target.name === "pushButton") {
        const username = this.getChildByName("username");

        // if (username.value !== "") {
        //   this.removeListener("click");
        //  Tween the login form out
        //   this.scene.tweens.add({
        //     targets: element.rotate3d,
        //     x: 1,
        //     w: 90,
        //     duration: 3000,
        //     ease: "Power3",
        //   });

        //   this.scene.tweens.add({
        //     targets: element,
        //     scaleX: 2,
        //     scaleY: 2,
        //     y: 700,
        //     duration: 3000,
        //     ease: "Power3",
        //     onComplete: function () {
        //       element.setVisible(false);
        //     },
        //   });

        text.setText("Welcome " + username.value);
        // } else {
        //   //  Flash the prompt
        //   this.scene.tweens.add({
        //     targets: text,
        //     alpha: 0.1,
        //     duration: 200,
        //     ease: "Power3",
        //     yoyo: true,
        //   });
        // }
        //   }
        // });

        // this.tweens.add({
        //   targets: element,
        //   y: 300,
        //   duration: 3000,
        //   ease: "Power3",
      }
    });
  }
}

export default Form;
