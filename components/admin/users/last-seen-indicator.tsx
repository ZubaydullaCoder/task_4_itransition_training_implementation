import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LastSeenIndicatorProps {
  lastSeen: string;
  status: "online" | "offline" | "away";
}

export function LastSeenIndicator({
  lastSeen,
  status,
}: LastSeenIndicatorProps) {
  if (!lastSeen) {
    return <span className="text-sm text-gray-500">Never</span>;
  }

  const lastSeenDate = new Date(lastSeen);
  const timeAgo = formatDistanceToNow(lastSeenDate, { addSuffix: true });
  const fullDateTime = format(lastSeenDate, "PP p"); // Jan 27, 2025, 3:34 AM

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 cursor-help">
            <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {timeAgo}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {fullDateTime}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
