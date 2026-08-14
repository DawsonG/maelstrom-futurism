import { ReactNode, useState } from "react";
import { DropZone } from "@maelstrom-futurism/form";
import { Container } from "@maelstrom-futurism/layout";

import CodeView from "../components/CodeView";

const DropZonePage = (): ReactNode => {
    const [singleFiles, setSingleFiles] = useState<File[]>([]);
    const [multiFiles, setMultiFiles] = useState<File[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    return (
        <Container>
            <h1>DropZone</h1>

            <p>
                <code>DropZone</code> is a dedicated drag-and-drop file upload component. It
                handles drag events, shows image preview thumbnails for image files, and lists
                every selected file with its size and a remove button. Clicking the zone opens
                the native file browser as a fallback to dragging.
            </p>

            <h2>Single File</h2>
            <p>
                By default <code>DropZone</code> accepts a single file — selecting or dropping
                a new one replaces the previous selection.
            </p>

            <CodeView>{`import { useState } from "react";
import { DropZone } from "@maelstrom-futurism/form";

const FormControl = () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <DropZone name="avatar" label="Avatar" onChange={setFiles} />
    );
};
`}</CodeView>

            <DropZone name="avatar" label="Avatar" onChange={setSingleFiles} />
            <p>Selected: {singleFiles.map((f) => f.name).join(", ") || "none"}</p>

            <h2>Multiple Files</h2>
            <p>
                Pass <code>multiple</code> to allow dropping or selecting more than one file at
                a time. Each file can be individually removed from the list.
            </p>

            <CodeView>{`<DropZone name="attachments" label="Attachments" multiple
    onChange={(files) => setFiles(files)} />`}</CodeView>

            <DropZone name="attachments" label="Attachments" multiple onChange={setMultiFiles} />
            <p>Selected: {multiFiles.map((f) => f.name).join(", ") || "none"}</p>

            <h2>Image Previews</h2>
            <p>
                Files whose type starts with <code>image/</code> are rendered with a thumbnail
                preview generated from the file itself, no upload required.
            </p>

            <CodeView>{`<DropZone name="photos" label="Photos" accept="image/*" multiple
    onChange={(files) => setFiles(files)} />`}</CodeView>

            <DropZone name="photos" label="Photos" accept="image/*" multiple onChange={setImageFiles} />
            <p>Selected: {imageFiles.map((f) => f.name).join(", ") || "none"}</p>

            <h2>Max Size &amp; Errors</h2>
            <p>
                Pass <code>maxSize</code> (in bytes) to reject oversized files. Rejected files
                never reach <code>onChange</code>; instead <code>onError</code> is called with a
                human-readable message, which is also shown below the field automatically.
            </p>

            <CodeView>{`<DropZone name="small-file" label="Small file only (max 1 KB)"
    maxSize={1024}
    onError={(message) => console.warn(message)} />`}</CodeView>

            <DropZone
                name="small-file"
                label="Small file only (max 1 KB)"
                maxSize={1024}
                onError={setError}
                helpText="Files must be 1 KB or smaller"
            />
            {error && <p>Last error: {error}</p>}

            <br/><br/><br/><br/>
        </Container>
    );
}

export default DropZonePage;
