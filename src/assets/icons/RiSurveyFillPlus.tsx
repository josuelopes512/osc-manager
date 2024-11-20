import { RiSurveyFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const RiSurveyFillPlus: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={`relative inline-block ${className}`}>
			<RiSurveyFill className="w-[18px] h-[18px]" />
			<FaPlus className="absolute -top-1 -right-2 w-3 h-3 text-current" />
		</div>
	);
};

export default RiSurveyFillPlus;
