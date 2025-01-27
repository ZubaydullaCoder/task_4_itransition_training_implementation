interface LastSeenIndicatorProps {
  lastSeen: string;
  status: "online" | "offline" | "away";
}

export function LastSeenIndicator({
  lastSeen,
  status,
}: LastSeenIndicatorProps) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {lastSeen}
      </span>
    </div>
  );
}
