import ReactMarkdown from "react-markdown";

import MarkdownLinkRenderer from "./MarkdownLinkRenderer";

export default function Comment({ comment }) {
  return (
    <article>
      <div>
        <div>{comment.scoreHidden ? <span>Score hidden</span> : comment.score}</div>
        <div>u/{comment.author}</div>
      </div>
      <div>
        <ReactMarkdown components={{a: MarkdownLinkRenderer}}>{comment.body}</ReactMarkdown>
      </div>
    </article>
  );
}