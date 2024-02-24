import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["date"];

  connect() {
    this.selectedDates = [];
  }

  selectDate(event) {
    const selectedDate = event.currentTarget.getAttribute("data-day");
    this.updateSelectedDates(selectedDate);
    this.updateDateStyles();
    this.manageHighlighting();
  }

  updateSelectedDates(selectedDate) {
    const index = this.selectedDates.indexOf(selectedDate);
    if (index >= 0) {
      this.selectedDates.splice(index, 1);
    } else {
      if (this.selectedDates.length == 2) {
        this.selectedDates = [];
      }
      this.selectedDates.push(selectedDate);
    }
  }

  updateDateStyles() {
    this.dateTargets.forEach((dateElement) => {
      const date = dateElement.getAttribute("data-day");
      if (this.selectedDates.includes(date)) {
        dateElement.classList.add("bg-sunshine", "shadow-lg");
      } else {
        dateElement.classList.remove("bg-sunshine", "shadow-lg");
      }
    });
  }

  manageHighlighting() {
    if (this.selectedDates.length == 2) {
      this.highlightRange(this.selectedDates[0], this.selectedDates[1]);
    } else {
      this.clearHighlights();
    }
  }

  clearHighlights() {
    document.querySelectorAll(".absolute-highlighter").forEach((el) => {
      el.remove();
    });
  }

  highlightRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    this.clearHighlights();

    let currentRow = null;
    let firstDateElement = null;
    let lastDateElement = null;

    this.dateTargets.forEach((el) => {
      const elDate = new Date(el.getAttribute("data-day"));
      if (elDate >= startDate && elDate <= endDate) {
        if (currentRow !== el.parentElement) {
          if (currentRow) {
            this.createHighlighter(firstDateElement, lastDateElement);
          }
          currentRow = el.parentElement;
          firstDateElement = el;
        }
        lastDateElement = el;
      }
    });
    if (currentRow) {
      this.createHighlighter(firstDateElement, lastDateElement);
    }
  }

  createHighlighter(firstElement, lastElement) {
    const highlighter = document.createElement("div");
    highlighter.className =
      "absolute-highlighter bg-sunshine opacity-50 rounded-full z-[-1]";
    highlighter.style.position = "absolute";
    highlighter.style.top = firstElement.offsetTop + "px";
    highlighter.style.left = firstElement.offsetLeft + "px";
    highlighter.style.width =
      lastElement.offsetLeft -
      firstElement.offsetLeft +
      lastElement.offsetWidth +
      "px";
    highlighter.style.height = firstElement.offsetHeight + "px";
    firstElement.parentElement.appendChild(highlighter);
  }
}
