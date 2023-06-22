import { useState } from "react";

interface IProps {
  len: number;
  children: string;
}

const EllipsisText: React.FC<IProps> = ({ len, children = "" }) => {
  const [ellipsis, setEllipsis] = useState(() => children?.length > len);
  return (
    <>
      <span style={{ wordBreak: "break-word", display: "inline-block", width: '100%' }}>
        {ellipsis && (
          <>
            {`${children.slice(0, len)}... `}
            <p
              style={{
                color: "#808080",
                fontSize: 12,
                cursor: "pointer",
                marginTop: 8,
              }}
              onClick={() => {
                setEllipsis(!ellipsis);
              }}
            >
              Далее
            </p>
          </>
        )}
        {!ellipsis && children}
      </span>
    </>
  );
};

export default EllipsisText;
