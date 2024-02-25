import { Controller } from "@hotwired/stimulus";

/**
 * This Stimulus controller manages the UI interactions for selecting a rental period on a calendar interface.
 * It allows users to select a start and end date for their rental period, visually highlights the selected dates,
 * and provides feedback by dynamically updating the styles of the dates based on the user's selection.
 *
 * Key functionalities include:
 * - Handling date selection: Users can click on a date to select or deselect it. The controller supports selecting up to two dates,
 *   treating the first click as the start date and the second click as the end date of the rental period.
 * - Visual feedback: Selected dates are visually distinguished with specific styles (e.g., background color, shadow).
 *   If two dates are selected, the range between them is also highlighted to visually represent the rental period.
 * - Dynamic UI updates: The controller listens for click events on date elements and updates the UI in response to user interactions.
 *   This includes adding or removing styles from dates to indicate selection and highlighting the range between two selected dates.
 * - Clearing selections: If more than two dates are selected, previous selections are cleared, allowing the user to choose a new rental period.
 *
 * The controller leverages Stimulus' targets feature to easily access and manipulate the DOM elements representing dates on the calendar.
 */
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
        this.selectedDates.shift(); // Remove the first element instead of clearing all
      }
      this.selectedDates.push(selectedDate);
    }
    // Ensure the dates are in chronological order
    this.selectedDates.sort((a, b) => new Date(a) - new Date(b));
  }

  updateDateStyles() {
    this.dateTargets.forEach((dateElement) => {
      const date = dateElement.getAttribute("data-day");
      if (this.selectedDates.includes(date)) {
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
