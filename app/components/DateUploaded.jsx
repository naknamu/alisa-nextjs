import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default function DateUploaded({ date }) {
  return (
    <div>
      {formatDistanceToNowStrict(new Date(date), {
        addSuffix: true,
        includeSeconds: true,
      })}
    </div>
  );
}
