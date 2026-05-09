import "./SeriesLabel.css";

interface SeriesLabelProps {
  series: string;
  position?: "left" | "right";
}

const SeriesLabel = ({ series, position = "left" }: SeriesLabelProps) => {
  const formatSeriesName = (series: string) => {
    const seriesMap: Record<string, string> = {
      "flowers": "Flowers",
      "under-layers-rope": "21.03.2025 + Split Page",
      "in-the-loop": "Cut and Paste",
      "face-card": "Face Card",
      "present": "Present",
    };
    return seriesMap[series] || series;
  };

  return (
    <div className={`series-label series-label--${position}`}>
      <span className="series-label-text">Series: {formatSeriesName(series)}</span>
    </div>
  );
};

export default SeriesLabel;
