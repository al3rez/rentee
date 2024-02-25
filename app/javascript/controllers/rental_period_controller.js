import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["date"];

  connect() {
    this.chosenDates = [];
  }

  pickDate(event) {
    const dayPicked = event.currentTarget.getAttribute("data-day");
    this.refreshChosenDates(dayPicked);
    this.refreshDateAppearance();
    this.handleDateRangeHighlight();
    this.refreshDateTargets();
  }

  refreshChosenDates(dayPicked) {
    const position = this.chosenDates.indexOf(dayPicked);
    if (position >= 0) {
      this.chosenDates.splice(position, 1);
    } else {
      if (this.chosenDates.length == 2) {
        this.chosenDates.shift(); // Remove the oldest date
      }
      this.chosenDates.push(dayPicked);
    }
    // Sort dates to ensure they're in order
    this.chosenDates.sort((a, b) => new Date(a) - new Date(b));
  }

  refreshDateAppearance() {
    this.dateTargets.forEach((dateElement) => {
      const date = dateElement.getAttribute("data-day");
      if (this.chosenDates.includes(date)) {
        dateElement.classList.add(
          "bg-sunshine",
          "shadow-lg",
          "border-2",
          "border-white",
          "font-bold"
        );
      } else {
        dateElement.classList.remove(
          "bg-sunshine",
          "shadow-lg",
          "border-2",
          "border-white",
          "font-bold"
        );
      }
    });
  }

  refreshDateTargets() {
    if (this.chosenDates.length == 1) {
      this.startPoint = this.dateTargets.find(
        (el) => el.getAttribute("data-day") === this.chosenDates[0]
      );
    } else if (this.chosenDates.length == 2) {
      this.startPoint = this.dateTargets.find(
        (el) => el.getAttribute("data-day") === this.chosenDates[0]
      );
      this.endPoint = this.dateTargets.find(
        (el) => el.getAttribute("data-day") === this.chosenDates[1]
      );
    }
  }
  handleDateRangeHighlight() {
    if (this.chosenDates.length == 2) {
      this.showDateRange(this.chosenDates[0], this.chosenDates[1]);
    } else {
      this.removeDateRangeHighlight();
    }
  }

  removeDateRangeHighlight() {
    document.querySelectorAll(".absolute-highlighter").forEach((el) => {
      el.remove();
    });
  }

  showDateRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    this.removeDateRangeHighlight();

    let currentRow = null;
    let firstDateElement = null;
    let lastDateElement = null;

    this.dateTargets.forEach((el) => {
      const elDate = new Date(el.getAttribute("data-day"));
      if (elDate >= startDate && elDate <= endDate) {
        if (currentRow !== el.parentElement) {
          if (currentRow) {
            this.spawnHighlighter(firstDateElement, lastDateElement);
          }
          currentRow = el.parentElement;
          firstDateElement = el;
        }
        lastDateElement = el;
      }
    });
    if (currentRow) {
      this.spawnHighlighter(firstDateElement, lastDateElement);
    }
  }

  spawnHighlighter(firstElement, lastElement) {
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

  checkout(event) {
    event.preventDefault();
    const startInput = document.getElementById("start_date");
    const endInput = document.getElementById("end_date");

    if (this.startPoint && this.endPoint) {
      const startDate = new Date(this.startPoint.getAttribute("data-day"));
      const endDate = new Date(this.endPoint.getAttribute("data-day"));

      startInput.value = startDate.toISOString().split("T")[0];
      endInput.value = endDate.toISOString().split("T")[0];
      this.element.querySelector("form").requestSubmit();
    } else {
      alert("Please choose a rental period.");
    }
  }
}
