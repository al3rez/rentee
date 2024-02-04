import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu"];

  toggleMenu() {
    console.log("clicked");
    this.menuTarget.classList.toggle("hidden");
  }
}
