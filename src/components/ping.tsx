export default function Ping() {
  return (
    <div className="relative">
      <div className="absolute -right-3.5 -top-1.5">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"></span>
          <span className="relative inline-flex size-[11px] rounded-full bg-orange-500"></span>
        </span>
      </div>
    </div>
  );
}
