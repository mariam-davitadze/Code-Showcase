import { ReactComponent as cart } from "../../assets/icons/cart.svg";
import { ReactComponent as cash } from "../../assets/icons/cash.svg";
import { ReactComponent as tbc } from "../../assets/icons/card-tbc.svg";
import { ReactComponent as bog } from "../../assets/icons/card-bog.svg";
import { ReactComponent as stocks } from "../../assets/icons/stocks.svg";
import { ReactComponent as user } from "../../assets/icons/user.svg";
import { ReactComponent as history } from "../../assets/icons/history.svg";
import { ReactComponent as search } from "../../assets/icons/search.svg";
import { ReactComponent as home } from "../../assets/icons/home.svg";
import { ReactComponent as edit } from "../../assets/icons/edit.svg";
import { ReactComponent as details } from "../../assets/icons/details.svg";
import { ReactComponent as save } from "../../assets/icons/save.svg";
import { ReactComponent as done } from "../../assets/icons/done.svg";
import { ReactComponent as archive } from "../../assets/icons/archive.svg";

const svgs = {
  cart,
  cash,
  tbc,
  bog,
  stocks,
  user,
  history,
  search,
  home,
  edit,
  details,
  save,
  done,
  archive,
};

export enum IconT {
  cart = "cart",
  cash = "cash",
  tbc = "tbc",
  bog = "bog",
  stocks = "stocks",
  user = "user",
  history = "history",
  search = "search",
  home = "home",
  edit = "edit",
  details = "details",
  save = "save",
  done = "done",
  archive = "archive", 
}

type IconParams = {
  icon: IconT;
  className?: string;
};

const Icon = ({ icon, className }: IconParams) => {
  const IconComponent = svgs[icon];
  return IconComponent ? (
    <IconComponent className={className} />
  ) : (
    <span className={className}>🛑</span>
  );
};

export default Icon;
