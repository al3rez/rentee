import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  static targets = ["input", "preview"]

  previewImages() {
    this.previewTarget.innerHTML = ''; // Clear existing previews

    Array.from(this.inputTarget.files).forEach(file => {
      let reader = new FileReader();
      reader.onload = (event) => this.displayImage(event.target.result);
      reader.readAsDataURL(file);
    });
  }

  displayImage(src) {
    let img = document.createElement('img');
    img.src = src;
    img.className = "flex items-center justify-center w-[200px]  bg-white border-[2px] border-gray-400 border-dashed outline-none rounded-xl";
    this.previewTarget.appendChild(img);
  }
}

