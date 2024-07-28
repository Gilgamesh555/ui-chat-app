interface SnackbarProps {
  isActive: boolean;
  content: string;
  setActive: () => void;
}

export default function Snackbar(props: SnackbarProps): JSX.Element {
  const isActive = props.isActive;
  const activeValue = isActive ? "active" : "";

  return (
    <div className={`pill ${activeValue}`} onClick={props.setActive}>
      {props.content}
    </div>
  );
}
