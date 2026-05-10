import { Fragment, type ReactNode } from 'react';

const PATTERN = /\[accent\](.*?)\[\/accent\]/g;

export function RichText({ template }: { template: string }): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = PATTERN.exec(template)) !== null) {
    if (match.index > last) {
      parts.push(<Fragment key={`t${i++}`}>{template.slice(last, match.index)}</Fragment>);
    }
    parts.push(
      <span key={`a${i++}`} className="text-accent">
        {match[1]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < template.length) {
    parts.push(<Fragment key={`t${i++}`}>{template.slice(last)}</Fragment>);
  }
  return <>{parts}</>;
}
