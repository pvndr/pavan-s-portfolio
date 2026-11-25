import './Tag.css';

interface TagProps {
  label: string;
  mono?: boolean;
}

export function Tag({ label, mono = false }: TagProps) {
  return (
    <span className={`tag ${mono ? 'tag--mono' : ''}`.trim()}>
      {label}
    </span>
  );
}

interface TagListProps {
  tags: string[];
  mono?: boolean;
  className?: string;
}

export function TagList({ tags, mono = false, className = '' }: TagListProps) {
  return (
    <div className={`tag-list ${className}`.trim()} aria-label="Technologies">
      {tags.map((tag) => (
        <Tag key={tag} label={tag} mono={mono} />
      ))}
    </div>
  );
}
