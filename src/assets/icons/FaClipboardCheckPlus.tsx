import { FaClipboardCheck, FaPlus } from "react-icons/fa6";

const FaClipboardCheckPlus: React.FC<{ className?: string }> = ({
	className,
}) => {
	return (
		<div className={`relative inline-block ${className}`}>
			<FaClipboardCheck className="w-[18px] h-[18px]" />
			<FaPlus className="absolute -top-1 -right-2 w-3 h-3 text-current" />
		</div>
	);
};

export default FaClipboardCheckPlus;
