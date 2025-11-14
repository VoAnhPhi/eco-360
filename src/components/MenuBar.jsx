// MenuBar.jsx
import { useState, useEffect } from "react";
import { Map, MapPinned, LayoutDashboard, Building2, Images, FileText } from "lucide-react";

const MENU_ITEMS = [
	{ id: "overview", label: "TOÀN CẢNH", icon: Map },
	{ id: "location", label: "VỊ TRÍ", icon: MapPinned },
	{ id: "zones", label: "PHÂN KHU", icon: LayoutDashboard },
	{ id: "facility", label: "TIỆN ÍCH", icon: Building2 },
	{ id: "gallery", label: "GALLERY", icon: Images },
	{ id: "brochure", label: "E-BROCHURE", icon: FileText },
];

function MenuBar() {
	const [activeId, setActiveId] = useState("overview");
	const [open, setOpen] = useState(true);

	useEffect(() => {
		if (window && window.location && window.location.hash) {
			const hash = window.location.hash.replace("#", "");
			const exist = MENU_ITEMS.some((item) => item.id === hash);
			if (exist) {
				setActiveId(hash);
			}
		}
	}, []);

	const toggleOpen = () => setOpen((prev) => !prev);

	const handleSelect = (id) => {
		setActiveId(id);
		if (window) {
			window.location.hash = id;
		}
	};

	return (
		<div className={`menu-bar ${open ? "menu-bar--open" : "menu-bar--collapsed"}`} data-active-route={activeId}>
			<div className="menu-bar__inner">
				<button className="menu-bar__logo" onClick={toggleOpen}>
					<img src="/logos/logo.png" alt="Eco Retreat" className="menu-bar__logo-icon" />
				</button>

				<div className="menu-bar__items">
					{MENU_ITEMS.map((item) => {
						const Icon = item.icon; // Lấy component icon
						return (
							<button
								key={item.id}
								className={`menu-bar__item ${activeId === item.id ? "is-active" : ""}`}
								onClick={() => handleSelect(item.id)}
							>
								<Icon className="menu-bar__item-icon" size={24} strokeWidth={2} />
								<span className="menu-bar__item-label">{item.label}</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default MenuBar;
