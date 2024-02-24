import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["date"];

  connect() {
    this.selectedDates = [];
  }

  clearHighlights() {
    this.dateTargets.forEach((el) => {
      el.classList.remove("bg-sunshine", "shadow-lg");
    });
    // Also clear any absolute highlighters
    document.querySelectorAll(".absolute-highlighter").forEach((el) => {
      el.remove();
    });
  }

  selectDate(event) {
    const date = event.currentTarget.getAttribute("data-day");
    const dateElement = event.currentTarget;
    if (this.selectedDates.includes(date)) {
      const index = this.selectedDates.indexOf(date);
      this.selectedDates.splice(index, 1);
      dateElement.classList.remove("bg-sunshine", "shadow-lg");
    } else {
      if (this.selectedDates.length == 2) {
        this.clearHighlights();
        this.selectedDates = [];
      }
      this.selectedDates.push(date);
      dateElement.classList.add("bg-sunshine", "shadow-lg");
    }

    if (this.selectedDates.length == 2) {
      this.highlightRange(this.selectedDates[0], this.selectedDates[1]);
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

  highlightRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    this.clearHighlights();

    let currentRow = null;
    let firstDateElement = null;
    let lastDateElement = null;

    document.querySelectorAll("[data-day]").forEach((el) => {
      const elDate = new Date(el.getAttribute("data-day"));
      if (elDate >= startDate && elDate <= endDate) {
        el.classList.add("bg-sunshine", "shadow-lg");
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
}
