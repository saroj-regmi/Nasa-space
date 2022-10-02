import { useEffect, useState } from "react";
import Overhead from "./Overhead";
import TimeDifference from "./TimeDifference";

function Content({ styles, description, label, setQuery }) {
  const [text, setText] = useState(description);

  useEffect(() => {
    setText(description);
  }, [description]);

  if (label === "Satellite overhead")
    return <Overhead setText={setText} text={text} styles={styles} />;
  else if (label === "Time Difference")
    return <TimeDifference styles={styles} text={text} setText={setText} />;
  else if (label === "Satellite location") return <Overhead />;

  return <p className={styles.description}>{text}</p>;
}

export default Content;
