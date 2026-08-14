import React, { useEffect, useRef, useState } from 'react';

import {
  container,
  dropZone,
  dropZonePrompt,
  dropZoneHint,
  fileList,
  fileItem,
  thumbnail,
  fileIcon,
  fileMeta,
  fileName,
  fileSize,
  removeButton,
  helpText as helpTextCss,
  errorText,
} from './styles';

export interface DropZoneProps {
  /** A unique (in form) field name (Required) */
  name: string;

  /** The label to display above the drop zone. Leave blank to hide. */
  label?: string;

  /** Help text displayed below the field */
  helpText?: string;

  /** Allow selecting/dropping more than one file */
  multiple?: boolean;

  /** Passed through to the underlying file input's `accept` attribute */
  accept?: string;

  /** Maximum size (in bytes) allowed per file. Files over this size are rejected. */
  maxSize?: number;

  /** Called whenever the selected file list changes, with the full current list */
  onChange?: (files: File[]) => void;

  /** Called with a human-readable message when a file is rejected (e.g. over maxSize) */
  onError?: (message: string) => void;

  /** className applied to the outer container */
  className?: string;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const extensionOf = (fileName: string): string => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

interface TrackedFile {
  file: File;
  previewUrl: string | null;
}

const DropZone = ({
  name,
  label,
  helpText,
  multiple,
  accept,
  maxSize,
  onChange,
  onError,
  className,
}: DropZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<TrackedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filesRef = useRef(files);
  filesRef.current = files;

  useEffect(() => () => {
    filesRef.current.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
  }, []);

  const addFiles = (incoming: FileList | File[]) => {
    const incomingArray = Array.from(incoming);
    const accepted: TrackedFile[] = [];

    for (const file of incomingArray) {
      if (typeof maxSize === 'number' && file.size > maxSize) {
        const message = `"${file.name}" exceeds the maximum size of ${formatSize(maxSize)}`;
        setError(message);
        onError?.(message);
        continue;
      }

      accepted.push({
        file,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      });
    }

    if (accepted.length === 0) return;

    const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);

    if (!multiple) {
      files.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });
    }

    setError(null);
    setFiles(next);
    onChange?.(next.map((f) => f.file));
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleRemove = (index: number) => {
    const target = files[index];
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);

    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next.map((f) => f.file));
  };

  return (
    <div css={container} className={className}>
      {label && <label htmlFor={name}>{label}</label>}

      <div
        css={dropZone(isDragActive, !!error)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <span css={dropZonePrompt}>
          {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to browse'}
        </span>
        {accept && <span css={dropZoneHint}>{accept}</span>}
        <input
          id={name}
          name={name}
          type="file"
          ref={inputRef}
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
        />
      </div>

      {files.length > 0 && (
        <ul css={fileList}>
          {files.map((f, index) => (
            <li key={`${f.file.name}-${index}`} css={fileItem}>
              {f.previewUrl
                ? <img css={thumbnail} src={f.previewUrl} alt={f.file.name} />
                : <span css={fileIcon}>{extensionOf(f.file.name) || 'file'}</span>}
              <span css={fileMeta}>
                <span css={fileName}>{f.file.name}</span>
                <span css={fileSize}>{formatSize(f.file.size)}</span>
              </span>
              <button
                type="button"
                css={removeButton}
                aria-label={`Remove ${f.file.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <span css={errorText}>{error}</span>}
      {helpText && !error && <span css={helpTextCss}>{helpText}</span>}
    </div>
  );
};

export default DropZone;
