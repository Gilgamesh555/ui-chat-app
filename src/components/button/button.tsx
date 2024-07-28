import "./button.style.css";

interface ButtonProps {
  type: "danger" | "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <div className={`button ${props.type}`}>
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
}
