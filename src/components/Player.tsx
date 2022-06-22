interface PlayerProps {
  title?: string;
}

export function Player({ title }: PlayerProps) {
  return <div className="flex-1">Player</div>;
}
