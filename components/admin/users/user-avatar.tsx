interface UserAvatarProps {
  name: string;
}

export function UserAvatar({ name }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-primary-brand/10 text-primary-brand flex items-center justify-center text-sm font-medium">
      {initials}
    </div>
  );
}
