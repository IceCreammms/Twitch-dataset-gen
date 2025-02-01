import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function LiveChannels({ Channels }: { Channels: Array<{ name: string; viewers: number; link: string; image: string }> }) {
  return (
    <div className="space-y-8">
      {Channels.map((channel) => (
        <div className="flex items-center" key={channel.name}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={channel.image} alt="Avatar" />
            <AvatarFallback>{channel.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{channel.name}</p>
            <p className="text-sm text-muted-foreground">
              <a href={channel.link} target="_blank" rel="noopener noreferrer">Visit</a>
            </p>
          </div>
          <div className="ml-auto font-medium">{channel.viewers}</div>
        </div>
      ))}
    </div>
  );
}

