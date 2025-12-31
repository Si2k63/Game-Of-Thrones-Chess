import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TButton } from "@components/component.types";

const Button: React.FC<TButton> = (props: TButton) => {
  const { children, icon, onClick } = props;
  const active = props.active ?? true;
  const classes = [
    "border-2 rounded-sm border-teal-600 px-2 py-1 font-medium bg-teal-600 text-white mr-1",
  ];
  classes.push(active ? "text-white" : "text-black");

  return (
    <button onClick={onClick} className={classes.join(" ")}>
      {icon && <FontAwesomeIcon icon={icon} />} {children}
    </button>
  );
};

export default Button;
