import { useState } from "react";
import "./SeriesFilter.css";

interface SeriesFilterProps {
  activeSeries: string | null;
  onFilterChange: (series: string | null) => void;
}

const SeriesFilter = ({ activeSeries, onFilterChange }: SeriesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const seriesOptions = [
    { value: null, label: "All" },
    { value: "the-good-times", label: "The Good Times" },
    { value: "based-on-a-true-story", label: "Based on a True Story" },
    { value: "face-card", label: "Face Card" },
    { value: "present", label: "Present" },
  ];

  return (
    <div className="series-filter">
      <button
        className="series-filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter by series"
      >
        <span className="series-filter-toggle-text">
          {activeSeries
            ? seriesOptions.find((opt) => opt.value === activeSeries)?.label
            : "Filter"}
        </span>
        <span className="series-filter-toggle-icon">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="series-filter-drawer">
          <div className="series-filter-options">
            {seriesOptions.map((option) => (
              <button
                key={option.value || "all"}
                className={`series-filter-option ${
                  activeSeries === option.value ? "active" : ""
                }`}
                onClick={() => {
                  onFilterChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesFilter;
