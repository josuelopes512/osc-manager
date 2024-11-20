import { FaGraduationCap, FaPlus } from "react-icons/fa6";

const GraduationCapPlus: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={`relative inline-block ${className}`}>
			<FaGraduationCap className="w-[18px] h-[18px]" />
			<FaPlus className="absolute -top-1 -right-2 w-3 h-3 text-current" />
		</div>
	);
};

export default GraduationCapPlus;
