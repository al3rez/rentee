import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "preview"];

  previewImages() {
    this.previewTarget.innerHTML = ""; // Clear existing previews

    Array.from(this.inputTarget.files).forEach((file) => {
      let reader = new FileReader();
      reader.onload = (event) => this.displayImage(event.target.result);
      reader.readAsDataURL(file);
    });
  }

  displayImage(src) {
    let img = document.createElement("img");
    img.src = src;
    img.className =
      "rounded-full border-4 border-black w-[108px] h-[108px] object-cover";
    this.previewTarget.appendChild(img);
  }
}
