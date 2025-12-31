import { TAvailableSquareMarkerProps } from "@components/component.types";

const AvailableSquareMarker: React.FC<TAvailableSquareMarkerProps> = (
  props: TAvailableSquareMarkerProps,
) => {
  const { colour } = props;

  const classes = ["inline-block rounded-full h-1/4 w-1/4"];

  classes.push(
    colour === "White" ? "bg-black opacity-50" : "bg-white opacity-40",
  );

  return <span className={classes.join(" ")} />;
};

export default AvailableSquareMarker;
