import { useEffect, useState } from "react";
import Overhead from "./Overhead";

function Content({ styles, description, label, setQuery }) {
  const [text, setText] = useState(description);

  useEffect(() => {
    setText(description);
  }, [description]);

  if (label === "Satellite overhead")
    return (
      <Overhead
        setText={setText}
        text={text}
        styles={styles}
        setQuery={setQuery}
        label={label}
      />
    );
  else if (label === "Time Difference") return <Overhead />;
  else if (label === "Satellite location") return <Overhead />;

  return <p className={styles.description}>{text}</p>;
}

export default Content;
