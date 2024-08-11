import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";

function Navbar() {
    return (
        <Bar>
            <Logo />
            <Searchbox />
        </Bar>
    );
};

export default Navbar;