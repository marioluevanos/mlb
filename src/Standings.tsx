import { FC, useEffect } from "react";
import cn from "./utils";

type StandingsProps = {
  className?: string;
};

export const Standings: FC<StandingsProps> = (props) => {
  const { className } = props;
  // const [standings, setStandings] = useState();

  useEffect(() => {
    // getStatings().then((d) => {
    //   // console.log(d);
    // });
  }, []);

  return (
    <section className={cn("standings", className)}>{/* Standings */}</section>
  );
};
