import ReactMarkdown from "react-markdown";

export default function Comment({ comment }) {
  return (
    <article>
      <div>
        <div>{comment.scoreHidden ? <span>Score hidden</span> : comment.score}</div>
        <div>u/{comment.author}</div>
      </div>
      <div><ReactMarkdown>{comment.body}</ReactMarkdown></div>
    </article>
  );
}